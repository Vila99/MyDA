import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="text-center pt-5 vh-100">
        <img src="\favicon.ico" height={200} className="pt-5 mt-5"/>
        <h2 className="color404 font-weight-bold pt-5">¡Ups! Parece que hubo un problema</h2>
        <p class="mt-5">No podemos encontrar la ruta que nos pides</p>
        <p>Vuelve al  <Link href="/">Home</Link> y utiliza la barra de navegación</p>
    </main>
  )
}