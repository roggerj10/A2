import { useState, useEffect } from "react";
import { showList } from "@/components/ShoppingList";

import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { consolesList, cardList, gamesList } from "@/db/Products";
import ProductsList from "@/components/ProductsList";
import GetResults from "@/components/GetResults";

export default function Results() {
    // totalList representa o total de itens no carrinho, é passado como props para Header
    const [totalList, setTotalList] = useState(0)

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

    const router = useRouter()

    if (!router.query || Object.keys(router.query).length === 0) {
        return <div>Carregando...</div>
    }
   
    // extrai a palavra buscada da url 
    const src= router.query.src

    // extrai as informações recebidas pelo link
    const classifler = router.query.classifler
    // como os valores de filter vem em string aqui é transformado em Boolean
    const filterString = router.query.filter.split(',')
    const filter = filterString.map(item => {
        if(item === 'true') {
            item = true
            return item
        } else {
            item = false
            return item
        }
    })
    const currentPage = router.query.nextPageResults

    const consoles = consolesList()
    const games = gamesList()
    const cards = cardList()
    const products = consoles.concat(games, cards)

    const results = GetResults(products, src)    

    return (
        <>
            <Header totalList={totalList} home='../.././' consoles='../../consoles' games='../../games' gift='../../giftCard' logo='../../GGS_logo.png' ></Header>
            <main className="flex flex-col items-center">
                <h2 className="title-item text-xl mt-8">Você buscou por: <span className="font-price text-xl">{src}</span></h2>
                <ProductsList
                    list={results} 
                    currentPage={currentPage} 
                    classifler={classifler}
                    filter={filter}
                    path={'nextSrcPage'}
                    src={src}>
                </ProductsList>         
            </main>
            <Footer></Footer>
        </>
    )
}