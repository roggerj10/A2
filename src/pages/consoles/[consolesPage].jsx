import { useState, useEffect } from "react";
import { showList } from "@/components/ShoppingList";

import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { consolesList } from "@/db/Products";
import ProductsList from "@/components/ProductsList";


export default function ConsolesPages() {

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
    
    // Garante que ao recarregar a pagina não retorne router.query vazio
    if (!router.query || Object.keys(router.query).length === 0) {
        return <div>Carregando...</div>
    }

    const items = consolesList()
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
    const currentPage = router.query.consolesPage
    const path = router.query.path

    return (
        <>
            <Header home='.././' consoles='../consoles' games='../games' gift='../giftCard' path='consoles'></Header>
            <main className="flex flex-col items-center">
                {isAdmin && <button>Adicionar Console</button>}
                {/* gera a lista conforme parametros */}
                <ProductsList 
                    list={items}
                    currentPage={currentPage} 
                    classifler={classifler}
                    filter={filter}
                    path={path}
                    src={null}>
                </ProductsList>                
            </main>
            <Footer></Footer>
        </>
    )
}