import { Wallpaper } from "@/types/wallpaper";

async function getData(): Promise<Wallpaper[]> {
  const result = await fetch("/api/gen-wallpapers");

  const { data } = await result.json();

  return data;
}

export default async function () {
  const data = await getData();

  console.log(data);

  return (
    <section>
      <div>
        {data.map((v: Wallpaper, idx: number) => {
          return (
            <div key={v.id | idx} className="mx-4">              
              <h2 className="text-lg font-bold">{v.img_des}</h2>
              <h3>{v.img_path}</h3>
            </div>
          )
        })};
      </div>
    </section>
  );
}
