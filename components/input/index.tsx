"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Wallpaper } from "@/types/wallpaper";

interface Props {
  setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>;
}

export default function ({ setWallpapers }: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  useEffect(() => {
    console.log("current text:", description);
  }, [description]);

  const genWallpaper = async function () {
    const params = {
      description: description,
    };

    setLoading(true)
    const result = await fetch("/api/gen-wallpaper", {
      method: "POST",
      body: JSON.stringify(params),
    });
    setLoading(false);
    const { data } = await result.json();

    if (data) {
      setWallpapers((wallpapers: Wallpaper[]) => [data, ...wallpapers])
    }
  };

  const handleSubmit = async function () {
    console.log("current", description);
    if (!description) {
        alert("Please input");
        return;
    }

    await genWallpaper();
  };

  return (
    <div className="max-w-xl mx-auto flex items-center">
      <Input
        type="text"
        placeholder="Please describe the image you want to generate"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <Button className="ml-4" onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating" : "Generate"}
      </Button>
    </div>
  );
}
