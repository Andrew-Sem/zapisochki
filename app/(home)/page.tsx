import Link from "next/link"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Button, buttonVariants } from "@/components/ui/button"
import { LobbyActions } from "@/components/lobby-actions"

export default async function Home() {
    const user = await getCurrentUser()

    return (
        <>
            {user ? (
                <>
                    <h1 className="text-3xl font-semibold">
                        Дарова, {user.name}
                    </h1>
                    <LobbyActions userId={user.id} />
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-semibold mb-4">
                        Войдите, чтобы начать играть
                    </h1>
                    <Link
                        href={"/login"}
                        className={buttonVariants({ variant: "default" })}
                    >
                        Войти
                    </Link>
                </>
            )}
        </>
    )
}
