// Nosotros usamos JSX.Element para indicar que si o si estamos devolviendo un componente de React

import { type FunctionComponent, type FC, type JSX, useRef, useEffect, useState } from "react"

type Props = {
    image: string
};


// 1. Forma implicita
// export const RandomFox = () => {
//     return <Image />
// }
// const randomNumber = Math.floor(Math.random() * 123) + 1;
// 2. Forma explicita donde estamos tipando el retorno de la funcion
export const RandomFox = ({image}: Props): JSX.Element => {
    const [src, setSrc] = useState<string>(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
    );
    const node = useRef<HTMLImageElement>(null);

    useEffect(() => {
        //nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setSrc(image);
                }
            });
        });
    
        
        if (node.current) {
            observer.observe(node.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [image]);


    // const image: string = `https://randomfox.ca/images/${randomNumber}.jpg`
    return <img ref={node} width={320} height="auto" src={image} className=" rounded-2xl bg-stone-500" />
}

// 3. Forma explicita usando FunctionComponent tipando directamente la constante
// export const RandomFox: FunctionComponent = () => {
//     return <Image />
// }

// 4. Forma explicita usando FC tipando directamente la constante
// export const RandomFox: FC = () => {
//     return <Image />
// }