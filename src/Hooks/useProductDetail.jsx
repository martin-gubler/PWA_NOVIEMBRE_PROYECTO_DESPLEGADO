import { useEffect, useState } from "react"
import { getAuthenticatedHeaders, GET } from "../fetching/http.fetching"
import { useNavigate } from "react-router-dom"

const useProductDetail = (productId) => {
    const [productDetail, setProductDetail] = useState([])
    const [isLoadingProductDetail, setIsLoadingProductDetail] = useState(true)
    const navigate = useNavigate()
const getProductDetail = async () => {
    const response = await GET(`http://localhost:3000/api/products/${productId}`, {
        headers: getAuthenticatedHeaders()
    })

    console.log({response})
    if(response.ok){
        setProductDetail(response.payload.products)
        setIsLoadingProductDetail(false)
    }
    else{
        navigate('/home')
    }

}
    useEffect(
        () => {
            if (productId) { // Verifica que productId esté definido antes de intentar obtener los datos
                getProductDetail()
            }
            getProductDetail()
        },
        [productId]
    )

    return {productDetail, isLoadingProductDetail}
}

export default useProductDetail