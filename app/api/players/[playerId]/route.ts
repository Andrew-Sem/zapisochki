import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db"

export const GET = async (
    _: NextRequest,
    { params }: { params: { playerId: string } }
) => {
    try {
        const { playerId } = params

        const player = await db.player.findUnique({
            where: {
                id: playerId,
            },
        })
        if (!player)
            return new NextResponse(null, {
                status: 404,
                statusText: "Player not found",
            })

        return new NextResponse(JSON.stringify(player))
    } catch (e) {
        console.log(e)
    }
}
