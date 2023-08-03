import { Link } from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { buttonVariants } from "@/components/ui/button"
import { Header } from "@/components/header"
import { LobbyActions } from "@/components/lobby-actions"

export default async function Home() {
    const user = await getCurrentUser()

    return (
        <div className="flex grow flex-col mx-auto">
            <Header />
            <div className="grow flex flex-col justify-center text-center  w-full container space-y-10 mt-56 max-w-md">
                {user ? (
                    <>
                        <h1 className="text-3xl font-semibold">
                            Дарова, {user.name}
                        </h1>
                        <LobbyActions />
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold">
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
            </div>
        </div>
    )
}
