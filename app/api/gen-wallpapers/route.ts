export function GET(req: Request) {
    return Response.json({
        code: 0,
        message: "ok",
        data: [
            {
                img_url: "xxx",
            }
        ]
    })
}