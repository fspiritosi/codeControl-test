import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import bcrypt from "bcrypt"


export async function POST(request: any) {
    try {
        const data = await request.json()

        //chequea que no se repita el email
        const email = await prisma.user.findUnique({
            where:{
                email: data.email
            }
        })



        if(email) {
            return NextResponse.json({message: 'El email ya existe'}, { status: 400 })
        }
        
       
        
        // crea el nuevo usuario
        const hashpassword =  await bcrypt.hash(data.password, 10)
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashpassword,
            }
        })
        console.log('newUser', newUser)
        const {password, ...userWithoutPassword} = newUser
        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {status: 500})
    }
}

