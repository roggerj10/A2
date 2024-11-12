import Classifler from "./Classifler"

export default function Filter(checkedList, listItems, currentClassifler) {
    
    let newList = listItems
    
    // remove os item desmarcados conforme o array checkedList
    if (checkedList[0] === false) {
        newList = newList.filter(item => item.branch !== 'xbox')
    }
    if (checkedList[1] === false) {
        newList = newList.filter(item => item.branch !== 'playstation')
    }
    if (checkedList[2] === false) {
        newList = newList.filter(item => item.branch !== 'nintendo')
    }
    // coloca a lista filtrada conforme a ordem atual
    newList = Classifler(currentClassifler, newList)
    
    return newList
}