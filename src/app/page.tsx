'use client'

import { useAppContext } from "@/store/global/global.provider";


// import { useAppContext } from "@/store";
// import { useEffect } from "react";

export default function Home() {
  const {getUser, handlerLogin} = useAppContext()  
  
  // useEffect(() => {
  //   login({
  //     username: 'username',
  //     email: 'tes@email.com',
  //     role: '',
  //     token: ''
  //   })
  // }, [login, user])
  
  return (
    <>
      <button onClick={() => handlerLogin({
        username: 'a',
        email: 'a',
        token: 'a',
        role: 'a'
      })}>button</button>
      {JSON.stringify(getUser())}
    </>
  );
}
