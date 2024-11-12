export default function Classifler(value, list) {
    const newList = [...list]

    // ordena a lista onforme o valor recebido
    if (value === 'relevance') {
        newList.sort((a, b) => b.relevance - a.relevance);
    } else if (value === 'lowest') {
        newList.sort((a, b) => a.price - b.price);
    } else if (value === 'biggest') {
        newList.sort((a, b) => b.price - a.price);
    }
     
    return newList    
}