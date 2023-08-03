import { NextRequest, NextResponse } from "next/server"
import { generateRandomString } from "@/utils/generateRandomString"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const POST = async () => {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const lobbyAdmin = session.user
        const playersData = {
            create: [
                {
                    id: lobbyAdmin.id,
                    username: lobbyAdmin.name || "",
                    imageUrl: lobbyAdmin.image || "",
                },
            ],
        }
        const newLobbyId = generateRandomString(16)

        await db.lobby.create({
            data: {
                id: newLobbyId,
                adminId: lobbyAdmin.id,
                players: playersData,
            },
        })
    } catch (e) {
        console.log(e)
        return new NextResponse(null, { status: 500 })
    }
}
