'use client'
import { useState } from "react";
import { RandomFox } from "../../components/RabdomFox";

const randomNumber = () =>  Math.floor(Math.random() * 123) + 1;

export default function Home() {
  const [images, setImages] = useState<string[]>([
    `https://randomfox.ca/images/${randomNumber()}.jpg`,
    `https://randomfox.ca/images/${randomNumber()}.jpg`,
    `https://randomfox.ca/images/${randomNumber()}.jpg`,
    `https://randomfox.ca/images/${randomNumber()}.jpg`
  ]);

  return (
    <div>
      <main>
        <h1>
          Hello Kevin
          {
            images.map((image, index) => (
              <div key={index} className="p-4">
                <RandomFox image={image} />

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
