import { Lobby, Player } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchPlayerById = (id: string) =>
    useQuery<Player>({
        queryKey: ["get player by id", id],
        queryFn: async () => {
            const res = await fetch(`/api/players/${id}`)
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        },
    })

export const useCreateLobbyMutation = () =>
    useMutation<Lobby>(async () => {
        const res = await fetch("/api/lobby", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })

export const useDeletePlayerFromLobbyMutation = (
    lobbyId: string,
    playerId: string
) =>
    useMutation(async () => {
        const res = await fetch(`/api/lobby/${lobbyId}/players`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerId: playerId }),
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })
