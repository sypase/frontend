"use client";

import { cn } from "@/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

/**
 * @name Shine Border
 * @description An animated background border effect component with configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration for the shining border.
 * @param color a string or string array to define border color.
 * @param className defines the class name for the component.
 * @param children contains React node elements.
 */
export default function ShineBorder({
  borderRadius = 10,
  borderWidth = 3,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={{
        "--border-radius": `${borderRadius}px`,
      } as React.CSSProperties}
      className={cn(
        "relative grid min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white",
        className,
      )}
    >
      <div
        style={{
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent, transparent, ${
            Array.isArray(color) ? color.join(",") : color
          }, transparent, transparent)`,
        } as React.CSSProperties}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
          // mask styles
          "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
          // pseudo styles
          "after:absolute after:aspect-square after:w-[calc(var(--border-width)*1px)] after:animate-border-beam after:[animation-delay:var(--duration)] after:[background:linear-gradient(to_left,#ffffff40,transparent)] after:[offset-anchor:50%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--border-width)*1px))]",
          className,
        )}
      />
      {children}
    </div>
  );
}
