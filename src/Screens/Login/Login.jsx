import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import extractFormData from '../../utils/extractFromData'
import { POST, getUnnauthenticatedHeaders } from '../../fetching/http.fetching'
import ENVIROMENT from '../../enviroment'


const Login = () => {
  const navigate = useNavigate()
  
  const handleSubmitLoginForm = async (e) => {
    try{
      e.preventDefault()
      const form_HTML = e.target
      const form_Values = new FormData(form_HTML)
      const form_fields = {
          'email': '',
          'password': ''
      }
      const form_values_object = extractFormData(form_fields, form_Values)
      const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
        headers: getUnnauthenticatedHeaders(),
        body: JSON.stringify(form_values_object)
      })
      const access_token = response.payload.token
      console.log(access_token)
      sessionStorage.setItem('access_token', access_token)
      sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
      navigate('/home')
    }
    catch(error){
        //Manejar errores
    }

  }
  return (
    <div>
    <h1>Inincia sesion en nuestra web</h1>
    <form onSubmit={handleSubmitLoginForm}>
        <div>
            <label htmlFor='email'>Ingrese su email</label>
            
            <input name='email' id='email' placeholder='pepesuarez@gmail.com'></input>
        </div>
        <div>
            <label htmlFor='password'>Ingrese su contraseña</label>
            <input name='password' id='password' placeholder='contraseña'></input>
        </div>
        <button type='submit'>Iniciar Sesion</button>
    </form>

    <span>Si aun no tienes cuenta puedes ir a <Link to='/register'>Registrarte</Link></span>
    <br></br>
    <span>Has olvidado la contraseña? <Link to='/forgot-password'>Restablecer</Link></span>
</div>
  )
}

export default Login