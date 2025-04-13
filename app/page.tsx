import Footer from "@/components/footer";
import Header from "@/components/header";
import Wallpaper from "@/components/wallpaper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Wallpaper />
      <Footer />
    </div>
  );
}
