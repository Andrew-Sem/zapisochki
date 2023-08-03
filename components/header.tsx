import { FC } from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { HeaderMenu } from "./header-menu"

export const Header: FC = async () => {
  const user = await getServerSession()
  return (
    <header className=" sticky top-0 border-b bg-background/50 backdrop-blur-sm z-10">
      <div className="container flex justify-between items-center h-16">
        <div className="relative">
          <Link href={"/"}>
            <h2 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-muted-foreground to-accent-foreground">
              Zapisochki
            </h2>
          </Link>
          <div className="absolute bg-secondary rounded-full py-1 px-2 bottom-1/3 left-full ml-1 text-xs text-sky-500">
            preview
          </div>
        </div>
        <HeaderMenu user={user} />
      </div>
    </header>
  )
}
