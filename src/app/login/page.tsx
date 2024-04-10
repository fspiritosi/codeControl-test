import React from 'react'
import ButtonSingIn from '../components/ButtonSingIn'

function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
        <h1>Login con Github</h1>
        <ButtonSingIn />
    </div>
  )
}

export default LoginPage