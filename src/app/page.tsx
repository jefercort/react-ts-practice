import { RandomFox } from "../../components/RabdomFox";

export default function Home() {
  const randomNumber = Math.floor(Math.random() * 123) + 1;

  return (
    <div>
      <main>
        <h1>
          Hello Kevin
          <RandomFox image={`https://randomfox.ca/images/${randomNumber}.jpg`} />
        </h1>
      </main>
      <footer>

      </footer>
    </div>
  );
}
