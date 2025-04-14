import { Wallpaper } from "@/types/wallpaper"

export function GET(req: Request) {
    const wallpapers: Wallpaper[] = [
        {
            id: 1,
            img_name: "Cat",
            img_des: "catcatctactactatcat",
            img_url: "https://wallpapers.com/1",
        },
        {
            id: 2,
            img_name: "Mimi",
            img_des: "mimimimimimimimimimi",
            img_url: "https://wallpapers.com/2",
        },
        {
            id: 3,
            img_name: "Gulo",
            img_des: "gulogulogyulogulo",
            img_url: "https://wallpapers.com/3",
        },
        {
            id: 4,
            img_name: "Yuyu",
            img_des: "yuyuyuyuyuyuyuyuyuyu/",
            img_url: "https://wallpapers.com/4",
        },
    ];

    return Response.json({
        code: 0,
        message: "ok",
        data: wallpapers,
    })
}