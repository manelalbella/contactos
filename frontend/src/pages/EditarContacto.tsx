import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './editarcontacto.css'

interface Contacto {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  direccion: string
  categoria: string
}

function EditarContacto() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [categoria, setCategoria] = useState('')

  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarContacto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/contactos/${id}`
        )

        if (!response.ok) {
          throw new Error('No se ha encontrado el contacto')
        }

        const contacto: Contacto = await response.json()

        setNombre(contacto.nombre)
        setApellido(contacto.apellido)
        setTelefono(contacto.telefono)
        setEmail(contacto.email)
        setDireccion(contacto.direccion)
        setCategoria(contacto.categoria)

      } catch (error) {
        console.error(error)
        setMensaje('No se ha podido cargar el contacto')

      } finally {
        setCargando(false)
      }
    }

    cargarContacto()
  }, [id])


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault()

    setMensaje('Guardando cambios...')

    try {

      const response = await fetch(
        `http://localhost:8080/contactos/${id}`,
        {
          method: 'PUT',

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

      if (!response.ok) {
        throw new Error('Error al actualizar el contacto')
      }

      setMensaje('Contacto actualizado correctamente')

      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {

      console.error(error)

      setMensaje(
        'No se ha podido actualizar el contacto'
      )
    }
  }


  if (cargando) {
    return (
      <div className="editar-contacto-container">
        <p className="editar-cargando">
          Cargando contacto...
        </p>
      </div>
    )
  }


  return (
    <div className="editar-contacto-container">

      <div className="editar-contacto-header">

        <h1>Editar contacto</h1>

        <p>
          Modifica los datos del contacto
        </p>

      </div>


      {mensaje && (
        <p
          className={
            mensaje.includes('correctamente')
              ? 'mensaje-exito'
              : mensaje.includes('No se')
                ? 'mensaje-error'
                : 'mensaje-info'
          }
        >
          {mensaje}
        </p>
      )}


      <form
        className="editar-contacto-form"
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
            Guardar cambios
          </button>

        </div>

      </form>

    </div>
  )
}

export default EditarContacto