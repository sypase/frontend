import { ShineBorder } from "@/components/ui/shine-border";
import React from "react";

interface TableProps {
  data: string[][];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="p-4">
      <ShineBorder
        borderRadius={16}
        borderWidth={2}
        duration={8}
        color={["#ffffff", "#4f4f4f", "#ffffff"]}
        className="p-0 w-full"
      >
        <table className="w-full border-spacing-0 border-separate">
          <colgroup>
            <col className="w-1/6" />
            <col className="w-1/2" />
            <col className="w-1/6" />
            <col className="w-1/6" />
          </colgroup>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  ${
                    rowIndex === 0
                      ? "bg-black/80"
                      : "hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 transition-all duration-300"
                  }
                `}
              >
                {row.map((cellData, colIndex) => (
                  <td
                    key={colIndex}
                    className={`
                      p-4 
                      border border-white/10
                      ${rowIndex === 0 ? "bg-black/80" : "bg-black"}
                      transition-colors
                      duration-300
                      group
                      ${rowIndex !== 0 ? "hover:bg-gray-800/80" : ""}
                      ${
                        rowIndex === 0 && colIndex === 0
                          ? "rounded-tl-2xl overflow-hidden"
                          : ""
                      }
                      ${
                        rowIndex === 0 && colIndex === row.length - 1
                          ? "rounded-tr-2xl overflow-hidden"
                          : ""
                      }
                      ${
                        rowIndex === data.length - 1 && colIndex === 0
                          ? "rounded-bl-2xl overflow-hidden"
                          : ""
                      }
                      ${
                        rowIndex === data.length - 1 &&
                        colIndex === row.length - 1
                          ? "rounded-br-2xl overflow-hidden"
                          : ""
                      }
                    `}
                  >
                    <div
                      className={`
                        font-sans 
                        ${
                          rowIndex === 0
                            ? "text-white font-semibold"
                            : "text-gray-200 group-hover:text-white transition-colors duration-300"
                        }
                      `}
                    >
                      {cellData}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ShineBorder>
    </div>
  );
}
