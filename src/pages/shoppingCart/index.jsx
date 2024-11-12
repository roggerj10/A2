import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { removeFromList, showList, clearList } from "@/components/ShoppingList"
import { useEffect, useState } from "react"
import { consolesList, gamesList, cardList } from "@/db/Products"
import Link from "next/link"

export default function Shopping() {

    // list é um array de objetos que é renderizado na pagina
    const [list, setList] = useState([])
    // totalList representa o total de itens no carrinho, é passado como props para Header
    const [totalList, setTotalList] = useState(0)

    useEffect(() => {
        function getIDs() {
            if (typeof window !== "undefined") {
                const list = showList()
                return list
            }
        }

        // chama a função para obter de sessionStorage o array de IDs
        const listSession = getIDs()

        // extrai todos os item
        const consoles = consolesList()
        const games = gamesList()
        const cards = cardList()
        const products = consoles.concat(games, cards)

        // se obteve com sucesso o array de IDs executa o seguinte trecho
        if (listSession !== null && listSession !== undefined) {

            // obtem os produtos com mesmo id
            const productsOnList = listSession.map(item => {
                const items = products.find(product => product.id === item)
                return items
            })

            // inseri em cada produto do array a propriedade amount = quantidade
            const productsWithAmount = productsOnList.map(product => ({
                ...product,
                amount: 1
            }))

            // inseri em cada produto do array o total de quantidade vezes preço
            const productsWithTotal = productsWithAmount.map(product => ({
                ...product,
                total: product.amount * product.price
            }))
            // inseri na list
            setList(productsWithTotal)
        }
    }, [])

    // atualiza a quantidade
    function updateAmount(id, type) {
        const newList = [...list]
        // obtem o index do array
        const itemIndex = newList.findIndex(item => item.id === id)

        if (itemIndex !== -1) {
            // obtem o item
            const item = { ...newList[itemIndex] }

            // se for igual a plus acrecenta mais 1 em amount
            if (type === 'plus') {
                item.amount += 1
                item.total = item.price * item.amount
            }
            // se for igual a minus, diminui 1 em amount
            else if (type === 'minus' && item.amount > 1) {
                item.amount -= 1
                item.total = item.price * item.amount
            }

            newList[itemIndex] = item

            setList(newList)
        }

    }

    // remove o item da lista
    function removeItem(id) {
        // obtem a lista
        const oldList = [...list]
        // filtra o item que possui o mesmo id
        const newList = oldList.filter(item => item.id !== id)
        // atualiza o state list
        setList(newList)

        // remove o mesmo item de sessionStorage
        removeFromList(id)
        // atualiza o numero total do carrinho
        updateTotalList()
    }

    // obtem o total a pagar
    function totalPayable() {
        // recebe todos os totais de list
        const allPrices = list.map(item => {
            return item.total
        })

        // soma todos eles
        const total = allPrices.reduce((sum, price) => sum + price, 0)
        return total
    }


    // atualiza o totalList/total do carrinho
    useEffect(() => {

        function getTotalShoppingList() {
            if (typeof window !== "undefined") {
                const list = showList();
                // se não houver nada retorna zero
                if (list === undefined || list === null) {
                    return 0;
                } else {
                    // se houver algo retorna transformando em numerico
                    return list.length;
                }
            }
        }
        // obtem o total de itens em sessionStorage
        const items = getTotalShoppingList();
        // atualiza o totalList que atualiza o numero do carrinho de Header
        setTotalList(items);
    }, []);

    // atualiza o numero total do carrinho 
    function updateTotalList() {
        setTotalList(totalList - 1)
    }

    const [finished, setFinished] = useState(false)

    function finalize() {
        if (finished === false) {
            setFinished(true)
        } else {
            setFinished(false)
        }
    }

    function clear() {
        clearList()        
        setTotalList(0)
    }

    return (
        <>
            <Header totalList={totalList} home='.././' consoles='../consoles' games='../games' gift='../giftCard' logo='../GGS_logo.png'></Header>

            <main className="flex flex-col items-center min-h-[80vh]">

                {finished === false ?
                    <>
                        {list !== null && list.length !== 0 ?
                            <>
                                <h2 className="title-item text-xl text-center mt-8 mx-20">Itens do carrinho:</h2>
                                <ul>
                                    {list.map(product => {

                                        return <li key={product.id} className="flex flex-row items-center mx-2 mt-5">
                                            <div className="flex flex-col sm:flex-row border-2 rounded-md divide-y-2 sm:divide-y-0 sm:divide-x-2 border-gray-200">
                                                <div className="flex flex-row items-center h-20 lg:h-24">
                                                    <div className="flex flex-row items-center w-[250px] min-[400px]:w-[300px] sm:w-[250px] lg:w-[350px] h-20 overflow-hidden">
                                                        <img className="w-16 lg:w-20 p-1" src={product.img} alt="" />
                                                        <h3 className="w-full flex flex-row items-center  title-item text-base lg:text-lg leading-5 mx-1 sm:ml-5 overflow-hidden">{product.name}<br></br>{product.platform ? product.platform : ''}</h3>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full sm:w-[250px] lg:w-[350px] justify-start ">

                                                    <div className="flex flex-row justify-around w-[250px] min-[400px]:w-[300px] sm:w-[250px] lg:w-[350px] sm:h-20 lg:h-24 items-center px-1 ">

                                                        {/* ====preço==== */}
                                                        <div className="flex flex-col items-center ml-1">
                                                            <p className="title-item text-black text-xs min-[400px]:text-sm lg:text-lg">
                                                                Preço R$:
                                                            </p>
                                                            <span className="font-price text-green-600 text-base lg:text-lg ">
                                                                {/* converte o valor de price para real */}
                                                                {(product.price).toLocaleString("pt-BR", {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}
                                                            </span>
                                                        </div>

                                                        {/* ====Quantidade==== */}
                                                        <div className="flex flex-col items-center mx-5 ">
                                                            <p className="title-item text-xs min-[400px]:text-sm lg:text-lg">Quantidade</p>

                                                            <div className="flex flex-row items-center">
                                                                <svg onClick={() => updateAmount(product.id, 'minus')} className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                                </svg>
                                                                <p>{product.amount}</p>
                                                                <svg onClick={() => updateAmount(product.id, 'plus')} className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        {/* ====total==== */}
                                                        <div className="flex flex-col items-center mr-1">
                                                            <p className="title-item text-black text-xs min-[400px]:text-sm  lg:text-lg">
                                                                total R$:
                                                            </p>
                                                            <span className="font-price text-green-600 text-base lg:text-lg ">
                                                                {/* converte o valor de price para real */}
                                                                {(product.total).toLocaleString("pt-BR", {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <svg onClick={() => removeItem(product.id)} className="w-8 h-8 p-1 text-white mx-2 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </li>


                                    })}
                                </ul>

                                <Link href="./">
                                    <button className="font-button-buy text-white w-48 h-10 bg-red-600 rounded-md mt-8">Adicionar mais itens</button>
                                </Link>

                                <div className="mt-5">
                                    <h2 className="title-item text-xl text-center mt-8 mx-20">Total a pagar: {' '}
                                        <span className="font-price text-green-600 text-base lg:text-lg ">
                                            {/* converte o valor de price para real */}
                                            {(totalPayable()).toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </span>
                                    </h2>
                                </div>

                                <button onClick={() => {
                                    finalize()
                                    clear()
                                    }} className="font-button-buy text-white w-48 h-10 bg-gray-700 rounded-md mt-8">Finalizar compra</button>
                            </>
                            :
                            <>
                                <h2 className="title-item text-xl text-center mt-8 mx-20">Nenhum item foi adicionado ao carrinho.</h2>
                                <h2 className="title-item text-xl text-center mx-20">Adicione itens ao carrinho.</h2>
                                <Link href="./">
                                    <button className="font-button-buy text-white w-28 h-14 bg-red-600 rounded-md mt-8">Voltar a comprar</button>
                                </Link>
                            </>
                        }
                    </>
                    :
                    <>
                        <h2 className="title-item text-xl lg:text-3xl text-center mt-12 lg:mt-20  mx-20>funciona">Compra finalizada!</h2>
                        <h2 className="title-item text-xl lg:text-3xl text-center mt-4 mx-20>funciona">Obrigado por comprar!</h2>
                        <Link href="./">
                            <button className="font-button-buy text-white w-20 h-10 bg-red-600 rounded-md mt-16">Voltar</button>
                        </Link>
                    </>

                }

            </main>
            <Footer></Footer>
        </>
    )
}