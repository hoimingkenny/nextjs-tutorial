import { Wallpaper } from "@/types/wallpaper"

export function GET(req: Request) {
    const wallpapers: Wallpaper[] = [
        {
            id: 1,
            img_name: "Cat",
            img_des: "catcatctactactatcat",
            img_path: "/images/gemini-native-image-01.png",
        },
        {
            id: 2,
            img_name: "Mimi",
            img_des: "mimimimimimimimimimi",
            img_path: "/images/gemini-native-image-02.png",
        },
        {
            id: 3,
            img_name: "Gulo",
            img_des: "gulogulogyulogulo",
            img_path: "/images/gemini-native-image-03.png",
        },
        {
            id: 4,
            img_name: "Yuyu",
            img_des: "yuyuyuyuyuyuyuyuyuyu/",
            img_path: "/images/gemini-native-image-04.png",
        },
    ];

    return Response.json({
        code: 0,
        message: "ok",
        data: wallpapers,
    })
}