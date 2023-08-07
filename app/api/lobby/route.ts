import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const POST = async () => {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new Response(null, {
                status: 403,
                statusText: "Unauthorized",
            })
        }

        const lobbyAdmin = session.user
        if (!lobbyAdmin.name)
            return new Response(null, {
                status: 404,
                statusText: "No user name",
            })
        if (!lobbyAdmin.image)
            return new Response(null, {
                status: 404,
                statusText: "No user image",
            })

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
        return new Response(null, {
            status: 500,
            statusText: "Ошибка во время создания лобби",
        })
    }
}
