"use client"
import Link from "next/link"
import ConnectButton from "../connect-button/button"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "@/trpc/trpc"
import { useAccount } from "wagmi"

interface HeaderProps {
    isScrolled: boolean
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (open: boolean) => void
}

export const Header = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
    const [isHomePage, setIsHomePage] = useState(true)
    const pathname = usePathname()
    const { address } = useAccount()
    const { data: userdata } = api.user.getUser.useQuery({ walletAddress: address ?? "" })

    useEffect(() => {
        setIsHomePage(pathname !== "/will-builder")
    }, [pathname])

    const scrollToElement = (id: string) => {
        setIsMobileMenuOpen(false)
        setTimeout(() => {
            const el = document.getElementById(id)
            if (!el) return
            const headerOffset = 120
            const offset = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
            window.scrollTo({ top: offset, behavior: "smooth" })
        }, 80)
    }

    return (
        <>
            {/* DESKTOP HEADER */}
            <header
                className={`sticky top-4 z-50 mx-auto w-full 
                    grid grid-cols-[auto_1fr_auto] items-center
                    rounded-full bg-background/80 backdrop-blur-sm
                    border border-border/50 shadow-lg md:grid
                    transition-all duration-300
                    ${isScrolled ? "max-w-5xl px-3 py-2" : "max-w-6xl px-4 py-2"}
                `}
            >
                {/* Left: Logo */}
                <Link href="/" className="shrink-0">
                    <img
                        src="/legacy-logo.png"
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="Legacy Logo"
                    />
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex justify-center items-center space-x-3 text-sm font-medium text-muted-foreground">
                    {isHomePage ? (
                        <>
                            <Link className="px-3 py-2 hover:text-foreground" href="/dashboard">
                                {userdata?.name ?? "Guest"}
                            </Link>

                            <button
                                onClick={() => scrollToElement("features")}
                                className="px-3 py-2 hover:text-foreground"
                            >
                                Features
                            </button>

                            <Link className="px-3 py-2 hover:text-foreground" href="/will-builder">
                                Will builder
                            </Link>

                            <button
                                onClick={() => scrollToElement("testimonials")}
                                className="px-3 py-2 hover:text-foreground"
                            >
                                Testimonials
                            </button>
                            <button
                                onClick={() => scrollToElement("faq")}
                                className="px-3 py-2 hover:text-foreground"
                            >
                                FAQ
                            </button>
                        </>
                    ) : (
                        <Link className="px-3 py-2 hover:text-foreground" href="/">
                            Back to home
                        </Link>
                    )}
                </div>

                {/* Right: Connect Button */}
                <div className="justify-self-end">
                    <ConnectButton />
                </div>
            </header>

            {/* MOBILE HEADER */}
            <header className="sticky top-4 z-40 mx-4 flex md:hidden w-auto items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg px-4 py-3">
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground">
                    {userdata?.name ?? "Guest"}
                </Link>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 border border-border/50"
                >
                    <div className="flex flex-col w-5 h-5 justify-center items-center">
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                        />
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition ${isMobileMenuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                        />
                    </div>
                </button>
            </header>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden">
                    <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
                        {isHomePage ? (
                            <nav className="flex flex-col space-y-4">
                                <button
                                    onClick={() => scrollToElement("features")}
                                    className="px-4 py-3 text-lg font-medium hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground"
                                >
                                    Features
                                </button>

                                <button
                                    onClick={() => scrollToElement("testimonials")}
                                    className="px-4 py-3 text-lg font-medium hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground"
                                >
                                    Testimonials
                                </button>
                                <button
                                    onClick={() => scrollToElement("faq")}
                                    className="px-4 py-3 text-lg font-medium hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground"
                                >
                                    FAQ
                                </button>
                            </nav>
                        ) : (
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="/"
                                    className="px-4 py-3 text-lg font-medium hover:bg-background/50 rounded-lg text-muted-foreground hover:text-foreground"
                                >
                                    Back to home
                                </Link>
                            </nav>
                        )}

                        <div className="mt-6">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
