"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface QueryProviderProps {
    children: ReactNode
}

const queryClient = new QueryClient()

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
