import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  return (
    <main className="relative">
      <h1
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap m-0 text-5xl font-bold tracking-[4px]"
        style={{
          color: "#00ff2a",
          fontFamily: "'Courier New', Courier, monospace",
          textShadow: "0 0 10px #00ff2a, 0 0 20px #00ff2a",
          textRendering: "optimizeSpeed",
          imageRendering: "pixelated",
        }}
      >
        RenderPlay Feature Canvas Preview
      </h1>
      <ModelViewer />
    </main>
  );
}