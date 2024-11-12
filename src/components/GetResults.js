export default function GetResults(products, src) {
    // primeiro procura por palavra
    let results = products.filter((product) => {            
        const keywords = src.toLowerCase().split(" ");
        return keywords.every((keyword) =>
            product.name.toLowerCase().includes(keyword)
        );
    });
    // se nada é encontrado então a busca e feita pelas letras digitadas
    if (results.length === 0) {            
        results = products.filter((product) => {
            const letters = src.toLowerCase().split("");
            return letters.every((letter) =>
                product.name.toLowerCase().includes(letter)
            )
        })
    }

    return results

}