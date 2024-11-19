import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useProductDetail from '../../Hooks/useProductDetail'

const DetailProductScreen = () => {
    const {product_id} = useParams()
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    //Llamar al hook useProductDetail
    //const { product_detail (esto sera un estado) } + useProductDetail(product_id)
    const {productDetail, isloadingProductDetail} = useProductDetail(product_id)
    return (
        <div>
            <Link to={'/product/new'}>Crear producto</Link>
            {
            isloadingProductDetail
            ? <span>Cargando...</span> 
            : productDetail && (
                <div>
                <h1>Detalle del producto</h1>
                <h2>{productDetail.title}</h2>
                <p>Precio: ${productDetail.price}</p>
                <p>Stock: {productDetail.stock}</p>
                <p>Descripción: {productDetail.descripcion}</p>
                {productDetail.image && <img src={productDetail.image} alt={productDetail.title} />}
                <p>Categoría: {productDetail.category}</p>
            </div>
            )
            }
        </div>
    
  )
}


export default DetailProductScreen