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
    const { data: player, isLoading: isLoadingPlayer } = useQuery<Player>({
        queryKey: ["get player by id"],
        queryFn: () =>
            fetch(`/api/players/${userId}`).then((res) => res.json()),
    })
    const {
        data: lobby,
        isError: isErrorLobby,
        isLoading: isLoadingLobby,
        mutate,
    } = useMutation<Lobby>(() =>
        fetch("/api/lobby", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
    )
    const createLobbyHandler = () => {
        mutate()
    }
    if (isErrorLobby)
        toast({
            title: "Ошибка создания лобби",
            description: "Попробуйте ещё раз",
        })

    if (isLoadingPlayer || isLoadingLobby)
        return (
            <div className="flex justify-center mt-4 space-x-2 items-center">
                <Loader className="w-4 h-4" />
                <span>Загрузка лобби</span>
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
