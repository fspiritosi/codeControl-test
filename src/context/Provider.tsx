'use client'
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode
}
import React from 'react'

function Provider({children}:Props) {
  return (
   <SessionProvider>
    {children}
   </SessionProvider>
  )
}

export default Provider