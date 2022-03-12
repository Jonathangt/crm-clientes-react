import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Formulario from '../components/Formulario'

const EditClient = () => {

    const [ cliente, setCliente ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()

    useEffect( () => {
        const getClientApiById = async () =>{
            try {
                const url = `http://localhost:4000/api-clientes/${id}`;
                const resp = await fetch( url );
                const data = await resp.json();
                setCliente(data);
            } catch (error) {
                console.error(error);
            }
            
            setLoading(!loading);
        }        

        getClientApiById()
    }, [])

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Utiliza este formulario para editar datos del cliente</p>

            { 
                cliente?.nombre ? ( <Formulario cliente={ cliente } loading={ loading } /> ) : <p>Cliente ID no válido</p>
            }
            
        </>
    )
}

export default EditClient;