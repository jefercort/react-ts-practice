// Nosotros usamos JSX.Element para indicar que si o si estamos devolviendo un componente de React

import { type FunctionComponent, type FC, type JSX, useRef } from "react"

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
    const node = useRef<HTMLImageElement>(null);

    // const image: string = `https://randomfox.ca/images/${randomNumber}.jpg`
    return <img ref={node} width={320} height="auto" src={image} className=" rounded-2xl" />
}

// 3. Forma explicita usando FunctionComponent tipando directamente la constante
// export const RandomFox: FunctionComponent = () => {
//     return <Image />
// }

// 4. Forma explicita usando FC tipando directamente la constante
// export const RandomFox: FC = () => {
//     return <Image />
// }