import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      <h1 style={{
        position: "absolute",
        top: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "3rem",
        margin: 0,
        zIndex: 10,
        whiteSpace: "nowrap",
        color: "#00ff2a",
        fontFamily: "'Courier New', Courier, monospace",
        textShadow: "0 0 10px #00ff2a, 0 0 20px #00ff2a",
        letterSpacing: "4px",
        fontWeight: "bold",
        textRendering: "optimizeSpeed",
        imageRendering: "pixelated"
      }}>
        RenderPlay Feature Canvas Preview
      </h1>
      <ModelViewer />
    </main>
  );
}