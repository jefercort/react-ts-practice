'use client'
import { MouseEventHandler, useState } from "react";
import { LazyImage } from "../../components/LazyImage";

const randomNumber = () =>  Math.floor(Math.random() * 123) + 1;

type ImageItems = {
  id: number;
  url: string;
};

//Generate a random Id for the image in string format
const randomId = () => Math.floor(Math.random() * 155423) + 1;

export default function Home() {
  const [images, setImages] = useState<ImageItems[]>([]);

  const addNewFoxes: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newImageItem: ImageItems = {
      id: randomId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`
    }

    setImages([
      ...images,
      newImageItem
    ])
  };

  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello Kevin
        </h1>          
        <button onClick={addNewFoxes}>Add New Images</button>
        {
          images.map(({ id, url }) => (
            <div key={id} className="p-4">
              <LazyImage image={url} />

            </div>
          ))
        }
      </main>
      <footer>

      </footer>
    </div>
  );
}
