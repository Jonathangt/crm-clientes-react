import { Formik, Form, Field } from "formik"; //ErrorMessage
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Alert from "./Alert";
import Spinner from "./Spinner";

const Formulario = ({ cliente, loading }) => {

    const navigate = useNavigate();

    //shape => formato de los datos que se van a enviar
    const newClientSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(40, 'El nombre es muy largo')
            .required('El nombre es requerido'),

        empresa: Yup.string().required('La empresa es requerida'),
        email: Yup.string().email('Email no valido').required('El email es requerido'),
        telefono: Yup.number()
            .typeError('El telefono debe ser numerico')
            .integer('El telefono debe ser numerico'),
        notas: ''
    });


    const handleSubmit = async ( val ) =>{
        try {
            let resp = null;

            if ( cliente.id ) {
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                resp = await fetch( url, {
                    method: 'PUT',
                    body: JSON.stringify(val),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }else{
                const url = import.meta.env.VITE_API_URL;

                resp = await fetch( url, {
                    method: 'POST',
                    body: JSON.stringify( val ),
                    headers:{ 'Content-Type': 'application/json' }
                })                
            }

            await resp.json();
            navigate('/');
        } catch (error) {
            console.error(error);
        }

    }

    return (

        loading ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                    { cliente?.nombre ? 'Editar Cliente' : 'Nuevo Cliente' }
                </h1>

                <Formik initialValues={{ 
                            nombre: cliente?.nombre ?? '', //si cliente?.nombre existe, lo asigna, sino, lo asigna vacio
                            empresa: cliente?.empresa ?? '',
                            email: cliente?.email ?? '',
                            telefono: cliente?.telefono ?? '',
                            notas: cliente?.notas ?? '',
                        }} 
                        enableReinitialize={ true } //permite volver a cargar el formulario por default es false
                        onSubmit={ async ( val, { resetForm } ) => { await handleSubmit(val), resetForm() }} 
                        validationSchema={ newClientSchema } >
                    {({ errors, touched }) => 
                        { return (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="text-gray-800">Nombre</label>
                                <Field name="nombre" className="mt-2 block w-full p-3 bg-gray-50" id="nombre" type="text" placeholder="Nombre del cliente"/>
                                {/* <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" /> */}
                                { errors.nombre && touched.nombre ? ( <Alert> { errors.nombre }</Alert> ) : null}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="empresa" className="text-gray-800">Empresa</label>
                                <Field name="empresa" className="mt-2 block w-full p-3 bg-gray-50" id="empresa" type="text" placeholder="Nombre de la empresa" />
                                { errors.empresa && touched.empresa ? ( <Alert> { errors.empresa }</Alert> ) : null}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-800">Email</label>
                                <Field name="email" className="mt-2 block w-full p-3 bg-gray-50" id="email" type="text" placeholder="Email del cliente" />
                                { errors.email && touched.email ? ( <Alert> { errors.email }</Alert> ) : null}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="telefono" className="text-gray-800">Telefono</label>
                                <Field name="telefono" className="mt-2 block w-full p-3 bg-gray-50" id="telefono" type="tel" placeholder="Telefono del cliente" />
                                { errors.telefono && touched.telefono ? ( <Alert> { errors.telefono }</Alert> ) : null}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="notas" className="text-gray-800">Notas</label>
                                <Field name="notas" className="mt-2 block w-full p-3 bg-gray-50 h-40" id="notas" as="textarea" type="tel" placeholder="Notas del cliente" />
                            </div>

                            <input className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" type="submit" value={ cliente?.nombre ? 'Actualizar Cliente' : 'Registrar Cliente' } />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
        
    )
}

Formulario.defaultProps = {
    cliente: {},
    loading: false
}

export default Formulario;