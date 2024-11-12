import Router from "next/router"

// cart = carrinho,[palavra chave] onde é salvo sessionstorege
// itemlist é o array [valor] que é transformado em string e salvo em cart
let itemsList = []

function getCart() {
    if (typeof window !== "undefined") {
        // obtem cart de sessionstorege
        const cart = sessionStorage.getItem('cart')
        // se cart exite retorna valor, se não retorna null
        return cart ? JSON.parse(cart) : null
    }
    return null
}

export function addList(id, btn) {
    if (typeof window !== "undefined") {
        // verifica se cart existe
        let cart = getCart()
        // se cart for diferente de null não é a primeira vez que um valor é salvo
        if(cart !== null) {
            // obtem cart e transforma em Array, salva o valor em itemList
            itemsList = JSON.parse(sessionStorage.getItem('cart'))
        }

        // evita que o mesmo item seja adicionado
        const item = itemsList.find(item => item === id)

        if(item === undefined) {
            // adiciona o item ao array
            itemsList.push(id)
        }
        // transforma em json e salva em "cart" no sessionstorege
        sessionStorage.cart = JSON.stringify(itemsList)
        
        if(btn === 'buy') {
            // envia para pagina do carrinho
            Router.push('/shoppingCart')
        }
        
    }
}

export function showList() {
    if (typeof window !== "undefined") {
        // obtem cart
        const list = getCart()
        // se existir retorna lista, se não retorna null
        if(list) {        
            return list
        } else {
            return null
        }
    }    
}

export function removeFromList(value) {
    if (typeof window !== "undefined") {
        // obtem a lista
        itemsList = JSON.parse(sessionStorage.getItem('cart'))
        // remove o item/id da lista
        itemsList = itemsList.filter(item => item !== value)
        // transforma em json e salva em "cart" no sessionstorege
        sessionStorage.cart = JSON.stringify(itemsList)

        return itemsList      

    }
}

export function clearList() {
    sessionStorage.clear()
    itemsList = []
}