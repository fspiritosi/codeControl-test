"use client"

//TODO hacer las validaciones del formulario de manera correcta

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


const formSchema = z.object({
  name: z.string().min(5, {
    message: "El nombre de usurio debe tener mas de 5 caracteres.",
  }),
  email: z.string().email({ message: "Dirección de correo no valida" }),
  password: z.string().min(8, {message: "La contraseña debe tener un minimo de 8 caracteres"}),
  confirmPassword: z.string().min(8, {message: "La contraseña no puede ser vacía"}),
})

const Register = () =>  {

    const router = useRouter()
  // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword:""
        },
    })
 
  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // manda los datos a la DB y espera la respuesta
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
            }),
        })
        
        const data = await res.json()
        
        // 👌 si la respuesta es ok redirecciona al login  
        if (res.ok) {
            router.push("/auth/login")
        }
    }
    
  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center">
        <Card className="w-[500px] p-5">
            <CardHeader className="items-center">
                <CardTitle>
                    Register
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
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
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <Button className="w-full" variant="default" color="secondary" type="submit">Resgistrate</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
   
  )
}

export default Register 