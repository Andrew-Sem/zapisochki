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
            return new NextResponse("Player not found", { status: 404 })

        return new NextResponse(JSON.stringify(player))
    } catch (e) {
        console.log(e)
    }
}
