import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { lobbyId: string } }
) => {
    const { lobbyId } = params
    const res = await req.json()
    try {
        const { playerId } = res
        if (!playerId)
            return new Response(null, {
                status: 400,
                statusText: "playerId was not found in request",
            })

        const player = await db.player.findUnique({
            where: {
                id: playerId,
                lobbyId,
            },
        })

        if (!player)
            return new Response(null, {
                status: 404,
                statusText: "player was not found",
            })

        const updatedLobby = await db.lobby.update({
            where: { id: lobbyId },
            data: {
                players: {
                    disconnect: { id: playerId },
                },
            },
            include: {
                players: true,
            },
        })

        // if there are no players in lobby
        if (updatedLobby.players.length === 0)
            await db.lobby.delete({
                where: { id: lobbyId },
            })

        return new Response(JSON.stringify(updatedLobby), {
            status: 200,
            statusText: "player succesfully disconnected from lobby",
        })
    } catch (e) {
        console.log(e)
    }
}
