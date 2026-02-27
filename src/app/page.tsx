import ModelViewer from "@/components/ModelViewer";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="z-10 whitespace-nowrap m-0 text-5xl font-bold tracking-[4px] text-[#00ff2a] font-courier text-shadow-glow-title py-8">
        RenderPlay Feature Canvas Preview
      </h1>
      <ModelViewer />
    </main>
  );
}