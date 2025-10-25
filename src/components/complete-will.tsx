"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"



interface LastWillProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  personalInfo: {
    fullName: string,
    dateOfBirth: string,
    address: string,
    maritalStatus: string,
    occupation: string,
  },
  assets: {
    id: string,
    type: string,
    category: string,
    name: string,
    description: string,
    value: number,
    purchaseDate?: string,
    location: string,
    beneficiary?: string,
    documents: string[],
    notes: string,
    relationship?: string,
  }[],
  beneficiaries: {
    name: string,
    relationship: string,
    share: string,
  }[],
  executor: { name: string, relationship: string, address: string },
  guardians: {
    name: string,
    relationship: string,
  }[],
  specialInstructions: string,
  location?: string
  backgroundColor?: string
  stampColor?: string
}



export default function LastWillDialog(props: LastWillProps) {
  const { open, setOpen } = props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Modal Content */}
      <DialogContent className="h-[80vh] overflow-y-auto p-0 bg-transparent w-full !max-w-4xl mt-14">
        <DialogHeader className="hidden">
          <DialogTitle>Last Will and Testament</DialogTitle>
        </DialogHeader>
        {/* The document itself */}
        <LastWillAndTestament {...props} />
      </DialogContent>
    </Dialog>
  )
}



function LastWillAndTestament({
  personalInfo,
  assets,
  executor,
  guardians,
  specialInstructions,
  beneficiaries,
  location = "State of [Location]",
  backgroundColor = "#F5E6D3",
  stampColor = "#DC143C"
}: LastWillProps) {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 md:p-8">
      {/* Main Document Container */}
      <div className="relative !w-full">
        <div
          className="relative bg-cover bg-center shadow-2xl"
          style={{
            backgroundColor: backgroundColor,
            backgroundImage: `
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" seed="2"/><feColorMatrix in="noise" type="saturate" values="0"/></filter><rect width="100" height="100" fill="%23F5E6D3" filter="url(%23noise)" opacity="0.03"/></svg>'),
              radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%),
              linear-gradient(135deg, rgba(218, 165, 32, 0.08) 0%, rgba(184, 134, 11, 0.04) 50%, rgba(139, 69, 19, 0.06) 100%),
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(139, 69, 19, 0.01) 2px,
                rgba(139, 69, 19, 0.01) 4px
              )
            `,
            backgroundBlendMode: "multiply, normal, normal, normal",
          }}
        >
          {/* Gold Border Frame */}
          <div className="border-8 border-yellow-600 shadow-inner" style={{ borderColor: "#B8860B" }}>
            {/* Corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-yellow-700" style={{ borderColor: "#8B4513" }} />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-yellow-700" style={{ borderColor: "#8B4513" }} />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-yellow-700" style={{ borderColor: "#8B4513" }} />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-yellow-700" style={{ borderColor: "#8B4513" }} />

            {/* Document Content */}
            <div className="p-12 md:p-16 font-serif text-gray-900">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">Last Will and Testament</h1>
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-yellow-700" />
                  <span className="text-yellow-700 text-2xl">✦</span>
                  <div className="flex-1 h-px bg-yellow-700" />
                </div>
              </div>

              {/* Testator Info */}
              <div className="mb-8 text-center">
                <p className="text-lg mb-2">
                  <span className="font-semibold">I, {personalInfo.fullName}</span>, being of sound mind and memory, do hereby
                  make, publish, and declare this to be my Last Will and Testament.
                </p>
              </div>

              {/* Date and Location */}
              <div className="mb-10 text-center text-sm">
                <p><span className="font-semibold">Date:</span> {personalInfo.dateOfBirth}</p>
                <p><span className="font-semibold">Location:</span> {location}</p>
              </div>

              {/* Beneficiaries */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Beneficiaries</h2>
                <div className="space-y-4">
                  {beneficiaries.map((b, i) => (
                    <div key={i} className="ml-4 pb-3 border-b border-yellow-200">
                      <p className="font-semibold">{i + 1}. {b.name}</p>
                      <p className="text-sm ml-4"><strong>Relationship:</strong> {b.relationship}</p>
                      <p className="text-sm ml-4"><strong>Bequest:</strong> {b.share}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executor */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Executor</h2>
                <p className="ml-4 font-semibold">{executor.name}</p>
                <p className="text-sm ml-8"><strong>Relationship:</strong> {executor.relationship}</p>
              </div>

              {/* Signature */}
              <div className="mt-16 pt-8 border-t-2 border-yellow-700">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="h-16 mb-2" />
                    <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">Testator Signature</p>
                    <p className="text-center text-xs text-gray-600 mt-1">{personalInfo.fullName}</p>
                  </div>
                  <div>
                    <div className="h-16 mb-2" />
                    <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">Date Signed</p>
                    <p className="text-center text-xs text-gray-600 mt-1">_________________</p>
                  </div>
                </div>
              </div>

              {/* Seal */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full blur-md"
                    style={{ backgroundColor: stampColor, opacity: 0.2, transform: "scale(1.1)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                    <defs>
                      <radialGradient id="sealGradient" cx="40%" cy="40%">
                        <stop offset="0%" stopColor={stampColor} stopOpacity="0.9" />
                        <stop offset="70%" stopColor={stampColor} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={stampColor} stopOpacity="0.5" />
                      </radialGradient>
                    </defs>
                    <circle cx="60" cy="60" r="55" fill="none" stroke={stampColor} strokeWidth="2.5" opacity="0.8" />
                    <circle cx="60" cy="60" r="38" fill="url(#sealGradient)" />
                    <text x="60" y="68" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="serif">
                      OFFICIAL
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
