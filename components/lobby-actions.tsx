"use client"

import { FC, useState } from "react"
import { RedirectType } from "next/dist/client/components/redirect"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Lobby } from "@prisma/client"
import { ChevronRightIcon, EnterIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { JoinLobbyForm } from "./forms/join-lobby-form"
import { Loader } from "./ui/loader"

export const LobbyActions: FC = () => {
    const [lobby, setLobby] = useState<Lobby | null>(null)
    const [isLoadingLobby, setIsLoadingLobby] = useState(false)
    const createLobbyHandler = async () => {
        setIsLoadingLobby(true)
        const res = await fetch("/api/lobby", {
            method: "post",
            body: JSON.stringify(null),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const newLobby = await res.json()
        setLobby(newLobby)
        setIsLoadingLobby(false)
    }
    return (
        <div className="flex flex-col space-y-4">
            {lobby ? (
                <Link
                    href={`lobby/${lobby.id}`}
                    className={buttonVariants({ variant: "default" })}
                >
                    <span>Перейти в лобби</span>
                    <EnterIcon className="mr-2 w-4 h-4" />
                </Link>
            ) : (
                <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Присоединиться к лобби</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <JoinLobbyForm />
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant={"outline"}
                        className="w-full"
                        onClick={createLobbyHandler}
                    >
                        {isLoadingLobby ? (
                            <Loader className="mr-2 w-4 h-4" />
                        ) : null}
                        <span>Создать свою игру</span>
                    </Button>
                </>
            )}
        </div>
    )
}
