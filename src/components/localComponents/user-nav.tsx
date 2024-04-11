import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getServerSession } from "next-auth"
import ButtonSingout from "./ButtonSingout"
  
   export async function UserNav() {

    const sesion = await getServerSession() 
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={sesion?.user?.image || ''} alt={sesion?.user?.name || "@shadcn"} />
              <AvatarFallback>{sesion?.user?.name?.slice(0,1) || 'SC'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{sesion?.user?.name || 'User Example'}</p>
              <p className="text-xs leading-none text-muted-foreground">
              {sesion?.user?.email || 'user@example.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
             
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ButtonSingout />    
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }