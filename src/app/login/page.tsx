'use client'

import 'bulma/css/bulma.min.css';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import NotificationComponent from '@/components/Notification';
import { useAppContext } from '@/store/global/global.provider';
import '../../components/Navbar/styles.css'
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function Login() {
  const [loginOrRegister, setLoginOrRegister] = useState('login')
  const {getUser} = useAppContext()

  useEffect(() => {
    const hasUser = getUser()
    if (hasUser) redirect('/')
  }, [getUser])

  return (
    <>
      <div className="grid is-gap-3">
        <div className="cell"></div>
        <div className="cell">
          <NotificationComponent />
        </div>
      </div>
      <div className="container is-max-tablet">
        <section className="section is-medium">
          <div className="tabs">
            <ul className="column">
              <li className={`${loginOrRegister === 'login' && 'is-active'} column`} onClick={() => setLoginOrRegister('login')}><a>Log In</a></li>
              <li className={`${loginOrRegister === "register" && 'is-active'} column`} onClick={() => setLoginOrRegister('register')}><a>Register</a></li>
            </ul>
          </div>


          
          {loginOrRegister === 'login' ? <LoginForm /> : <RegisterForm />}
        </section>
      </div>
    </>
  )
}
