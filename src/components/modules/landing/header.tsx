'use client'
import Link from "next/link"
import ConnectButton from "../connect-button/button"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import path from "path"

interface HeaderProps {
    isScrolled: boolean
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void
}

export const Header = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
    const [isHomePage, setIsHomePage] = useState(true)
    const pathname = usePathname()

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
                className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${isScrolled ? "max-w-4xl px-3" : "max-w-5xl px-4"
                    } py-2`}
                style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                }}
            >
                <Link
                    className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 flex-shrink-0 ${isScrolled ? "ml-2" : ""
                        }`}
                    href="/"
                >
                    <img src="/legacy-logo.png" width={40} height={40} className="rounded-full"></img>
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
                <a
                    className="flex items-center justify-center gap-2"
                    href="https://v0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        fill="currentColor"
                        viewBox="0 0 147 70"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="text-foreground rounded-full size-7 w-7"
                    >
                        <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z"></path>
                        <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z"></path>
                    </svg>
                </a>

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