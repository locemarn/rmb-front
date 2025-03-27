/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActionState, useCallback, useEffect } from "react";
import InputComponent from "../input";
import { handlerRegisterAction } from "@/app/actions/register";
import { useAppContext } from "@/store/global/global.provider";
import { graphqlRequests } from "@/app/api/actions";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/store/global/global.types";
import SkeletonComponent from "../Skeleton";
import { toast } from 'bulma-toast'

export default function RegisterForm() {
  const {handlerNotification} = useAppContext()
  const [state, action, pending] = useActionState<any, FormData>(handlerRegisterAction, {
    success: false
  })

  const { mutate: registerMutation, isPending } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: async (user: User) => await graphqlRequests.registerUser(user),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: () => {
      // Refetch users after a successful delete
      // console.log('onSuccess data', data);
      // console.log('onSuccess variables', variables);
      // console.log('onSuccess ctx', ctx);
      // handlerNotification(true, 'User created with success.', 'is-success');
      toast({
        message: 'User created with success.',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    },
    onError: (error) => {
      console.log('onError', error);
      // handlerNotification(true, 'Error when creating user.', 'is-danger');
      toast({
        message: 'Error when creating user.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    },
    onSettled: () => {
      // Always refetch after error or success
      console.log('onSettled');
    },
  })

  

  const registerUser = useCallback(async () => {
    await registerMutation(state.user);
  }, [registerMutation, state.user]);

  useEffect(() => {
    console.log('success', state);
    if (state && 'error' in state && state.error) {
      // handlerNotification(true, 'Error to fetching Login.', 'is-danger')
      toast({
        message: 'Error to fetching Login.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    }
    if (state.success) {
      registerUser()
    }
  }, [state, handlerNotification, registerUser])

  if (isPending) return <SkeletonComponent />

  return (
    <form className="box" action={action}>
      <InputComponent
        label="Username"
        type="username"
        placeholder="Username"
        name="username"
      />
      {state && 'errors' in state && state.errors?.username && <p className="has-text-danger is-size-6">{state.errors.username}</p>}

      <InputComponent
        label="Email"
        type="email"
        placeholder="Email address"
        name="email"
      />
      {state && 'errors' in state && state.errors?.email && <p className="has-text-danger is-size-7">{state.errors.email}</p>}

      <InputComponent
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />
      {state && 'errors' in state && state.errors?.password && (
        <div className="has-text-danger is-size-7">
          <p>Password must:</p>
          <ul>
              {state.errors.password.map((error: string) => (
              <li key={error}>- {error}</li>
              ))}
          </ul>
        </div>
      )}

      <div className="columns is-8">
        <div className="column is-three-quarters">
          <label className="label">Role</label>
          <div className="control">
            <div className="select size-10">
              <select name="role">
                <option value=''>Select an option</option>
                <option value='admin'>admin</option>
                <option value='reader'>reader</option>
                <option value='editor'>editor</option>
              </select>
            </div>
          </div>
          {state && 'errors' in state && state.errors?.role && <p className="has-text-danger is-size-7">{state.errors.role}</p>}
        </div>

        <div className="column mt-5">

          <button
            className="button is-primary"
            disabled={pending || isPending}
          >
            {pending || isPending ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>

    </form>
  )
}

