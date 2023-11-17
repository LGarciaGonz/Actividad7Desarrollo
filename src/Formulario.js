import { useState, useEffect, useCallback } from 'react';

function Formulario() {

    const url = "http://localhost:5000/usuarios";

    let data = {
        nombre: "",
        apellido: "",
        email: "",
        sexo: "",
        mensaje: "",
        terminos: false
      };

    // CAMPO EMAIL *******************************************
    const [enteredEmail, setEnteredEmail] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [alertaEmail , setAlertaEmail] = useState("")

    function updateEmailHandler(event) {
        setEnteredEmail(event.target.value)
    }


    // CAMPO NOMBRE *******************************************
    const [enteredNombre, setEnteredNombre] = useState('');
    const [validateNombre, setValidateNombre] = useState(false);
    const [alertaNombre, setAlertaNombre] = useState('')

    function updateNombreHandler(event) {
        const enteredName = event.target.value
        setEnteredNombre(event.target.value);

    }

    // CAMPO APELLIDOS *******************************************
    const [enteredApellido, setEnteredApellido] = useState('');
    const [validateApellido, setValidateApellido] = useState(false);
    const [alertaApellido, setAlertaApellido] = useState("")

    function updateApellidosHandler(event) {

        const enteredApellido = event.target.value
        setEnteredApellido(enteredApellido);

    }

    // CAMPO SEXO *******************************************
    const [enteredSexo, setEnteredSexo] = useState("Sin especificar");
    const [validateSexo, setValidateSexo] = useState(true);

    function updateSexoHandler(event) {
        setEnteredSexo(event.target.value);
        console.log('sexo ok!');
        setValidateSexo(true);
    }


    // CAMPO MENSAJE *******************************************
    const [enteredMensaje, setEnteredMensaje] = useState('');
    const [validateMensaje, setValidateMensaje] = useState(true);
    const [alertaMensaje, setAlertaMensaje] = useState("")

    function updateMensajeHandler(event) {
        setEnteredMensaje(event.target.value);
    }


    // CAMPO TÉRMINOS *******************************************
    const [enteredTerminos, setEnteredTerminos] = useState('');
    const [validateTerminos, setValidateTerminos] = useState(false);
    const [alertaTerminos, setAlertaTerminos] = useState("")

    const [checked, setChecked] = useState(true)

    
    function updateTerminosHandler(event) {
        //setChecked((c) => !c);
        console.log(checked);
        setEnteredTerminos(event.target.checked);
    }

    const handleValidateAll = useCallback(() => {
        
        // TÉRMINOS --------------------------------------------------------------------------------------
        if (checked === true ) { 
            console.log('términos ok!');
            console.log(checked);
            setValidateTerminos(false);
            setAlertaTerminos("")
        } else {
            setAlertaTerminos("Debe aceptar los términos y condiciones.")
            setValidateTerminos(true);
            console.log('terminos NO ok!');
        }

        // MENSAJE --------------------------------------------------------------------------------------
        if (enteredMensaje.length <= 500) {
            console.log('mensaje ok!');
            setValidateMensaje(true)
            setAlertaMensaje("")
        } else {
            setAlertaMensaje ("El mensaje no puede contener más de 500 caracteres.")
            setValidateMensaje(false);
        }

        // APELLIDOS --------------------------------------------------------------------------------------
        if (enteredApellido.length > 0 && enteredApellido.length <= 20) {

            console.log('apellidos ok!');
            setValidateApellido(true);
            setAlertaApellido("")
            
        } else if (enteredApellido.length === 0) {
            setAlertaApellido ("El apellido no puede estar vacío.")
            setValidateApellido(false);
            console.log('apellidos vacío!');
        } else {
            setAlertaApellido ("El apellido no puede contener más de 20 caracteres.")
            setValidateApellido(false);
            console.log('apellidos +20 caracteres!');
        }


        // NOMBRE --------------------------------------------------------------------------------------
        if (enteredNombre.length > 0 && enteredNombre.length <= 10) {
        
            console.log('nombre ok!');
            setValidateNombre(true);
            setAlertaNombre("")

        } else if (enteredNombre.length > 10) {
            setAlertaNombre("El nombre no puede contener más de 10 caracteres.")
            setValidateNombre(false);
            console.log('nombre +10 caracteres!');

        } else if (enteredNombre.length === 0) {
            setAlertaNombre("El nombre no puede estar vacío.")
            setValidateNombre(false);
            console.log('nombre vacío!');
        }

        // EMAIL --------------------------------------------------------------------------------------
        if (enteredEmail.includes('@') && enteredEmail.length > 0 && enteredEmail.length <= 20) {
            console.log('mail ok!');
            setValidateEmail(true);
            setAlertaEmail("")

        } else if (enteredEmail.length === 0) {
            setAlertaEmail("El email no puede estar vacío.")
            setValidateEmail(false);
            console.log('mail vacío!');
        } else if (enteredEmail.length > 20) {
            setAlertaEmail ("El email no puede contener más de 20 caracteres")
            setValidateEmail(false);
            console.log('mail +20 caracteres');
        } else {
            setAlertaEmail ("El email debe contener un @.")
            setValidateEmail(false);
            console.log('mail sin @!');
        }
        

    }, [enteredNombre, enteredApellido, enteredEmail, enteredSexo, enteredMensaje, checked])

    useEffect(
        function(){
            handleValidateAll()
        }, [handleValidateAll]
    )


    // Función para la comprobación de los datos y envío del formulario (mostrar mensaje)
    function handleSubmit(e) {
        e.preventDefault();
        if (validateNombre === true && validateApellido === true && validateEmail === true && validateSexo === true && validateMensaje === true && validateTerminos === true) {
            console.log("Formulario enviado correctamente")

            data = {
                nombre: enteredNombre,
                apellido: enteredApellido,
                email: enteredEmail,
                sexo: enteredSexo,
                mensaje: enteredMensaje,
                terminos: enteredTerminos
              };

            fetchPost(url, data).then(()=>{
                setEnteredNombre('');
                setEnteredApellido('');
                setEnteredEmail('');
                setEnteredSexo('');
                setEnteredMensaje('');
                setChecked(true);


                // Restablecer los estados de validación
                setValidateNombre(false);
                setValidateApellido(false);
                setValidateEmail(false);
                setValidateSexo(false);
                setValidateMensaje(false);
                setChecked(true);

                alert("FORMULARIO ENVIADO CORRECTAMENTE AL SERVIDOR")

            })
        } else{
            console.log("el formulario no se ha enviado") // TODO mostrar mensaje al usuario
            alert("EL FORMULARIO NO SE HA PODIDO ENVIAR")
        }
    }

    async function fetchPost(url, data){
        await fetch(url, {
            method: "POST", 
            body: JSON.stringify(data), // convierte JS en JSON
            headers: {
                "Content-Type": "application/json",
            },
        })
    }


      useEffect(function(){
        fetchPost(url, data)
        },[]);

    return (

        <form onSubmit={handleSubmit} className='form'>

            <div>
                <h1>Formulario de registro</h1>
            </div>

            <div>
                <label>Nombre</label><span>   </span>
                <input value={enteredNombre} type="text" onChange={updateNombreHandler}/>
                <p  className='error'>{alertaNombre}</p>
            </div>

            <br />

            <div>
                <label>Apellidos</label><span>   </span>
                <input value={enteredApellido} type="text" onChange={updateApellidosHandler} />
                <p className='error'>{alertaApellido}</p>
            </div>

            <br />

            <div>
                <label>Email</label><span>   </span>
                <input value={enteredEmail} type="text" onChange={updateEmailHandler} />
                <p  className='error'>{alertaEmail}</p>
            </div>

            <br />

            <div>
                <label>Sexo</label><span>   </span>
                <select className='textarea' type="text" onChange={updateSexoHandler}>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Otro">Otro</option>
                    <option selected value="Sin especificar">Sin especificar</option> //TODO no se detecta como seleccionado aparece ""
                </select>
            </div>

            <br />

            <div>
                <label>Mensaje</label><span>   </span>
                <textarea value={enteredMensaje} className='textarea' type="text" onChange={updateMensajeHandler} maxLength={500}/>
                <p>Caracteres restantes: {500 - enteredMensaje.length}</p>
                <p className='error'>{alertaMensaje}</p>
            </div>

            <br />

            <div>
                <label>Aceptar términos y condiciones</label><span>   </span>
                <input type='checkbox' value={checked} name="terminos" onChange={updateTerminosHandler} checked={!checked}/>
                <p className='error'>{alertaTerminos}</p>
            </div>

            <br />

            <button type='submit'>Enviar Formulario</button>
        </form>
    );
}

export default Formulario;