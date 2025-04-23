import { z } from "zod";
import type { IMcpTool, InferZodParams } from "../types";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";

/**
 * 足し算するだけのツール
 */
export class AddTool implements IMcpTool { 
  readonly name = "add";

  readonly description = "足し算をするツール";

  readonly parameters = {
    a: z.number(),
    b: z.number()
  }

  async execute(args: InferZodParams<typeof this.parameters>): Promise<{
    content: TextContent[];
    isError?: boolean;
  }> { 
    const { a, b } = args;
    const result = a + b;

    return {
      content: [
        {
          type: "text",
          text: `足し算の結果は ${result} です。`
        }
      ]
    };
  }
}