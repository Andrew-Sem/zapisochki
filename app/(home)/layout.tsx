import { FC, ReactNode } from "react"

import { Header } from "@/components/header"

interface HomeLayoutProps {
    children: ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
    return (
        <div className="flex grow flex-col mx-auto">
            <Header />
            <div className="grow flex flex-col justify-center text-center  w-full container mt-56 max-w-md">
                {children}
            </div>
        </div>
    )
}

export default HomeLayout
