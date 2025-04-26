"use client";

import { Wallpaper } from "@/types/wallpaper";
import Image from 'next/image';


interface Props {
  wallpapers: Wallpaper[];
}

export default function ({ wallpapers }: Props) {
  return (
    <div>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Heading Container */}
          <div className="mb-8 text-center md:mb-12 ">
            {/* Heading */}
            <h2 className="text-primary text-3xl font-bold md:text-5xl">
              All Wallpapers
            </h2>
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
                                    src="/images/gemini-native-image-05.png"
                                    alt=""
                                    className="mr-4 inline-block h-8 w-8 rounded-full"
                                />
                                <h6 className="text-base font-bold">{wallpapers.img_name}</h6>
                                </div>
                            </div>
                            <Image
                                src={wallpapers.img_url}
                                alt=""
                                className="inline-block h-60 w-full rounded-md object-cover"
                                width={500}
                                height={240}
                            />
                            <div className="flex w-full flex-col items-start gap-5 p-0">
                                <div>
                                {wallpapers.img_description}
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
