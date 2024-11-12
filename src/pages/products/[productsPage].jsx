import { useState, useEffect } from "react";
import { showList } from "@/components/ShoppingList";
import { useRouter } from "next/router"
import { consolesList, gamesList, cardList } from '../../db/Products.js'
import Header from "@/components/Header.jsx"
import Footer from "@/components/Footer.jsx";
import { addList } from "@/components/ShoppingList.js";

// =====Swiper=====
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Zoom, Pagination, Navigation } from "swiper";


// altera entre falso e verdadeiro o estado de showMore
function handleShowMore(showMore, setShowMore) {
    setShowMore(!showMore)
}


export default function ProductPage() {  
    // cria um estado para mostrar a descrição e ocultar
    const [showMore, setShowMore] = useState(false) 
    
    // totalList representa o total de itens no carrinho, é passado como props para Header
    const [totalList, setTotalList] = useState(0)

    // litita o total de itens para adicionar
    const [addLimit, setAddLimit] = useState(0)

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
    
    

    function updateTotalList() {
        if(addLimit < 1) {
            setTotalList(totalList + 1)
            setAddLimit(addLimit + 1)
        }
    }

    const router = useRouter()

    // Garante que ao recarregar a pagina não retorne router.query vazio
    if (!router.query || Object.keys(router.query).length === 0) {
        return <div>Carregando...</div>
    }
    

    // recebe o valor da url
    const id = parseInt(router.query.productsPage)
    // extrai todos os itens de db
    const consoles = consolesList()
    const games = gamesList()
    const cards = cardList()
    const products = consoles.concat(games, cards)
    // filtra procurando na lista o item com mesmo id
    const productItem = products.find(product => product.id === id)    

    // cria a galeria
    function createGallery() {    
        
        // se as duas condições forem verdadeiras cria a galeria
        if(productItem.gallery !== undefined && productItem.gallery.length !== 0) {            
            // faz o mapeamento
            return (productItem.gallery.map((item, index) => {                
                return (
                    // para cada item é criado um slide com a imagem
                    <SwiperSlide key={index} className="flex justify-center">                        
                        <div className="swiper-zoom-container">
                            {/* product.gallery contem um array, cada item do array é 
                            um caminho para imagem que é passado para src */}
                            <img className="object-contain h-48 sm:h-64 lg:h-80 xl:h-96 w-full" src={item}></img>
                        </div>
                    </SwiperSlide>
                )
            }))
        } // se uma delas for falsa retorna uma mensagem 
        else {
            return(
                <SwiperSlide>
                        <p className="mt-10">Produto sem imagens...</p>                    
                </SwiperSlide>
            )            
        }
    }

    return (
        <>
            <Header totalList={totalList} home='.././' consoles='../consoles' games='../games' gift='../giftCard' logo='../GGS_logo.png'></Header>
            <main className="flex justify-center">
                <div className="flex flex-col items-center w-11/12 ">

                    {/* =====titulo===== */}
                    <h1 className="flex justify-center sm:justify-start w-11/12 sm:max-w-lg mt-8 mx-2 title-item text-2xl sm:text-3xl">{productItem.name}</h1>

                    {/* =====Galeria===== */}
                    <div className="flex justify-center w-full h-48 mt-5 sm:max-w-lg sm:h-64 sm:mt-8 lg:max-w-2xl lg:h-80 xl:max-w-3xl xl:h-96 ">
                        <Swiper
                            className="mySwiper"
                            pagination={{
                                clickable: true,
                            }}
                            zoom={true}
                            navigation={true}
                            modules={[Zoom, Pagination, Navigation]}
                        >   
                            {/* cria a galeria */}
                            {createGallery()}
                        </Swiper>
                    </div>

                    {/* =====preço===== */}
                    <div className="flex lg:hidden justify-start w-10/12 sm:max-w-md lg:max-w-xl xl:max-w-2xl">
                        <p className="font-price text-xl text-green-600 mt-5 lg:mt-8">
                            {/* converte o valor de price para real */}
                            R$: {(productItem.price).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                    </div>

                    {/* =====botoes compra e carrinho===== */}
                    <div className="flex flex-col sm:items-center sm:flex-row sm:gap-x-6 sm:max-10/12 mt-5 lg:mt-10 ">
                        <p className="hidden lg:flex font-price text-xl text-green-600 ">
                            {/* converte o valor de price para real */}
                            R$: {(productItem.price).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                        <button onClick={() => addList(productItem.id, 'buy')} className="font-button-buy text-white bg-red-600 p-2 rounded-md">Comprar agora</button>
                        <button onClick={() => {
                            addList(productItem.id, 'cart')
                            updateTotalList()
                            }}
                            className="flex flex-row items-center font-button-buy text-white bg-orange-600 p-2 rounded-md mt-1 sm:mt-0">
                            Adicionar ao Carrinho
                            <svg className="h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* =====Descrição===== */}
                    <div className="flex flex-col w-full lg:max-w-4xl mt-8 mb-5">
                        <h2 className="title-item font-medium text-lg">Descrição:</h2>
                        {/* conforme o valor de showMore é mostrado ou a descrição cortada ou a completa */}
                        {showMore ?
                            <div>
                                {/* se o item não houver descrição é mostrado o texto sem descrição */}
                                {productItem.completeDescription ? productItem.completeDescription : <p className="h-24">Sem descrição</p>}
                            </div>
                            :
                            <div>
                                <span className="absolute w-11/12 lg:max-w-4xl h-24 z-30 bg-gradient-to-b from-white/10 to-white/40"></span>
                                <div className="w-full h-24 overflow-hidden line-clamp-4 z-10">                                
                                    {productItem.cutDescription ? productItem.cutDescription : 'Sem descrição'}                                
                                </div>
                            </div>
                            
                        }
                        <div className="flex flex-col justify-center items-center">
                            {/* mostra o botão conforme o estado de showMore */}
                            {showMore ?
                            // clicar no no botão altera o estado oque faz com que altere o botão
                            <button className="flex flex-col items-center w-36 bg-orange-600 font-button-buy text-white p-1 mt-3 rounded-lg" onClick={() => handleShowMore(showMore, setShowMore)}>
                                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>   
                                Mostrar menos
                            </button>
                            :
                            <button className="flex flex-col items-center w-36 bg-orange-600 font-button-buy text-white p-1 mt-3 rounded-lg" onClick={() => handleShowMore(showMore, setShowMore)}>
                                Mostrar mais
                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg> 
                            </button>
                            }
                        </div>
                    </div>

                </div>

            </main>
            <Footer></Footer>
        </>
    )
}