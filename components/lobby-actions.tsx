"use client"

import { FC } from "react"
import Link from "next/link"
import { Lobby, Player } from "@prisma/client"
import { isError, useMutation, useQuery } from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button"

import { Loader } from "./ui/loader"
import { toast } from "./ui/use-toast"

interface LobbyActionsProps {
    userId: string
}

export const LobbyActions: FC<LobbyActionsProps> = ({ userId }) => {
    const {
        data: player,
        isLoading: isLoadingPlayer,
        isError: isErrorPlayer,
    } = useQuery<Player>({
        queryKey: ["get player by id", userId],
        queryFn: async () => {
            const res = await fetch(`/api/players/${userId}`)
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        },
    })
    const {
        data: lobby,
        isError: isErrorLobby,
        isLoading: isLoadingLobby,
        mutate,
    } = useMutation<Lobby>(async () => {
        const res = await fetch("/api/lobby", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })
    const createLobbyHandler = () => {
        mutate()
    }

    if (isErrorLobby)
        toast({
            title: "Ошибка создания лобби",
            description: "Попробуйте ещё раз попозже",
        })

    if (isErrorPlayer)
        toast({
            title: "Ошибка получения информации об игроке",
            description: "Попробуйте ещё раз попозже",
        })

    if (isLoadingPlayer || isLoadingLobby)
        return (
            <div className="flex justify-center mt-6 items-center">
                <Loader className="w-6 h-6" />
            </div>
        )
    return (
        <div>
            {player?.lobbyId || lobby ? (
                <div className="mt-4">
                    <div className="text-muted-foreground">Ты уже в лобби</div>
                    <div className="flex space-x-4 justify-center mt-8">
                        <Link
                            href={`/lobby/${player?.lobbyId || lobby?.id}`}
                            className={buttonVariants({ variant: "default" })}
                        >
                            Перейти в лобби
                        </Link>
                        <Button variant={"outline"}>Выйти из лобби</Button>
                    </div>
                </div>
            ) : (
                <div className=" flex flex-col space-y-4 mt-8">
                    <Button>Присоединиться к игре</Button>
                    <Button variant={"outline"} onClick={createLobbyHandler}>
                        <span>Создать свою игру</span>
                    </Button>
                </div>
            )}
        </div>
    )
}
