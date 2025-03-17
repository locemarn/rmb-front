/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import InputComponent from '@/components/input';
import 'bulma/css/bulma.min.css';
import { useActionState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation'
import NotificationComponent from '@/components/Notification';
import { useAppContext } from '@/store/global/global.provider';
import { handlerLoginAction } from '../actions/login';


export default function Login() {
  const {handlerLogin, handlerNotification, getUser} = useAppContext()
  const [state, action, pending] = useActionState<any, FormData>(handlerLoginAction, undefined)

  const router = useRouter()

  useEffect(() => {
    const hasUser = getUser()
    if (hasUser) redirect('/admin/main')
  }, [getUser])

  useEffect(() => {
    if (state && 'error' in state && state.error) {
      handlerNotification(true, 'Error to fetching Login.', 'is-danger')
    }
    if (state && 'status' in state && state.status === 200) {
      handlerLogin({
        username: state.data.user.username,
        email: state.data.user.email,
        role: state.data.user.role,
        token: state.data.token,
      })
      router.push('/admin/main')
    }
  }, [state, handlerLogin, router, handlerNotification])

  return (
    <>
      <div className="grid is-gap-3">
        <div className="cell"></div>
        <div className="cell">
          <NotificationComponent />
        </div>
      </div>
      <div className="container">
        <section className="section is-medium">
          <form className="box" action={action}>
            <InputComponent
              label="Email"
              type="email"
              placeholder="Email address"
              name="email"
            />
            {state && 'errors' in state && state.errors?.email && <p>{state.errors.email}</p>}

            <InputComponent
              label="Password"
              type="password"
              placeholder="********"
              name="password"
            />
            {state && 'errors' in state && state.errors?.password && (
              <div>
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
        </section>
      </div>
    </>
  )
}
