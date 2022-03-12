import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const ViewClient = () => {
    const { id } = useParams();
    const [ cliente, setCliente ] = useState({});
    const [ loading, setLoading ] = useState(true);

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
        <div>
            {
                loading ? <Spinner /> : Object.keys(cliente).length === 0 ? 
                <p>No Hay Resultados</p> : (
                    <div>
                        <h1 className="font-black text-4xl text-blue-900">Ver Cliente: { cliente.nombre }</h1>
                        <p className="mt-3">Información del Cliente</p>
    
    
                    { cliente.nombre && (
                        <p className="text-2xl text-gray-600 mt-10">
                            <span className="text-gray-800 uppercase font-bold">Cliente: </span> { cliente.nombre }
                        </p>
                    )}
    
                    { cliente.email && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Email: </span> { cliente.email }
                        </p>
                    )}
    
                    { cliente.telefono && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Teléfono: </span> { cliente.telefono }
                        </p>
                    )}
    
                    { cliente.empresa && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Empresa: </span> { cliente.empresa }
                        </p>
                    )}
    
                    { cliente.notas && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Notas: </span> { cliente.notas }
                        </p>
                    )}
                    </div>
                )
            }
        </div>
    )
}

export default ViewClient;