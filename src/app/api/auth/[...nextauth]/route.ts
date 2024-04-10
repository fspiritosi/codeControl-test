import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt"


const handler = NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
              password: { label: "Password", type: "password", placeholder: "*****" }
            },
            async authorize(credentials, req) {
      
              const userFound = await prisma.user.findUnique({
                where: {
                  email: credentials?.email
                }
              })
              if (!userFound) throw new Error(JSON.stringify({
                message: 'El usuario no existe'
              }))
      
              const isMatch = await bcrypt.compare(credentials?.password!, userFound.password)
              if (!isMatch) throw new Error(JSON.stringify({
                message: 'Usuario o Contraseña incorrecta'
              }))
      
              return { id: userFound.id.toString(), email: userFound.email, name: userFound.name, }
            }
          })
    ],
    pages:{
        signIn: '/login'
    }
})

export { handler as GET, handler as POST }