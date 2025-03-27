/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAppContext } from "@/store/global/global.provider"
import { User } from "@/store/global/global.types"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
// import { axiosRequest } from "@/app/actions/axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import SkeletonComponent from "@/components/Skeleton"
import { graphqlRequests } from "@/app/api/actions"
import { toast } from "bulma-toast"

type IUseQueryRespose = {
  isLoading: boolean,
  error: any,
  refetch: any
  data: {
    getUsers: IUser[] | undefined,
  } | undefined
  isFetching: boolean
}

type IUser = User & {
  id: number
}

export default function Users() {
  const {handlerNotification} = useAppContext()

  const [users, setUsers] = useState<IUser[]>([])

  const { isLoading: isLoadingGetAllUsers, error: errorGetAllUsers, data: dataGetAllUsers, refetch: refetchGetAllUsers }: IUseQueryRespose = useQuery({
    queryKey: ['getUsers'],
    queryFn: async () => await graphqlRequests.getAllUsers(),
  })


  const { mutate: deleteUserMutation, isPending: deleteUserPending, error: deleteUserError } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async (id: number) => await graphqlRequests.deleteUser(id),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: () => {
      // Refetch users after a successful delete
      refetchGetAllUsers();
      handlerNotification(true, 'User deleted successfully', 'is-success');
      toast({
        message: 'User deleted successfully.',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    },
    onError: (error) => {
      console.log(error);
      // handlerNotification(true, 'Error when deleting user.', 'is-danger');
      toast({
        message: 'Error when deleting user.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    }
  })

  useEffect(() => {
    if (dataGetAllUsers) setUsers(dataGetAllUsers.getUsers as IUser[])
  }, [dataGetAllUsers])

  if (isLoadingGetAllUsers) return <SkeletonComponent />
  if (errorGetAllUsers || deleteUserError) handlerNotification(true, 'Error when resqueting data.', 'is-danger')


  // get data from axios request
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axiosRequest.get()
  //     if (data.error) {
  //       handlerNotification(true, 'Error when retieve data.')
  //       return
  // async function handlerDeleteUser(id: number) {
  //   deleteUserRefetch(id)
  // }
    
    


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
            {/* is-skeleton */}
              <span className="icon has-text-danger">
                <button className={`${deleteUserPending && 'is-skeleton'} button is-small is-danger is-outlined`} onClick={() => deleteUserMutation(+user.id)}>
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
