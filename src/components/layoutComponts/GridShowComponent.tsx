import { ReactNode } from "react";

export default function GridShowComponent({
  children,
  minWidth,
  classes,
}: {
  children: ReactNode;
  minWidth: number;
  classes?: string;
}) {
  return (
    <div
      className={"grid " + classes}
      style={{
        gridTemplateColumns: `repeat(auto-fill,minmax(min(${minWidth}px , 100%) , 1fr))`,
      }}>
      {children}
    </div>
  );
}
