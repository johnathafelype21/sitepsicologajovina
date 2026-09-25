# Stitch MCP bridge

This repository uses GitHub Actions as the execution environment for the Google Stitch MCP server.

The workflow is intentionally designed so the project can be operated from ChatGPT + GitHub without opening Codex.

## Secret

The repository must contain a GitHub Actions repository secret named:

`STITCH_API_KEY`

The secret value is never committed to the repository.

## Requests

Create JSON files under `.stitch/requests/`.

### List available Stitch tools

```json
{
  "action": "list_tools"
}
```

### Call a Stitch tool

```json
{
  "action": "call_tool",
  "tool": "generate_screen_from_text",
  "arguments": {
    "projectId": "projects/123",
    "prompt": "..."
  }
}
```

The exact argument schema is discovered from the MCP server through `list_tools`.

## Results

GitHub Actions writes the MCP response to the matching filename under:

`.stitch/results/`

Only request files trigger the workflow, so commits containing results do not create an execution loop.
