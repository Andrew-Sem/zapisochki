import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Zapisochki",
    description: "Zapisochki game",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.className, "min-h-screen")}>
                <QueryProvider>{children}</QueryProvider>
                <Toaster />
            </body>
        </html>
    )
}
