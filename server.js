import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { execFile } from "child_process";

const server = new Server(
  {
    name: "spicy-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "execute_powershell",
      description: "Execute PowerShell commands",
      inputSchema: {
        type: "object",
        properties: {
          command: { type: "string", default: "Clear-Host; Get-Date; Get-Location;" }
        }
      }
    }]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "execute_powershell") {
    throw new Error("Unknown tool");
  }
  const command = request.params.arguments.command || "Clear-Host; Get-Date; Get-Location;";
  return new Promise((resolve) => {
    let child;
    const timeoutId = setTimeout(() => {
      if (child) child.kill();
      resolve({
        content: [{
          type: "text",
          text: JSON.stringify({
            stdout: "",
            stderr: "Command timed out after 30 seconds",
            returncode: -1
          })
        }]
      });
    }, 30000);
    child = execFile(
      "powershell",
      ["-NoProfile", "-Command", command],
      (error, stdout, stderr) => {
        clearTimeout(timeoutId);
        resolve({
          content: [{
            type: "text",
            text: JSON.stringify({
              stdout: stdout || "",
              stderr: stderr || (error ? error.message : ""),
              returncode: error ? error.code || -1 : 0
            })
          }]
        });
      }
    );
  });
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("spicy-server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
