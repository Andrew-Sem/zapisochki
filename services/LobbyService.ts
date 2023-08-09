import { $api } from "@/http/api"
import { Player } from "@prisma/client"
import { AxiosResponse } from "axios"

export class LobbyService {
    static async signOut(
        lobbyId: string,
        playerId: string
    ): Promise<AxiosResponse<Player>> {
        return $api.delete<Player>(`/lobby/${lobbyId}/players`, {
            data: { playerId },
        })
    }

    static async create() {
        return $api.post("/lobby")
    }
}
