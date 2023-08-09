import { $api } from "@/http/api"
import { Player } from "@prisma/client"

export class PlayerService {
    static fetchPlayerById(id: string) {
        return $api.get<Player>(`/players/${id}`)
    }
}
