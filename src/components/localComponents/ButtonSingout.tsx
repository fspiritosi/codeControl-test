'use client'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"

function ButtonSingout() {
  return (
    <Button onClick={() => signOut()} className='w-full'>Cerrar Sesion</Button>
  )
}

export default ButtonSingout