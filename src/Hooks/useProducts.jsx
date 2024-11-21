import { useEffect, useState } from "react"
import { getAuthenticatedHeaders, GET } from "../fetching/http.fetching"
import ENVIROMENT from "../enviroment"

const useProducts = () => {
    const [products,  setProducts] = useState([])
    const [isLoadingProducts, setIsLoadingProducts ] = useState(true)
    
const getProducts = async () => {
    const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/products`, {
        headers: getAuthenticatedHeaders()
    })

    console.log('Respuesta del backend:', response);
    if(response.ok){
        setProducts(response.payload.products)
        setIsLoadingProducts(false)
    }

}
    useEffect(
        () => {
            getProducts()
        },
        []
    )

    return {products, isLoadingProducts}
}

export default useProducts