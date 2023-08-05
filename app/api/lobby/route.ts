import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const POST = async () => {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        const lobbyAdmin = session.user
        if (!lobbyAdmin.name)
            return NextResponse.json({ error: "No user name" }, { status: 404 })
        if (!lobbyAdmin.image)
            return NextResponse.json(
                { error: "No user image" },
                { status: 404 }
            )

        const newLobby = await db.lobby.create({
            data: {
                adminId: lobbyAdmin.id,
                players: {
                    connectOrCreate: {
                        create: {
                            id: lobbyAdmin.id,
                            imageUrl: lobbyAdmin.image,
                            username: lobbyAdmin.name,
                        },
                        where: {
                            id: lobbyAdmin.id,
                        },
                    },
                },
            },
        })
        return NextResponse.json(newLobby, { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "Ошибка во время создания лобби" },
            { status: 500 }
        )
    }
}
