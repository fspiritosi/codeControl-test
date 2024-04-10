'use client'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import { useRouter } from 'next/navigation'





export function ButtonSignInGithub() {
  return (
    
    <Button onClick={async() => {const result = await signIn('github', {redirect:false, callbackUrl:'/dashboard'})}}>
      <Github className="mr-2 h-4 w-4"  /> Ingresa con Github
    </Button>
  )
}



