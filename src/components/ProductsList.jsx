import { useState } from "react"
import { useRouter } from "next/router"

import CreateList from "./CreateList"
import Classifler from "./Classifler"
import Filter from "./Filter"
import { Pagination, itemsPage } from "./CreatePages"
import { cardList, consolesList, gamesList } from "@/db/Products"
import GetResults from "./GetResults"


export default function ProductsList(props) {

    const router = useRouter()

    // guarda os parametros
    const oldList = props.list
    const oldClassifler = props.classifler
    const oldFilter = props.filter
    const currentPage = props.currentPage
    const path = props.path
    const src = props.src
    
    // aplica os parametros recebido por props e cria a primeira lista
    let firtList = Filter(oldFilter, oldList, oldClassifler)
    // cria um estado para lista
    const [list, setList] = useState(firtList)
    // divide a lista em paginas|retorna um array de arrays, cada um representa 1 pagina
    const itemsPerPage = itemsPage(list)

    // =====Ordenar=====
    // guarda o ordenador atual para usar em Filter.jsx
    const [currentClassifler, setCurrentClassifler] = useState(oldClassifler)

    // função para alterar/ordenar a lista
    function handleList(value, list) {
        // passa list para newList para permitir alteração
        let newList = [...list]

        // chama a função classifler passando como parametro
        // o valor recebido de select e a lista de produtos
        // o resultado retornado da função setList altera o estado
        // com a nova ordenada lista e renderiza
        setList(Classifler(value, newList))
        // altera o valor de currentClassifler
        setCurrentClassifler(value)
    }


    // =====filtrar=====
    // recebe o array via props indicando quais estão marcadas conforme true ou false
    const [isChecked, setIsChecked] = useState(oldFilter)

    //altera o estado, marcando e desmarcando o checkbox
    function handleCheck(index) {

        let checkedList = [...isChecked]
        // altera o valor na posição indicada
        checkedList[index] = !checkedList[index]
        //atualiza a isChecked
        setIsChecked(checkedList)
        let items = getProducts(path)
        // conforme a o caminho acontece ações diferentes
        // srcPage e nextSrcPage tem ações unicas
        if(path !== 'srcPage' && path !== 'nextSrcPage') {
            //filtra a lista              
            setList(Filter(checkedList, items, currentClassifler))
            // após filtrar reencaminha para a primeira pagina com os filtros
            router.push({
                pathname: `../${path}/${1}`,
                query: {
                    classifler: `${currentClassifler}`,
                    filter: `${checkedList}`,
                    path: `${path}`
                }
            })
            
        } else if(path === 'nextSrcPage') {
            items = GetResults(items, src)
            
            setList(Filter(checkedList, items, currentClassifler))
            
            router.push({
                pathname: `../${path}/${1}`,
                query: {
                    classifler: `${currentClassifler}`,
                    filter: `${checkedList}`,
                    path: `${path}`,
                    src: `${src}`
                }
            })
            
        } else {
            items = GetResults(items, src)
            setList(Filter(checkedList, items, currentClassifler))
        }
    }

    function getProducts(path) {
        let items = []
        if (path === 'consoles') {
            items = consolesList()
        } else if (path === 'games') {
            items = gamesList()
        } else if (path === 'giftCard') {
            items = cardList()
        } else {
            let consoles = consolesList()
            let games = gamesList()
            let card = cardList()
            items = consoles.concat(games, card)
        }
        return items
    }

    const [filterOpen, setFilterOpen] = useState(false)

    function openFilter() {
        if (filterOpen === false) {
            setFilterOpen(true)
        } else {
            setFilterOpen(false)
        }
    }

    return (
        <>
            {/* abre um span que cobre toda a pagina para fechar filtro quando usuario clicar fora dele */}
            {filterOpen ?
                <span onClick={openFilter} className="fixed w-full h-full z-30"></span>
                :
                null
            }

            <div className="w-10/12 mt-5 justify-end min-[400px]:w-9/12 lg:max-w-5xl">

                <div className="absolute w-fit px-1 rounded-lg z-30 bg-orange-500">

                    <div className="flex flex-row items-center">
                        <legend className="font-classifler text-white p-1">Filtrar</legend>
                        {filterOpen ?
                            null
                            :
                            <svg onClick={openFilter} className="h-5 w-5 text-white mt-px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        }
                    </div>

                    {filterOpen ?
                        <div className="relative w-fit h-fit z-40">

                            <div className="flex flex-row items-center">
                                <legend className="font-classifler text-white bg-orange-500 p-1 rounded-lg">Ordenar por:{" "}</legend>
                                <select className={`h-5 mt-px rounded-lg focus:outline-none 
                                    font-classifler-option text-black`}
                                    value={currentClassifler}
                                    // ao alterar chama a função handleList passando o valor de 
                                    // select e o array com estado list 
                                    onChange={(event) => handleList(event.target.value, list)}>
                                    <option value="relevance">Relevância</option>
                                    <option value="lowest">Menor Preço</option>
                                    <option value="biggest">Maior Preço</option>
                                </select>
                            </div>

                            <div className="p-1">
                                <legend className="font-classifler text-white">{`Filtrar por ${path === 'consoles' ? 'marca:' : 'plataforma:'}`}</legend>
                                <div className="font-classifler text-white">
                                    <input type="checkbox" name="Xbox" id="Xbox"
                                        // marca o campo conforme o estado
                                        checked={isChecked[0]}
                                        // quando desmarca chama a função passando o numero do index 
                                        onChange={() => handleCheck(0)} />
                                    <label htmlFor="Xbox" className="ml-1">Xbox</label>
                                </div>
                                <div className="font-classifler text-white">
                                    <input type="checkbox" name="Playstation" id="Playstation"
                                        checked={isChecked[1]}
                                        onChange={() => handleCheck(1)} />
                                    <label htmlFor="Playstation" className="ml-1">Playstation</label>
                                </div>
                                <div className="font-classifler text-white">
                                    <input type="checkbox" name="Nintendo" id="Nintendo"
                                        checked={isChecked[2]}
                                        onChange={() => handleCheck(2)} />
                                    <label htmlFor="Nintendo" className="ml-1">Nintendo</label>
                                </div>

                            </div>

                            {filterOpen ?
                                <div className="flex justify-center">
                                    <svg onClick={openFilter} className="flex w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                </div>
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }

                </div>
            </div>

            <div className="flex justify-center mt-6 z-10 min-h-[70vh]">
                <ul className="flex flex-row flex-wrap justify-center mt-5 max-w-6xl">
                    {/* renderiza a lista conforme o array de paginas, currentPages indica qula pagina */}
                    <CreateList list={itemsPerPage[currentPage]} path={path} />
                </ul>
            </div>

            {/* cria a paginação passando parametros para criar as paginas seguintes */}
            <Pagination
                list={list}
                classifler={currentClassifler}
                filter={isChecked}
                currentPage={currentPage}
                path={path}
                src={src}>
            </Pagination>


        </>
    )
}