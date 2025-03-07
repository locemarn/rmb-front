/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import InputComponent from '@/components/input';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Login() {
  // const { setUser }: any = useUser()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/auth/login', {
      email, password
    })
     .then(response => {
        console.info('login success', response)
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token.token)
          setEmail('')
          setPassword('')
          // router.push('/')
        }
      }).catch((error) => {
        console.error('login error', error)
        router.push('/login')
        // handle error here (e.g., display error message)
      })
    
  }

  return (
    <div className="container">
      <section className="section is-medium">
        <form className="box" onSubmit={onSubmit}>
          <InputComponent
            label="Email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmail}
          />

          <InputComponent
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePassword}
          />

          <button className="button is-primary">Sign in</button>
        </form>
      </section>
    </div>
  )
}
