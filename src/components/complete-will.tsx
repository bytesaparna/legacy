"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"


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
    beneficiaries?: {
      name: string,
      relationship: string,
      share: string,
    }[],
    documents: string[],
    notes: string,
    relationship?: string,
  }[],
  onChainAssets: {
    id: string,
    assetType: string,
    blockchain: string,
    contractAddress: string,
    tokenId: string,
    tokenSymbol: string,
    walletAddress: string,
    estimatedValue: number,
    description: string,
    notes: string,
    beneficiaries: {
      name: string,
      relationship: string,
      share: string,
      walletAddress: string,
    }[],
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
      <DialogContent className="h-[90vh] max-h-[90vh] overflow-y-auto !bg-black w-full !max-w-5xl px-4 mt-20">
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
  onChainAssets,
  stampColor = "#DC143C"
}: LastWillProps) {
  return (
    <div className="min-h-full">
      {/* Main Document Container */}
      <div
        className="min-h-full"
        style={{
          backgroundImage: 'url(/legacy-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backgroundAttachment: 'local',
          backgroundColor: '#000000'
        }}
      >
        {/* Document Content */}
        <div className="w-full">
          <div className="text-black px-8 py-72" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl font-serif md:text-5xl font-bold tracking-wide mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>Last Will and Testament</h1>
            </div>

            {/* Testator Info */}
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-lg mb-2">
                <span className="font-semibold">I, {personalInfo.fullName}</span>, being of sound mind and memory, do hereby
                make, publish, and declare this to be my Last Will and Testament.
              </p>
            </div>

            {/* Date and Location */}
            <div className="mb-10 max-w-4xl mx-auto text-center">
              <p><span className="font-semibold">Date:</span> {personalInfo.dateOfBirth}</p>
              <p><span className="font-semibold">Location:</span> {personalInfo.address}</p>
            </div>

            {/*Assets */}
            {assets.length > 0 && (
              <div className="mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-2 text-center"> Assets & Beneficiaries</h2>
                <div className="space-y-4">
                  {assets.map((asset, i) => (
                    <div key={i} className="ml-4 pb-3 text-start">
                      <p className="font-semibold ml-6">{i + 1}. {asset.description}</p>
                      <p className="text-sm ml-6"><strong>Type:</strong> {asset.type}</p>
                      <p className="text-sm ml-6"><strong>Location:</strong> {asset.location}</p>
                      <p className="text-sm ml-6"><strong>Description:</strong> {asset.description}</p>
                      <p className="text-sm ml-6"><strong>Estimated Value:</strong> ${asset.value}</p>
                      {asset.beneficiaries && asset.beneficiaries.length > 0 && (
                        <div className="ml-4 mt-2">
                          <p className="text-sm font-semibold">Beneficiaries:</p>
                          {asset.beneficiaries.map((b, bIdx) => (
                            <p key={bIdx} className="text-xs ml-4">• {b.name} ({b.relationship}) - Share: {b.share}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* On-Chain Assets */}
            {onChainAssets.length > 0 && (
              <div className="mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-2 text-center">On-Chain Assets & Cryptocurrency</h2>
                <div className="space-y-4">
                  {onChainAssets.map((asset, i) => (
                    <div key={i} className="ml-6 pb-3">
                      <p className="font-semibold ml-6">{i + 1}. {asset.description}</p>
                      <p className="text-sm ml-6"><strong>Type:</strong> {asset.assetType}</p>
                      <p className="text-sm ml-6"><strong>Blockchain:</strong> {asset.blockchain}</p>
                      <p className="text-sm ml-6"><strong>Wallet Address:</strong> {asset.walletAddress}</p>
                      <p className="text-sm ml-6"><strong>Estimated Value:</strong> ${asset.estimatedValue}</p>
                      {asset.beneficiaries.length > 0 && (
                        <div className="ml-4 mt-2">
                          <p className="text-sm font-semibold">Beneficiaries:</p>
                          {asset.beneficiaries.map((b, bIdx) => (
                            <p key={bIdx} className="text-xs ml-4">• {b.name} ({b.relationship}) - {b.share} - Wallet: {b.walletAddress}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Executor */}
            {executor && executor.name && executor.relationship && executor.address && (
              <div className="mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-2 text-center">Executor</h2>
                <p className="ml-4 font-semibold">{executor.name}</p>
                <p className="text-sm ml-8"><strong>Relationship:</strong> {executor.relationship}</p>
              </div>)}

            {/* Guardians */}
            {guardians && guardians.length > 0 && guardians.every(guardian => guardian.name && guardian.relationship) && (
              <div className="mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-2 text-center">Guardians</h2>
                <div className="space-y-4">
                  {guardians.map((guardian, i) => (
                    <div key={i} className="ml-4 pb-3">
                      <p className="font-semibold">{i + 1}. {guardian.name}</p>
                      <p className="text-sm ml-4"><strong>Relationship:</strong> {guardian.relationship}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            {specialInstructions && specialInstructions.length > 0 && (
              <div className="mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 pb-2 text-center">Special Instructions</h2>
                <p className="ml-4 font-semibold">{specialInstructions}</p>
              </div>
            )}


            {/* Signature */}
            <div className="mt-16 pt-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="h-16 mb-2" />
                  <p className="text-center text-2xl font-mono text-black rotate-[-20deg] mb-8">{personalInfo.fullName}</p>
                  <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">Testator Signature</p>
                </div>
              </div>
            </div>

            {/* Seal */}
            <div className="relative bottom-24 left-1/2 md:bottom-44 md:left-1/2">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full blur-md"
                  style={{ backgroundColor: stampColor, opacity: 0.8, transform: "scale(1.1)" }} />
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
  )
}
