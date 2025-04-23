import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { IMcpTool } from "../types";
import type { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export class McpServerManager {
  private readonly server: McpServer;
  private readonly tools: Map<string, IMcpTool<any>> = new Map();

  constructor(name: string, version: string) {
    this.server = new McpServer({
      name,
      version
    });
  }

  /**
   * ツールを登録する
   * @param tool - 登録するツール
   */
  registerTool(tool: IMcpTool): void {
    this.server.tool(tool.name, tool.description, tool.parameters, tool.execute.bind(tool));
  }

  /**
   * トランスポートに接続する
   * @param transport - 使用するトランスポート
   */
  async connect(transport: StdioServerTransport): Promise<void> {
    await this.server.connect(transport);
    console.log(`MCPサーバーが起動しました。登録済みツール: ${Array.from(this.tools.keys()).join(", ")}`);
  }
}