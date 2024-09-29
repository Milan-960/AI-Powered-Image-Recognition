import ThreeScene from "@/components/ThreeScene";
import ImagePage from "@/pages/ImagePage";

export default function Home() {
  return (
    <div>
      {/* Three.js Animation */}
      <ThreeScene />
      <ImagePage />
    </div>
  );
}
