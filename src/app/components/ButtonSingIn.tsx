'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

function ButtonSingIn() {
  return (
    <button onClick={async() => {const result = await signIn('github', {redirect:false, callbackUrl:'/dashboard'})}} className='px-3 py-2 bg-blue-400 rounded-md text-white font-bold hover:bg-blue-500'>Ingresa con Github</button>

  )
}

export default ButtonSingIn