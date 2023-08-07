import { $api } from "@/http/api"
import { Lobby, Player } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchPlayerById = (id: string) =>
    useQuery<Player>({
        queryKey: ["get player by id", id],
        queryFn: () => $api.get(`/players/${id}`),
    })

export const useCreateLobbyMutation = () =>
    useMutation<Lobby>({
        mutationKey: ["create new lobby"],
        mutationFn: () => $api.post(`lobby`),
    })

export const useDeletePlayerFromLobbyMutation = (
    lobbyId: string,
    playerId: string
) =>
    useMutation({
        mutationKey: ["delete player from lobby", lobbyId, playerId],
        mutationFn: () =>
            $api.delete(`/lobby/${lobbyId}/players`, {
                data: {
                    playerId,
                },
            }),
    })
