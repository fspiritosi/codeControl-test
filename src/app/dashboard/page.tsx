import { getServerSession } from "next-auth"
import Image from "next/image"
import ButtonSingout from "../components/ButtonSingout"



async function DashboardPage() {

  const session = await getServerSession()

  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
      <h1>Bienvenido {session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <Image src={session?.user?.image || ""} alt={session?.user?.name || ""} width={100} height={100} className="rounded-full"/>
      <ButtonSingout />
    </div>
  )
}

export default DashboardPage