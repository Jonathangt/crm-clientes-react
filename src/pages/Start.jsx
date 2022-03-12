import { useEffect, useState } from "react";

import Cliente from '../components/Cliente';

const Start = () => {

    const [ clientes, setClientes ] = useState([]);


    useEffect( () =>{

        const getClientApi = async () =>{
            try {
                const url = import.meta.env.VITE_API_URL
                const resp = await fetch( url );
                const data = await resp.json();
                setClientes(data);
            } catch (error) {
                console.error(error);
            }
        }

        getClientApi()
    }, [])

    const handleDelete = async (id) =>{
        const confirmar = confirm('Estas seguro de eliminar este cliente?');
        if( confirmar ){
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const resp = await fetch( url, {
                    method: 'DELETE'
                });
                const data = await resp.json();
                const arrClientes = clientes.filter( cl => cl.id !== id );
                setClientes( arrClientes );
            } catch (error) {
                console.error(error);
            }
        }
           
    }


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Acciones</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                    </tr>
                </thead>
                <tbody>
                    { clientes.map( cl => (
                        <Cliente cliente={cl} key={cl.id} handleDelete={ handleDelete } />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Start;