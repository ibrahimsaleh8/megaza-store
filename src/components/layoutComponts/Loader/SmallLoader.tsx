"use client";

export default function SmallLoader({ color }: { color: "white" | "black" }) {
  return (
    <>
      <div
        style={{
          borderColor: color,
          borderLeftColor: "transparent",
        }}
        className="loader rounded-full w-[1.3rem] h-[1.3rem] border-[4px] "></div>
    </>
  );
}
