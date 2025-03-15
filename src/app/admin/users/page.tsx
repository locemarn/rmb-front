'use client'

import { useAppContext } from "@/store/global/global.provider"
import { User } from "@/store/global/global.types"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { axiosRequest } from "@/app/actions/axios"


type IUser = User & {
  id: number
}

export default function Users() {
  const {handlerNotification} = useAppContext()

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosRequest.get()
      if (data.error) {
        handlerNotification(true, 'Error when retieve data.')
        return
      }
      setUsers(data.res?.data.response)
   }
   fetchData()
  }, [handlerNotification])

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th className="is-info"><abbr title="id">ID</abbr></th>
          <th className="is-info"><abbr title="Username">Username</abbr></th>
          <th className="is-info"><abbr title="Email">Email</abbr></th>
          <th className="is-info"><abbr title="Role">Role</abbr></th>
          <th className="is-info"><abbr title="Actions">Actions</abbr></th>
        </tr>
      </thead>
      
      <tbody>
        {users.map((user: IUser) => (
          <tr key={user.id}>
            <th>{user.id}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <span className="icon has-text-danger">
                <button className="button is-small is-danger is-outlined">
                  <span className="icon is-small">
                    <FontAwesomeIcon style={{}} icon={faTrash}></FontAwesomeIcon>
                  </span>
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
