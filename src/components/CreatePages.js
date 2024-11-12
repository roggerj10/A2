import Link from "next/link";

// divide a lista por paginas
function Divide(list) {
    let listCopy = [...list]

    const pages = []
    let index = 1

    while (listCopy.length !== 0) {
        if (listCopy.length > 12) {
            pages[index] = listCopy.splice(0, 12)
        } else {
            pages[index] = listCopy.splice(0, listCopy.length)
        }

        index += 1
    }

    return pages
}

export function itemsPage(list) {

    // manda dividir a lista por paginas
    const pages = Divide(list)

    return pages
}

export function Pagination(props) {
    const list = props.list
    const classifler = props.classifler
    const filter = props.filter
    const currentPage = parseInt(props.currentPage)
    let path = props.path
    // esse trecho serve para direcionar para segunda pagina da pesquisa
    if(path === 'srcPage') {
        path = 'srcPage/nextSrcPage'
    }
    const src = props.src
    const pages = Divide(list)
    
    function createPages() {
        let pager = []
        
        for (let i = 1; i <= pages.length - 1; i++) {
            // cria o paginador com o link que é gerado conforme os parametros recebidos
            if (i === currentPage) {
                pager[i] = <li key={i} className="flex justify-center items-center h-6 w-6 font-button-buy text-base p-1 m-1 rounded-full bg-orange-500 text-white">
                    {/* se src for null é gerado o link sem src */}
                    {src === null ?
                        <Link href={{
                            pathname: `../${path}/${i}`,
                            query: {
                                classifler: `${classifler}`,
                                filter: `${filter}`,
                                path: `${path}`                                
                            }
                        }}><span className="p-2">{i}</span>
                        </Link>
                        :
                        <Link href={{
                            pathname: `../${path}/${i}`,
                            query: {
                                classifler: `${classifler}`,
                                filter: `${filter}`,
                                path: `${path}`,
                                src: `${src}`
                            }
                        }}><span className="p-2">{i}</span>
                        </Link>
                    }

                </li>
            } else {
                pager[i] = <li key={i} className="flex justify-center items-center h-6 w-6 font-button-buy text-base p-1 m-1 rounded-full bg-blue-500 text-black hover:bg-orange-500 hover:text-white">
                    {src === null ?
                        <Link href={{
                            pathname: `../${path}/${i}`,
                            query: {
                                classifler: `${classifler}`,
                                filter: `${filter}`,
                                path: `${path}`                                
                            }
                        }}><span className="p-2">{i}</span>
                        </Link>
                        :
                        <Link href={{
                            pathname: `../${path}/${i}`,
                            query: {
                                classifler: `${classifler}`,
                                filter: `${filter}`,
                                path: `${path}`,
                                src: `${src}`
                            }
                        }}><span className="p-2">{i}</span>
                        </Link>
                    }
                </li>
            }
        }

        return pager
    }

    return (
        <div className="flex flex-row justify-center items-center mt-5">
            <ul className="flex flex-row">
                {createPages()}
            </ul>
        </div>
    )
}