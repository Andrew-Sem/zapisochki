"use client"

import { FC } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { JoinLobbyForm } from "./forms/join-lobby-form"

export const LobbyActions: FC = () => {
    const createLobbyHandler = () => {
        fetch("/api/lobby", { method: "post" })
    }
    return (
        <div className="flex flex-col space-y-4">
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
                Создать свою игру
            </Button>
        </div>
    )
}
