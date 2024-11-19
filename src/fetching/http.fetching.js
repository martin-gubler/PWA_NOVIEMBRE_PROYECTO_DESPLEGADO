

export const POST = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'POST',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
	}
	
}


export const GET = async (URL_API, params) => {
	try{
		const response = await fetch(URL_API, {
			method: 'GET',
			...params
		})
		return response.json()
	}
	catch(error){
		console.log(error)
		throw error
	}
	
} 


const getUnnauthenticatedHeaders = () => {
	const unnauthenticatedHeaders = new Headers()
	unnauthenticatedHeaders.set('Content-Type', 'application/json')
	unnauthenticatedHeaders.set('x-api-key', 'e783b3e6-3596-4e6e-abab-bfd06780f99c')
	return unnauthenticatedHeaders
}


const getAuthenticatedHeaders = () => {
	const authenticatedHeaders = new Headers()
	authenticatedHeaders.set('Content-Type', 'application/json')
	authenticatedHeaders.set('x-api-key', 'e783b3e6-3596-4e6e-abab-bfd06780f99c')
	authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
	return authenticatedHeaders
}







export {getAuthenticatedHeaders, getUnnauthenticatedHeaders} 
	
	
	//Crear GET, PUT, DELETE