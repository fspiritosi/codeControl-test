"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle }  from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  
  email: z.string().email({ message: "Dirección de correo no valida" }),
  password: z.string().min(0, {message: "La contraseña no puede estar vacía"}),
 
})

const FormLogin = () =>  {
    const [error, setError] = useState("")
    const router = useRouter()
  // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
 
  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })

        if (res?.error) {
            setError(res.error)
        }else{
            // 👌 si la respuesta es ok redirecciona al home
            router.push("/dashboard")
            router.refresh()  
        }
    }
  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center">
        <Card className="w-[500px] p-5">
            <CardHeader className="items-center">
                <CardTitle>
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" onBlur={() => setError('')}>
                        
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />
                       
                        <Button className="w-full" variant="default" color="secondary" type="submit">Login</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        {error && 
            <Alert className="w-[600px] z-10 absolute gap-y-5 bg-gray-900" variant='destructive'>
                <AlertCircle className="h-4 w-4" />    
                <AlertTitle>Invalid Credencial</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription> 
                <AlertDescription>
                    Intente nuevamente
                </AlertDescription>
            </Alert>
        }
    </div>
   
  )
}

export default FormLogin 