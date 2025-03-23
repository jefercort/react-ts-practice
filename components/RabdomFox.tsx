// Nosotros usamos JSX.Element para indicar que si o si estamos devolviendo un componente de React

import type { FunctionComponent, FC, JSX } from "react"

type Props = {
    image: string
}

// 1. Forma implicita
// export const RandomFox = () => {
//     return <Image />
// }
// const randomNumber = Math.floor(Math.random() * 123) + 1;
// 2. Forma explicita donde estamos tipando el retorno de la funcion
export const RandomFox = ({image}: Props): JSX.Element => {
    // const image: string = `https://randomfox.ca/images/${randomNumber}.jpg`
    return <img width={320} height="auto" src={image} className=" rounded-2xl" />
}

// 3. Forma explicita usando FunctionComponent tipando directamente la constante
// export const RandomFox: FunctionComponent = () => {
//     return <Image />
// }

// 4. Forma explicita usando FC tipando directamente la constante
// export const RandomFox: FC = () => {
//     return <Image />
// }