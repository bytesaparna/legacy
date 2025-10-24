"use client"
import { useState, useEffect } from "react"
import Hero from "./hero"
import { TestimonialsSection } from "./testimonials"
import { NewReleasePromo } from "./new-release-promo"
import { FAQSection } from "./faq-section"
import { PricingSection } from "./pricing-section"
import { StickyFooter } from "./footer"
import Features from "./features"
import { Header } from "./header"

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <div className="min-h-screen w-full relative bg-black">
            {/* Pearl Mist Background with Top Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
                }}
            />
            {/* Header */}
            <Header isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <div id="features">
                <Features />
            </div>

            {/* Pricing Section */}
            <div id="pricing">
                <PricingSection />
            </div>

            {/* Testimonials Section */}
            <div id="testimonials">
                <TestimonialsSection />
            </div>

            <NewReleasePromo />

            {/* FAQ Section */}
            <div id="faq">
                <FAQSection />
            </div>

            {/* Sticky Footer */}
            <StickyFooter />
        </div>
    )
}
