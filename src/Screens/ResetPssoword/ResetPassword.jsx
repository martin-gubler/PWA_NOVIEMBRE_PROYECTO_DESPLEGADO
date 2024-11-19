import React from 'react'
import { Link, useParams } from 'react-router-dom'
import extractFormData from '../../utils/extractFromData.js'


const ResetPassword = () => {
    const {reset_token} = useParams()
    const handleSubmitResetForm = (e) => {
    e.preventDefault()
    const form_HTML = e.target
    const form_Values = new FormData(form_HTML)
    const form_fields = {
        'password': ''
    }
    const form_values_object = extractFormData(form_fields, form_Values)
    fetch('http://localhost:3000/api/auth/reset-password/' + reset_token, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' //Aca le indicamos al back que lo que enviamos es un JSON
        },
        body: JSON.stringify(form_values_object)
    })
        .then(
            (response) => { 
            console.log({ response }) 
            return response.json()
            }
        )
        .then(
        (body) => {
            console.log({body})
        }
        )
        .catch(
            (error) => { console.error(error) }
        )
}

return (
    <div>
    <h1>Restablecer contraseña contraseña</h1>
    <p>Completa el formulario con la nueva contraseña para restablecer</p>
    <form onSubmit={handleSubmitResetForm}>
        <div>
            <label htmlFor='password'>Ingrese su nueva contraseña</label>
            
            <input name='password' id='password' placeholder='contraseña'></input>
        </div>

        <button type='submit'>Restablecer contraseña</button>
    </form>
    <span>Si recuerdas tu contraseña <Link to='/login'>Login</Link></span>
    <span>Si aun no tienes cuenta puedes ir a <Link to='/register'>Registrarte</Link></span>
</div>
)
}

export default ResetPassword