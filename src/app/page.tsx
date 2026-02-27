import ModelViewer from "@/components/ModelViewer";
import "./globals.css";

export default function Home() {
  return (
    <main className="relative">
      <h1
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap m-0 text-5xl font-bold tracking-[4px] text-[#00ff2a] font-courier text-shadow-glow-title"
      >
        RenderPlay Feature Canvas Preview
      </h1>
      <ModelViewer />
    </main>
  );
}