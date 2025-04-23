import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServerManager } from "./server/McpServerManager";
import type { IMcpTool } from "./types";
import { AddTool } from "./tools/AddTool";

async function main() {
  const TOOLS: IMcpTool[] = [ 
    new AddTool()
  ];

  const manager = new McpServerManager("Demo", "1.0.0");

  TOOLS.forEach((tool) => { 
    manager.registerTool(tool);
  });
  
  const transport = new StdioServerTransport();
  await manager.connect(transport);
}

main().catch((error) => {
  console.error("エラーが発生しました:", error);
  process.exit(1);
});
