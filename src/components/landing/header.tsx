'use client'
import Link from "next/link"
import ConnectButton from "../connect-button/button"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import path from "path"
import { api } from "@/trpc/trpc"
import { useAccount } from "wagmi"

interface HeaderProps {
    isScrolled: boolean
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void
}

export const Header = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
    const [isHomePage, setIsHomePage] = useState(true)
    const pathname = usePathname()
    const { address } = useAccount()
    const { data: userdata } = api.user.getUser.useQuery({ walletAddress: address ?? "" })

    useEffect(() => {
        pathname === "/will-builder" ? setIsHomePage(false) : setIsHomePage(true)
    }, [pathname])

    const handleMobileNavClick = (elementId: string) => {
        setIsMobileMenuOpen(false)
        setTimeout(() => {
            const element = document.getElementById(elementId)
            if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })
            }
        }, 100)
    }

    return (
        <>
            <header
                className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${isScrolled ? "max-w-5xl px-3" : "max-w-6xl px-4"
                    } py-2`}
                style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                }}
            >
                <Link
                    className={`z-50 transition-all duration-300 flex-shrink-0 ${isScrolled ? "ml-2" : ""
                        }`}
                    href="/"
                >
                    <img src="/legacy-logo.png" width={40} height={40} className="rounded-full"></img>
                </Link>
                <Link
                    className={`z-50 pr-12 gap-2 transition-all duration-300 flex-shrink-0`}
                    href="/dashboard"
                >
                    <p className="text-sm font-medium text-muted-foreground">{userdata?.name ?? "Guest"}</p>
                </Link>

                {isHomePage ?

                    <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex">
                        <a
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById("features")
                                if (element) {
                                    const headerOffset = 120 // Account for sticky header height + margin
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                                    const offsetPosition = elementPosition - headerOffset

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                        >
                            <span className="relative z-20">Features</span>
                        </a>
                        {/* <a
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById("pricing")
                                if (element) {
                                    const headerOffset = 120 // Account for sticky header height + margin
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                                    const offsetPosition = elementPosition - headerOffset

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                            href="#pricing"
                        >
                            <span className="relative z-20">Pricing</span>
                        </a> */}
                        <Link
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            href="/will-builder"
                        >
                            <span className="relative z-20">Will builder</span>
                        </Link>
                        <a
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById("testimonials")
                                if (element) {
                                    const headerOffset = 120 // Account for sticky header height + margin
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                                    const offsetPosition = elementPosition - headerOffset

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                        >
                            <span className="relative z-20">Testimonials</span>
                        </a>
                        {/* <a
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById("faq")
                                if (element) {
                                    const headerOffset = 120 // Account for sticky header height + margin
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                                    const offsetPosition = elementPosition - headerOffset

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth",
                                    })
                                }
                            }}
                        >
                            <span className="relative z-20">FAQ</span>
                        </a> */}

                    </div> :

                    <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex">
                        <Link
                            className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            href="/"
                        >
                            <span className="relative z-20">Back to home</span>
                        </Link>
                    </div>
                }
                <div className="relative flex-shrink-0 z-50 ml-10">
                    <ConnectButton />
                </div>

            </header>


            {/* Mobile Header */}
            <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
                <Link
                    className={`z-50 pr-12 gap-2 transition-all duration-300 flex-shrink-0`}
                    href="/dashboard"
                >
                    <p className="text-sm font-medium text-muted-foreground">{userdata?.name ?? "Guest"}</p>
                </Link>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                        ></span>
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                        ></span>
                        <span
                            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                        ></span>
                    </div>
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
                        <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
                            {isHomePage ?
                                <nav className="flex flex-col space-y-4">

                                    <button
                                        onClick={() => handleMobileNavClick("features")}
                                        className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                                    >
                                        Features
                                    </button>
                                    {/* <button
                                    onClick={() => handleMobileNavClick("pricing")}
                                    className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                                >
                                    Pricing
                                </button> */}
                                    <button
                                        onClick={() => handleMobileNavClick("testimonials")}
                                        className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                                    >
                                        Testimonials
                                    </button>
                                    {/* <button
                                        onClick={() => handleMobileNavClick("faq")}
                                        className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                                    >
                                        FAQ
                                    </button> */}
                                </nav>
                                :
                                <nav className="flex flex-col space-y-4">
                                    <div>
                                        <Link href="/" className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50">
                                            Back to home
                                        </Link>
                                    </div>
                                </nav>
                            }
                            <div className="relative flex-shrink-0 z-50 ml-10">
                                <ConnectButton />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}