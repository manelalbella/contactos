import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './nuevocontacto.css'

function NuevoContacto() {

  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    setMensaje('Guardando contacto...')

    try {

      const response = await fetch(
        'http://localhost:8080/contactos',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            categoria,
          }),
        }
      )

      // CORREO DUPLICADO
      if (response.status === 409) {

        setMensaje('El correo electrónico ya está registrado')

        return
      }

      // OTRO ERROR DEL BACKEND
      if (!response.ok) {

        throw new Error('Error al guardar el contacto')
      }

      // CONTACTO CREADO CORRECTAMENTE
      setMensaje('Contacto guardado correctamente')

      setTimeout(() => {

        navigate('/')

      }, 1000)

    } catch (error) {

      console.error(error)

      setMensaje('No se ha podido guardar el contacto')
    }
  }

  return (

    <div className="nuevo-contacto-container">

      <div className="nuevo-contacto-header">

        <h1>Nuevo contacto</h1>

        <p>
          Añade un nuevo contacto a tu agenda
        </p>

      </div>


      {mensaje && (

        <p
          className={
            mensaje.includes('correctamente')
              ? 'mensaje-exito'
              : mensaje.includes('No se')
                ? 'mensaje-error'
                : 'mensaje-error'
          }
        >
          {mensaje}
        </p>

      )}


      <form
        className="nuevo-contacto-form"
        onSubmit={handleSubmit}
      >

        <div className="form-row">

          <div className="form-group">

            <label htmlFor="nombre">
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              placeholder="Introduce el nombre"
              value={nombre}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNombre(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="apellido">
              Apellido
            </label>

            <input
              id="apellido"
              type="text"
              placeholder="Introduce el apellido"
              value={apellido}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setApellido(e.target.value)
              }
              required
            />

          </div>

        </div>


        <div className="form-row">

          <div className="form-group">

            <label htmlFor="telefono">
              Teléfono
            </label>

            <input
              id="telefono"
              type="text"
              placeholder="Introduce el teléfono"
              value={telefono}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTelefono(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Introduce el email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

        </div>


        <div className="form-group">

          <label htmlFor="direccion">
            Dirección
          </label>

          <input
            id="direccion"
            type="text"
            placeholder="Introduce la dirección"
            value={direccion}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDireccion(e.target.value)
            }
            required
          />

        </div>


        <div className="form-group">

          <label htmlFor="categoria">
            Categoría
          </label>

          <input
            id="categoria"
            type="text"
            placeholder="Ej: Amigos, Trabajo, Familia..."
            value={categoria}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategoria(e.target.value)
            }
            required
          />

        </div>


        <div className="form-actions">

          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>


          <button
            type="submit"
            className="btn-guardar"
          >
            Guardar contacto
          </button>

        </div>

      </form>

    </div>
  )
}

export default NuevoContacto