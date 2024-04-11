import { getServerSession } from "next-auth"
import Image from "next/image"
import ButtonSingout from "../../components/localComponents/ButtonSingout"
import { UserNav } from "@/components/localComponents/user-nav"
import TeamSwitcher from "@/components/localComponents/team-switcher"



async function DashboardPage() {

  const session = await getServerSession()

  return (

    <>
      
        <div className="border-b">
          <div className="flex h-16 items-center px-4 justify-between">
              {/* 
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <Search /> */}
                <TeamSwitcher />
                <UserNav />
          </div>
        </div>
        

    </>
    // <div className="flex justify-center items-center flex-col gap-5 h-screen">
    //   <h1>Bienvenido {session?.user?.name}</h1>
    //   <p>{session?.user?.email}</p>
    //   <Image src={session?.user?.image || ""} alt={session?.user?.name || ""} width={100} height={100} className="rounded-full"/>
    //   <ButtonSingout />
    // </div>
  )
}

export default DashboardPage