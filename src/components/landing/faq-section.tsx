"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What is Legacy exactly?",
      answer:
        "Legacy is a Web3-native estate planning platform that helps you create and manage digital wills for both traditional and blockchain assets. Simply connect your wallet, add your assets (real estate, vehicles, crypto, NFTs), assign beneficiaries with their wallet addresses, and generate a professional will document.",
    },
    {
      question: "How does Legacy handle blockchain assets?",
      answer:
        "Legacy treats cryptocurrency and NFTs as first-class assets. You can add on-chain assets by specifying the blockchain (Ethereum, Polygon, Base, etc.), contract addresses, and token details. Beneficiaries are identified by their wallet addresses, enabling future smart contract integrations for automatic asset distribution.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! Your wallet address serves as your identity (no passwords to leak), and all data is encrypted and stored securely in our database. We use industry-standard security practices, and you maintain full control over your information. You can view, edit, or delete your will at any time.",
    },
    {
      question: "Do I need to connect a wallet to use Legacy?",
      answer:
        "Yes, wallet connection is required. We use wallet-based authentication (via MetaMask, WalletConnect, etc.) as your identity. This eliminates traditional login vulnerabilities and aligns with Web3 principles. Your wallet address is your unique identifier in the system.",
    },
    {
      question: "Can I include both traditional and crypto assets?",
      answer:
        "Absolutely! Legacy is designed to handle both worlds. Add your traditional assets (houses, cars, bank accounts) alongside your blockchain assets (ETH, NFTs, tokens). Everything is organized in one comprehensive will document that your executor and beneficiaries can reference.",
    },
    {
      question: "What happens after I generate my will?",
      answer:
        "Once generated, you get a professional, legally-formatted will document that includes all your assets and beneficiary information. You can download it, print it, and share it with your executor. The document includes both traditional asset details and blockchain wallet addresses for crypto assets.",
    },
    {
      question: "Can I update my will later?",
      answer:
        "Yes! You can log back in anytime with your wallet, review your existing will, and make updates. Life changes - new assets, different beneficiaries, updated information - and your will should reflect that. Simply connect your wallet and access your saved will to make changes.",
    },
    {
      question: "Is this legally binding?",
      answer:
        "Legacy generates properly formatted will documents that follow standard legal structures. However, legal requirements vary by jurisdiction. We recommend consulting with a local attorney to ensure your will meets all legal requirements in your state/country and is properly witnessed and notarized.",
    },
  ]

  return (
    <section id="faq" className="relative overflow-hidden pb-120 pt-24">
      {/* Background blur effects */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="z-10 container mx-auto px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="border-primary/40 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 uppercase">
            <span>✶</span>
            <span className="text-sm">Faqs</span>
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-6 max-w-xl text-center text-4xl font-medium md:text-[54px] md:leading-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Questions? We have got{" "}
          <span className="bg-gradient-to-b from-foreground via-rose-200 to-primary bg-clip-text text-transparent">
            answers
          </span>
        </motion.h2>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="from-secondary/40 to-secondary/10 rounded-2xl border border-white/10 bg-gradient-to-b p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:border-white/20 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
              {...(index === faqs.length - 1 && { "data-faq": faq.question })}
            >
              <div className="flex items-start justify-between">
                <h3 className="m-0 font-medium pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=""
                >
                  {openItems.includes(index) ? (
                    <Minus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  ) : (
                    <Plus className="text-primary flex-shrink-0 transition duration-300" size={24} />
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    className="mt-4 text-muted-foreground leading-relaxed overflow-hidden"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
