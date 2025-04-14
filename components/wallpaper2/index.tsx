"use client"


import { Wallpaper } from "@/types/wallpaper";
import { useEffect, useState } from "react";
import WallpaperList from "../wallpaper/WallpaperList";


// client side trigger API
export default function () {
  // const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);
  
  // const fetchWallpapers = async function() {
  //   const result = await fetch("http://localhost:3000/api/gen-wallpapers");
  //   const { data } = await result.json();

  //   if (data) {
  //     setWallpapers(data);
  //   }
  // }

  // useEffect(() => {
  //   fetchWallpapers();
  // }, []);

  return (
    <section className="max-w-6xl mx-auto">
      <WallpaperList />
    </section>
  );
}
