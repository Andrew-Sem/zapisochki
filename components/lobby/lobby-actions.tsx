"use client"

import { FC } from "react"
import Link from "next/link"
import { Player } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button"

import { Loader } from "../ui/loader"
import {
    useCreateLobbyMutation,
    useDeletePlayerFromLobbyMutation,
    useFetchPlayerById,
} from "./lobbyApi"

interface LobbyActionsProps {
    userId: string
}

export const LobbyActions: FC<LobbyActionsProps> = ({ userId }) => {
    const { data: player, isLoading } = useFetchPlayerById(userId)

    if (isLoading)
        return (
            <div className="space-x-2 flex items-center justify-center mt-8">
                <Loader className="w-4 h-4" />
                <span>Загрузка лобби</span>
            </div>
        )
    return (
        <div>
            {player?.lobbyId ? (
                <PlayerInLobbyActions
                    player={player as PlayerInLobbyActionsProps["player"]}
                />
            ) : (
                <PlayerNotInLobbyActions />
            )}
        </div>
    )
}

interface PlayerInLobbyActionsProps {
    player: Omit<Player, "lobbyId"> & { lobbyId: string }
}

const PlayerInLobbyActions: FC<PlayerInLobbyActionsProps> = ({ player }) => {
    const queryClient = useQueryClient()
    const { mutateAsync: deletePlayerFromLobby, isLoading } =
        useDeletePlayerFromLobbyMutation(player.lobbyId, player.id)

    const deletePlayerFromLobbyHandler = async () => {
        await deletePlayerFromLobby()
        queryClient.invalidateQueries(["get player by id"])
    }

    return (
        <div className="mt-4">
            <div className="text-muted-foreground">Ты уже в лобби</div>
            <div className="flex space-x-4 justify-center mt-8">
                <Link
                    href={`/lobby/${player.lobbyId}`}
                    className={buttonVariants({ variant: "default" })}
                >
                    Перейти в лобби
                </Link>
                <Button
                    disabled={isLoading}
                    variant={"outline"}
                    onClick={deletePlayerFromLobbyHandler}
                    className="space-x-2"
                >
                    {isLoading ? <Loader className="w-4 h-4" /> : null}
                    <span>Выйти из лобби</span>
                </Button>
            </div>
        </div>
    )
}

const PlayerNotInLobbyActions: FC = ({}) => {
    const { mutateAsync: createLobby, isLoading } = useCreateLobbyMutation()
    const queryClient = useQueryClient()

    const createLobbyHandler = async () => {
        await createLobby()
        queryClient.invalidateQueries(["get player by id"])
    }
    return (
        <div className="flex flex-col space-y-4 mt-8">
            <Button>Присоединиться к игре</Button>
            <Button
                disabled={isLoading}
                variant={"outline"}
                onClick={createLobbyHandler}
                className="space-x-2"
            >
                {isLoading ? <Loader className="w-4 h-4" /> : null}
                <span>Создать свою игру</span>
            </Button>
        </div>
    )
}
