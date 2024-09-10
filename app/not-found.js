import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <main className="text-center pt-5 vh-100">
        <Image
            src="/favicon.ico"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        <h2 className="color404 font-weight-bold pt-5">¡Ups! Parece que hubo un problema</h2>
        <p class="mt-5">No podemos encontrar la ruta que nos pides</p>
        <p>Vuelve al  <Link href="/">Home</Link> y utiliza la barra de navegación</p>
    </main>
  )
}