"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Input from "@/components/input";
import Wallpaper2 from "@/components/wallpaper2";
import { Wallpaper } from "@/types/wallpaper";
import { useEffect, useState } from "react";


export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  const fetchWallpapers = async function () {
    const result = await fetch("/api/gen-wallpapers");
    const { data } = await result.json();

    if (data) {
      setWallpapers(data);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Input setWallpapers={setWallpapers} />
      <Wallpaper2 wallpapers={wallpapers} />
      <Footer />
    </div>
  );
}
