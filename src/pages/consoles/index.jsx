import { useState, useEffect } from "react";
import { showList } from "@/components/ShoppingList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsList from "@/components/ProductsList";
import { consolesList } from "@/db/Products";

const items = consolesList()

export default function Consoles() {
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

    return(
        <>
            <Header totalList={totalList} home='../' consoles='../consoles' games='../games' gift='../giftCard' logo='GGS_logo.png' path='consoles' ></Header>
            <main className="flex flex-col items-center">
                {/* recebe os produtos passando parametros padroes */}
                <ProductsList 
                    list={items} 
                    currentPage={1} 
                    classifler={'relevance'}
                    filter={[true, true, true]}
                    path={'consoles'}
                    src={null}>
                </ProductsList>                
            </main>
            <Footer></Footer>
        </>
    )
}