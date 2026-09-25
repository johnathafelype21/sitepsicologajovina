import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
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

const runProcess = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(
          `${command} exited with code ${code}.\n${stderr || stdout}`
        ));
      }
    });
  });

if (!apiKey) {
  await writeResult({
    ok: false,
    error: "STITCH_API_KEY is not available to the GitHub Actions runner."
  });
  process.exit(1);
}

const request = JSON.parse(await fs.readFile(requestPath, "utf8"));

if (request.action === "encode_design_image") {
  try {
    if (!request.slug) {
      throw new Error("encode_design_image requires 'slug'.");
    }

    const imagePath = `.stitch/designs/${request.slug}.png`;
    const outputPath = `.stitch/designs/${request.slug}.png.b64`;
    const bytes = await fs.readFile(imagePath);
    await fs.writeFile(outputPath, bytes.toString("base64"), "utf8");

    await writeResult({
      ok: true,
      request: { action: request.action, slug: request.slug },
      preview: {
        imagePath,
        outputPath,
        bytes: bytes.length
      }
    });
  } catch (error) {
    await writeResult({
      ok: false,
      request: { action: request.action, slug: request.slug ?? null },
      error: error instanceof Error ? error.message : String(error)
    });
    process.exitCode = 1;
  }

  process.exit();
}

if (request.action === "sync_stitch_screen") {
  try {
    const required = ["slug", "htmlUrl", "screenshotUrl", "width"];
    for (const key of required) {
      if (!request[key]) {
        throw new Error(`sync_stitch_screen requires '${key}'.`);
      }
    }

    const designsDir = ".stitch/designs";
    await fs.mkdir(designsDir, { recursive: true });

    const htmlPath = path.join(designsDir, `${request.slug}.html`);
    const pngPath = path.join(designsDir, `${request.slug}.png`);
    const fetchScript = ".agents/skills/react-components/scripts/fetch-stitch.sh";
    const screenshotUrl = `${request.screenshotUrl}=w${request.width}`;

    const htmlFetch = await runProcess("bash", [fetchScript, request.htmlUrl, htmlPath]);
    const pngFetch = await runProcess("bash", [fetchScript, screenshotUrl, pngPath]);

    const htmlStat = await fs.stat(htmlPath);
    const pngStat = await fs.stat(pngPath);

    await writeResult({
      ok: true,
      request: {
        action: request.action,
        slug: request.slug,
        title: request.title ?? null
      },
      assets: {
        htmlPath,
        htmlBytes: htmlStat.size,
        screenshotPath: pngPath,
        screenshotBytes: pngStat.size
      },
      logs: {
        html: htmlFetch.stdout,
        screenshot: pngFetch.stdout
      }
    });
  } catch (error) {
    await writeResult({
      ok: false,
      request: {
        action: request.action,
        slug: request.slug ?? null,
        title: request.title ?? null
      },
      error: error instanceof Error ? error.message : String(error)
    });
    process.exitCode = 1;
  }

  process.exit();
}

if (request.action === "upload_url_to_stitch") {
  try {
    if (!request.url || !request.projectId || !request.filename) {
      throw new Error(
        "upload_url_to_stitch requires 'url', 'projectId', and 'filename'."
      );
    }

    const response = await fetch(request.url);
    if (!response.ok) {
      throw new Error(
        `Failed to download source asset: HTTP ${response.status} ${response.statusText}`
      );
    }

    const tempDir = ".stitch/tmp";
    await fs.mkdir(tempDir, { recursive: true });

    const filePath = path.join(tempDir, path.basename(request.filename));
    const bytes = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(filePath, bytes);

    const scriptPath =
      ".agents/skills/upload-to-stitch/scripts/upload_to_stitch.py";

    const args = [
      scriptPath,
      "--project-id",
      String(request.projectId),
      "--file-path",
      filePath,
      "--api-key",
      apiKey,
      "--title",
      request.title || request.filename,
      "--generated-by",
      request.generatedBy || "ChatGPT GitHub Stitch Bridge"
    ];

    const processResult = await runProcess("python3", args);

    let stitchResponse = null;
    const marker = "Response:\n";
    const markerIndex = processResult.stdout.lastIndexOf(marker);

    if (markerIndex >= 0) {
      const candidate = processResult.stdout.slice(markerIndex + marker.length).trim();
      try {
        stitchResponse = JSON.parse(candidate);
      } catch {
        stitchResponse = null;
      }
    }

    await writeResult({
      ok: true,
      request: {
        action: request.action,
        projectId: request.projectId,
        filename: request.filename,
        title: request.title || request.filename
      },
      upload: {
        bytes: bytes.length,
        stitchResponse,
        log: processResult.stdout
      }
    });
  } catch (error) {
    await writeResult({
      ok: false,
      request: {
        action: request.action,
        projectId: request.projectId ?? null,
        filename: request.filename ?? null
      },
      error: error instanceof Error ? error.message : String(error)
    });
    process.exitCode = 1;
  }

  process.exit();
}

const client = new Client(
  { name: "sitepsicologajovina-github-runner", version: "1.1.0" },
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
    throw new Error(
      "Unsupported action. Use 'list_tools', 'call_tool', 'upload_url_to_stitch', 'sync_stitch_screen', or 'encode_design_image'."
    );
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
