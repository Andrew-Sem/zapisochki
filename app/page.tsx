import Link from "next/link"
import { Player } from "@prisma/client"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Header } from "@/components/header"
import { LobbyActions } from "@/components/lobby-actions"

const getPlayerById = async (id: string): Promise<Player> => {
    const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/players/` + id)
    return res.json()
}

export default async function Home() {
    const user = await getCurrentUser()
    if (!user)
        return (
            <div className="flex grow flex-col mx-auto">
                <Header />
                <div className="grow flex flex-col justify-center text-center  w-full container space-y-10 mt-56 max-w-md">
                    <h1 className="text-3xl font-semibold">
                        Войдите, чтобы начать играть
                    </h1>
                    <Link
                        href={"/login"}
                        className={buttonVariants({ variant: "default" })}
                    >
                        Войти
                    </Link>
                </div>
            </div>
        )

    const player = await getPlayerById(user?.id)
    const isInLobby = player.lobbyId!!

    return (
        <div className="flex grow flex-col mx-auto">
            <Header />
            <div className="grow flex flex-col justify-center text-center  w-full container space-y-10 mt-56 max-w-md">
                <h1 className="text-3xl font-semibold">Дарова, {user.name}</h1>
                {isInLobby ? (
                    <div className="space-y-5">
                        <div className="text-muted-foreground">
                            Ты уже находишься в лобби
                        </div>
                        <div className="space-x-4">
                            <Link
                                href={`/lobby/${player.lobbyId}`}
                                className={buttonVariants({
                                    variant: "default",
                                })}
                            >
                                Перейти в лобби
                            </Link>
                            <Button variant={"outline"}>Выйти из лобби</Button>
                        </div>
                    </div>
                ) : (
                    <LobbyActions />
                )}
            </div>
        </div>
    )
}
