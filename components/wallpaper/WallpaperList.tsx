"use client";

import { Wallpaper } from "@/types/wallpaper";
import { useState, useEffect } from "react";
import Image from 'next/image';


export default function () {
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | null>(null);

  const fetchWallpapers = async function () {
    const result = await fetch("http://localhost:3000/api/gen-wallpapers");
    const { data } = await result.json();

    if (data) {
      setWallpapers(data);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  return (
    <div>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Heading Container */}
          <div className="mb-8 text-center md:mb-12 ">
            {/* Heading */}
            <h2 className="text-3xl font-bold md:text-5xl">
              What our clients are saying
            </h2>
            {/* Subeading */}
            <p className="mt-4 text-gray-500 text-base">
              Lorem ipsum dolor sit amet elit ut aliquam
            </p>
          </div>
          {/* Contents */}
          <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-4 ">
            {/* Content */}
                {wallpapers && wallpapers.map((wallpapers: Wallpaper, idx: number) => {
                    return (
                        <div key={idx} className="mx-auto w-full max-w-md gap-4 rounded-md bg-gray-100 p-8 text-black sm:px-4 sm:py-8">
                            <div className="mb-3 flex w-full items-center justify-between">
                                <div className="flex items-center">
                                <img
                                    src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64772e4ec124557640300fd8_Column.png"
                                    alt=""
                                    className="mr-4 inline-block h-8 w-8 rounded-full"
                                />
                                <h6 className="text-base font-bold">{wallpapers.img_name}</h6>
                                </div>
                            </div>
                            <Image
                                src="/gemini-native-image.png"
                                alt=""
                                className="inline-block h-60 w-full rounded-md object-cover"
                                width={500}
                                height={240}
                            />
                            <div className="flex w-full flex-col items-start gap-5 p-0">
                                <div>
                                {wallpapers.img_des}
                                </div>
                            </div>
                        </div>
                    )
                })}
          </div>
          {/* Button */}
          <div className="w-full flex justify-center">
            <a
              href="#"
              className="bg-black px-6 py-3 text-center font-semibold text-white"
            >
              Check All Reviews
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
