import fs from "node:fs/promises";
import path from "node:path";
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const [requestPath, resultPath] = process.argv.slice(2);

if (!requestPath || !resultPath) {
  console.error("Usage: node index.mjs <request.json> <result.json>");
  process.exit(2);
}

const apiKey = process.env.STITCH_API_KEY;
const mcpUrl = process.env.STITCH_MCP_URL || "https://stitch.googleapis.com/mcp";

const writeResult = async (value) => {
  await fs.mkdir(path.dirname(resultPath), { recursive: true });
  await fs.writeFile(resultPath, JSON.stringify(value, null, 2) + "\n", "utf8");
};

if (!apiKey) {
  await writeResult({
    ok: false,
    error: "STITCH_API_KEY is not available to the GitHub Actions runner."
  });
  process.exit(1);
}

const request = JSON.parse(await fs.readFile(requestPath, "utf8"));

const client = new Client(
  { name: "sitepsicologajovina-github-runner", version: "1.0.0" },
  { versionNegotiation: { mode: "auto" } }
);

const transport = new StreamableHTTPClientTransport(new URL(mcpUrl), {
  requestInit: {
    headers: {
      "X-Goog-Api-Key": apiKey
    }
  }
});

try {
  await client.connect(transport);

  let payload;
  if (request.action === "list_tools") {
    payload = await client.listTools();
  } else if (request.action === "call_tool") {
    if (!request.tool) {
      throw new Error("A call_tool request requires a 'tool' field.");
    }
    payload = await client.callTool({
      name: request.tool,
      arguments: request.arguments ?? {}
    });
  } else {
    throw new Error("Unsupported action. Use 'list_tools' or 'call_tool'.");
  }

  await writeResult({
    ok: true,
    request: {
      action: request.action,
      tool: request.tool ?? null
    },
    server: {
      version: client.getServerVersion?.() ?? null,
      capabilities: client.getServerCapabilities?.() ?? null
    },
    payload
  });
} catch (error) {
  await writeResult({
    ok: false,
    request: {
      action: request.action ?? null,
      tool: request.tool ?? null
    },
    error: error instanceof Error ? error.message : String(error)
  });
  process.exitCode = 1;
} finally {
  try {
    await client.close();
  } catch {
    // Nothing else to do.
  }
}
