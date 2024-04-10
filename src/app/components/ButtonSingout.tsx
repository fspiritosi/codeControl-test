'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function ButtonSingout() {
  return (
    <button onClick={() => signOut()} className='px-3 py-2 bg-blue-400 rounded-md text-white font-bold hover:bg-blue-500'>Cerrar Sesion</button>

  )
}

export default ButtonSingout