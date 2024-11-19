import React, { useState } from 'react'
import { getAuthenticatedHeaders, POST } from '../../fetching/http.fetching'
import extractFormData from '../../utils/extractFromData'

const CreateProductScreen = () => {

    const [image, setImage] = useState('')
    const handleSubmitNewProduct = async (e) => {
        try{
            e.preventDefault()
            const form_HTML = e.target
            const form_Values = new FormData(form_HTML)
            const form_fields = {
                title: '',
                price: '',
                stock: '',
                descripcion: '',
                category: ''
            }
            const form_values_object = extractFormData(form_fields, form_Values)
            //agregamos imagen al objeto con los valores de mi form
            form_values_object.image = image
            console.log('evento submit')
            const response = await POST('http://localhost:3000/api/products', {
                    headers: getAuthenticatedHeaders(),
                    body: JSON.stringify(form_values_object)
            }
        )
            console.log({response})
        }
        catch(error){
            //manejar errores
            console.error(error)
        }
    }

    const handleChangeFile = (evento) => {

        //Buscar el archivo que fue subido por ese input
        const file_found = evento.target.files[0]
        const FILE_MB_LIMIT = 2
        if(file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024){
            //to do, cambiar a estado de error
            alert(`Error el archivo es muy grande (limite ${FILE_MB_LIMIT} mb)`)
            return //Cancelar la operacion/funcion
        }
        const lector_archivos = new FileReader()

        //Le decimos al lector de archivos que cuando termine de cargar nos ejecute x callback
        lector_archivos.onloadend = () => {
                console.log('carga finalizada')
                console.log(lector_archivos.result)
                setImage(lector_archivos.result)
            }
        
        //Si hay archivo leelo
        if(file_found){
            lector_archivos.readAsDataURL(file_found)
        }
    }

return (
    <div>
        <form onSubmit={handleSubmitNewProduct}>
            <div>
                <label htmlFor='title'>Ingrese el titulo</label>
                <input name='title' id='title'></input>
            </div>
            <div>
                <label htmlFor='price'>Ingrese el precio</label>
                <input name='price' id='price'></input>
            </div>
            <div>
                <label htmlFor='stock'>Ingrese el stock</label>
                <input name='stock' id='stock' ></input>
            </div>
            <div>
                <label htmlFor='descripcion'>Ingrese la descripcion</label>
                <textarea name='descripcion' id='descripcion' placeholder='descripcion'></textarea>
            </div>
            <div>
                <label htmlFor='category'>Ingrese la categoria</label>
                <input name='category' id='category'></input>
            </div>
            <div>
                {
                    image && <img src={image}/>
                }
                <label htmlFor='imagen'>Seleccione su imagen:</label>
                <input name='imagen' id='imagen' type='file' onChange={handleChangeFile} accept='image/*'></input>
            </div>
            <button type='submit'>Crear producto</button>
        </form>
    </div>
  )
}

export default CreateProductScreen