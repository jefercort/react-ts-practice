'use client'
import { MouseEventHandler, useState } from "react";
import { RandomFox } from "../../components/RabdomFox";

const randomNumber = () =>  Math.floor(Math.random() * 123) + 1;

type ImageItems = {
  id: number;
  url: string;
};

//Generate a random Id for the image in string format
const randomId = () => Math.floor(Math.random() * 123) + 1;

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
        <h1>
          Hello Kevin
          <button onClick={addNewFoxes}>Add New Images</button>
          {
            images.map(({ id, url }) => (
              <div key={id} className="p-4">
                <RandomFox image={url} />

              </div>
            ))
          }
        </h1>
      </main>
      <footer>

      </footer>
    </div>
  );
}
