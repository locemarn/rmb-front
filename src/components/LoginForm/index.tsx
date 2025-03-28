/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAppContext } from "@/store/global/global.provider";
import InputComponent from "../input";
import { useActionState, useEffect } from "react";
import { handlerLoginAction } from "@/app/actions/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {handlerLogin, handlerNotification} = useAppContext()
  const [state, action, pending] = useActionState<any, FormData>(handlerLoginAction, undefined)
  const router = useRouter()


  useEffect(() => {
      if (state && 'error' in state && state.error) {
        handlerNotification(true, 'Error to fetching Login.', 'is-danger')
      }
      if (state && 'status' in state && state.status === 200) {
        handlerLogin({
          id: state.data.user.id,
          username: state.data.user.username,
          email: state.data.user.email,
          role: state.data.user.role,
          token: state.data.token,
        })
        router.push('/')
      }
    }, [state, handlerLogin, router, handlerNotification])
  
  return (
    <form className="box" action={action}>
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

      <button
        className="button is-primary"
        disabled={pending}>
          {pending ? 'Signing in...' : 'Sign In'}
        </button>
    </form>
  )
}