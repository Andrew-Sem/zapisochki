"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { LobbyService } from "@/services/LobbyService"
import { PlayerService } from "@/services/PlayerService"
import { Player } from "@prisma/client"
import {
    useIsFetching,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button"

import { Loader } from "../ui/loader"

interface LobbyActionsProps {
    userId: string
}

export const LobbyActions: FC<LobbyActionsProps> = ({ userId }) => {
    const { data: player, isLoading } = useQuery<Player, Error>({
        queryKey: ["players", userId],
        queryFn: () =>
            PlayerService.fetchPlayerById(userId).then((res) => res.data),
    })

    if (isLoading)
        return (
            <div className="flex justify-center mt-8">
                <Loader className="w-4 h-4" />
            </div>
        )
    return (
        <div>
            {player?.lobbyId ? (
                <PlayerInLobbyActions
                    player={player as PlayerInLobbyActionsProps["player"]}
                />
            ) : (
                <PlayerNotInLobbyActions userId={userId} />
            )}
        </div>
    )
}

interface PlayerInLobbyActionsProps {
    player: Omit<Player, "lobbyId"> & { lobbyId: string }
}

const PlayerInLobbyActions: FC<PlayerInLobbyActionsProps> = ({ player }) => {
    const isLoadingPlayer = useIsFetching(["players"])

    const queryClient = useQueryClient()
    const { mutate: deletePlayerFromLobby, isLoading } = useMutation({
        mutationKey: ["lobby", player.lobbyId, "players", player.id],
        mutationFn: () => LobbyService.signOut(player.lobbyId, player.id),
        onSuccess: () => {
            queryClient.invalidateQueries(["players", player.id])
        },
    })

    const deletePlayerFromLobbyHandler = () => {
        deletePlayerFromLobby()
    }

    if (isLoadingPlayer)
        return (
            <div className="flex justify-center mt-8">
                <Loader className="w-4 h-4" />
            </div>
        )

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

interface PlayerNotInLobbyActionsProps {
    userId: string
}

const PlayerNotInLobbyActions: FC<PlayerNotInLobbyActionsProps> = ({
    userId,
}) => {
    const isLoadingPlayer = useIsFetching(["players"])
    const queryClient = useQueryClient()
    const { mutate: createLobby, isLoading } = useMutation({
        mutationKey: ["lobby", userId],
        mutationFn: () => LobbyService.create().then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["players"])
        },
    })

    const createLobbyHandler = () => {
        createLobby()
    }

    if (isLoadingPlayer)
        return (
            <div className="flex justify-center mt-8">
                <Loader className="w-4 h-4" />
            </div>
        )

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
