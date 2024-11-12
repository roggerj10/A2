import Link from "next/link";

export default function Footer() {

    return (
        <footer className="relative bottom-0 w-full h-24 min-[333px]:h-20 mt-10 bg-gray-800 text-white font-classifler-option ">
            <div className="flex flex-col items-center h-full justify-center">
                <p className=""></p>
                <p>Desenvolvido por: Roger Jorge F. dos Passos</p>
                <div className="flex flex-row justify-around w-full min-[400px]:max-w-md flex-wrap">                                        
                    <p className="mx-1">LinkedIn: <Link className="hover:underline" href="https://www.linkedin.com/in/roger-jorge-f-972800215/">Roger</Link></p>
                    <p className="mx-1">GitHub: <Link className="hover:underline" href="https://github.com/Vinicius1998ls">roggerj10</Link></p>
                </div>
            </div>
        </footer>
    )
}