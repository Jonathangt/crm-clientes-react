import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleDelete }) => {
    const navigate = useNavigate();

    const { nombre, empresa, email, telefono, id } = cliente

    return (
        <tr className="border-b hover:bg-gray-50" >
            <td className="p-3">
                <button className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-blod text-xs mb-3" 
                    type="button" onClick={ () => navigate(`/view/${id}`)}>View
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-blod text-xs" 
                    type="button" onClick={ () => navigate(`/edit/${id}`)} >Edit
                </button>
                <button className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-blod text-xs mt-3" 
                    type="button" onClick={ () => handleDelete(id) }>Deleted
                </button>
            </td>
            <td className="p-3"> { nombre } </td>
            <td className="p-3"> 
                <p><span className="text-gray-800 uppercase font-blod"> Email: </span> { email } </p>
                <p><span className="text-gray-800 uppercase font-blod"> Télefono: </span> { telefono } </p>
            </td>
            <td className="p-3"> { empresa } </td>
        </tr>
    )
}

export default Cliente;