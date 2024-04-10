import React from 'react'
import ButtonSingIn from '@/app/components/ButtonSingIn'

function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
        <h1>Por favor ingresa a tu cuenta</h1>
        <ButtonSingIn />
    </div>
  )
}

export default LoginPage