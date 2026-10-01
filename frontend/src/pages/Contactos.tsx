import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './contactos.css'

interface Contacto {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  direccion: string
  categoria: string
}

function Contactos() {
  const navigate = useNavigate()

  const [contactos, setContactos] = useState<Contacto[]>([])
  const [mensaje, setMensaje] = useState('')

  const cargarContactos = async () => {
    try {
      const response = await fetch('http://localhost:8080/contactos')

      if (!response.ok) {
        throw new Error('Error al obtener los contactos')
      }

      const data: Contacto[] = await response.json()

      setContactos(data)
      setMensaje('')
    } catch (error) {
      console.error(error)
      setMensaje('No se ha podido conectar con el backend')
    }
  }

  useEffect(() => {
    cargarContactos()
  }, [])

  const eliminarContacto = async (id: number) => {
    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar este contacto?'
    )

    if (!confirmar) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/contactos/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Error al eliminar el contacto')
      }

      setContactos((contactosActuales) =>
        contactosActuales.filter((contacto) => contacto.id !== id)
      )

      setMensaje('Contacto eliminado correctamente')
    } catch (error) {
      console.error(error)
      setMensaje('No se ha podido eliminar el contacto')
    }
  }

  return (
    <div className="contactos-container">

      <div className="contactos-header">

        <div>
          <h1>Mis contactos</h1>

          <p>
            Gestiona todos tus contactos desde aquí
          </p>
        </div>

        <div className="contactos-count">
          {contactos.length}{' '}
          {contactos.length === 1 ? 'contacto' : 'contactos'}
        </div>

      </div>

      <div className="nuevo-contacto-wrapper">
        <button
          type="button"
          className="btn-nuevo-contacto"
          onClick={() => navigate('/nuevo')}
        >
          + Nuevo contacto
        </button>
      </div>

      {mensaje && (
        <p className="mensaje-error">
          {mensaje}
        </p>
      )}

      {contactos.length === 0 ? (

        <div className="sin-contactos">

          <h2>No tienes contactos</h2>

          <p>
            Crea tu primer contacto para empezar.
          </p>

        </div>

      ) : (

        <div className="tabla-container">

          <table className="contactos-table">

            <thead>

              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody>

              {contactos.map((contacto) => (

                <tr key={contacto.id}>

                  <td className="nombre-contacto">
                    {contacto.nombre}
                  </td>

                  <td>
                    {contacto.apellido}
                  </td>

                  <td>
                    {contacto.telefono}
                  </td>

                  <td className="email">
                    {contacto.email}
                  </td>

                  <td>
                    {contacto.direccion}
                  </td>

                  <td>
                    <span className="categoria">
                      {contacto.categoria}
                    </span>
                  </td>

                  <td>

                    <div className="acciones">

                      <button
                        className="btn-editar"
                        onClick={() =>
                          navigate(`/editar/${contacto.id}`)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          eliminarContacto(contacto.id)
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  )
}

export default Contactos