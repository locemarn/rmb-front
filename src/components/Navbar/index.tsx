'use client'

import { useAppContext } from '@/store/global/global.provider';
import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import './styles.css'

export default function NavbarComponent() {
  const {user, handlerLogout} = useAppContext()
  const [activeRouter, setActiveRouter] = useState<string>('')
  const pathname = usePathname()

  
  useEffect(() => {
    if (!user) redirect('/login')
  }, [user])

  function handlerSetUserOff(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    handlerLogout()
    redirect('/login')
  }

  useEffect(() => {
    setActiveRouter(pathname)
  }, [pathname]);
  function handlerActive() {
  }
  
  return (
    <>
      <div className="columns is-vcentered">
        <div className="column is-full">
          <div className="tabs">
            <ul className="column is-three-quarters">
              <li className={activeRouter === "/admin/main" ? 'is-active': ''}><Link href="/admin/main">Main</Link></li>
              <li className={activeRouter === "/admin/users" ? 'is-active': ''}><Link href="/admin/users" onClick={handlerActive}>Users</Link></li>
            </ul>
            <ul className="column is-one-quarter">
              <div className="columns">
                <li className="column has-text-info mt-2">Hello, {user?.username}</li>
                <li className="column"><button className="button" onClick={handlerSetUserOff}>Logout</button></li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

{/* <ul>
            <li className={activeRouter === "/admin/main" ? 'is-active': ''}><Link href="/admin/main">Main</Link></li>
            <li className={activeRouter === "/admin/users" ? 'is-active': ''}><Link href="/admin/users" onClick={handlerActive}>Users</Link></li>
            <li><Link href="/admin/main">Videos</Link></li>
            <li><Link href="/admin/main">Documents</Link></li>
            <span className="has-text-right">
              <li>
                <span className="is-size-6">Hello, {user?.username}!</span>
              </li>
              <li>
                <button className="button">Logout</button>
              </li>
            </span>
          </ul> */}