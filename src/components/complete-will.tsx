"use client"

interface Beneficiary {
  name: string
  relationship: string
  bequest: string
}

interface Executor {
  name: string
  title: string
}

interface LastWillProps {
  testatorName: string
  date: string
  declaration: string
  beneficiaries: Beneficiary[]
  executors: Executor[]
  finalStatement: string
  location?: string
  backgroundColor?: string
  stampColor?: string
}

export default function LastWillAndTestament({
  testatorName,
  date,
  declaration,
  beneficiaries,
  executors,
  finalStatement,
  location = "State of [Location]",
  backgroundColor = "#F5E6D3",
  stampColor = "#DC143C",
}: LastWillProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Document Container */}
      <div className="relative w-full max-w-4xl">
        <div
          className="relative bg-cover bg-center shadow-2xl"
          style={{
            backgroundColor: backgroundColor,
            backgroundImage: `
              /* Paper grain texture overlay */
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" seed="2"/><feColorMatrix in="noise" type="saturate" values="0"/></filter><rect width="100" height="100" fill="%23F5E6D3" filter="url(%23noise)" opacity="0.03"/></svg>'),
              /* Vignette shadow effect */
              radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%),
              /* Subtle aged paper gradient */
              linear-gradient(135deg, rgba(218, 165, 32, 0.08) 0%, rgba(184, 134, 11, 0.04) 50%, rgba(139, 69, 19, 0.06) 100%),
              /* Organic paper texture with noise */
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
            <div
              className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-yellow-700"
              style={{ borderColor: "#8B4513" }}
            />
            <div
              className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-yellow-700"
              style={{ borderColor: "#8B4513" }}
            />
            <div
              className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-yellow-700"
              style={{ borderColor: "#8B4513" }}
            />
            <div
              className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-yellow-700"
              style={{ borderColor: "#8B4513" }}
            />

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
                  <span className="font-semibold">I, {testatorName}</span>, being of sound mind and memory, do hereby
                  make, publish, and declare this to be my Last Will and Testament.
                </p>
              </div>

              {/* Date and Location */}
              <div className="mb-10 text-center text-sm">
                <p>
                  <span className="font-semibold">Date:</span> {date}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {location}
                </p>
              </div>

              {/* Declaration Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Declaration</h2>
                <p className="text-justify leading-relaxed text-base mb-4">{declaration}</p>
              </div>

              {/* Beneficiaries Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Beneficiaries</h2>
                <div className="space-y-4">
                  {beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="ml-4 pb-3 border-b border-yellow-200">
                      <p className="font-semibold">
                        {index + 1}. {beneficiary.name}
                      </p>
                      <p className="text-sm text-gray-700 ml-4">
                        <span className="font-semibold">Relationship:</span> {beneficiary.relationship}
                      </p>
                      <p className="text-sm text-gray-700 ml-4">
                        <span className="font-semibold">Bequest:</span> {beneficiary.bequest}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executors Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Executors</h2>
                <div className="space-y-3">
                  {executors.map((executor, index) => (
                    <div key={index} className="ml-4">
                      <p className="font-semibold">
                        {index + 1}. {executor.name}
                      </p>
                      <p className="text-sm text-gray-700 ml-4">
                        <span className="font-semibold">Title:</span> {executor.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Statement */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-700 pb-2">Final Statement</h2>
                <p className="text-justify leading-relaxed text-base italic">{finalStatement}</p>
              </div>

              {/* Signature Section */}
              <div className="mt-16 pt-8 border-t-2 border-yellow-700">
                <div className="grid grid-cols-2 gap-8">
                  {/* Testator Signature */}
                  <div>
                    <div className="h-16 mb-2" />
                    <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">Testator Signature</p>
                    <p className="text-center text-xs text-gray-600 mt-1">{testatorName}</p>
                  </div>

                  {/* Date Signed */}
                  <div>
                    <div className="h-16 mb-2" />
                    <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">Date Signed</p>
                    <p className="text-center text-xs text-gray-600 mt-1">_________________</p>
                  </div>
                </div>
              </div>

              {/* Witness Section */}
              <div className="mt-12 pt-8 border-t-2 border-yellow-700">
                <p className="text-center font-semibold mb-6">Witnessed by:</p>
                <div className="grid grid-cols-2 gap-8">
                  {[1, 2].map((witness) => (
                    <div key={witness}>
                      <div className="h-16 mb-2" />
                      <p className="border-t-2 border-gray-900 text-center text-sm font-semibold">
                        Witness {witness} Signature
                      </p>
                      <p className="text-center text-xs text-gray-600 mt-1">_________________</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
            <div className="relative w-32 h-32">
              {/* Embossed shadow layer for depth */}
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  backgroundColor: stampColor,
                  opacity: 0.2,
                  transform: "scale(1.1)",
                }}
              />

              {/* Main seal stamp SVG */}
              <svg
                className="absolute inset-0 w-full h-full drop-shadow-lg"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="sealGradient" cx="40%" cy="40%">
                    <stop offset="0%" stopColor={stampColor} stopOpacity="0.9" />
                    <stop offset="70%" stopColor={stampColor} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={stampColor} stopOpacity="0.5" />
                  </radialGradient>

                  {/* Serrated edge pattern */}
                  <filter id="sealShadow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                    <feOffset dx="1" dy="1" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer serrated circle */}
                <circle cx="60" cy="60" r="55" fill="none" stroke={stampColor} strokeWidth="2.5" opacity="0.8" />

                {/* Decorative rings */}
                <circle cx="60" cy="60" r="50" fill="none" stroke={stampColor} strokeWidth="0.8" opacity="0.6" />
                <circle cx="60" cy="60" r="45" fill="none" stroke={stampColor} strokeWidth="0.8" opacity="0.6" />

                {/* Main seal circle with gradient */}
                <circle cx="60" cy="60" r="38" fill="url(#sealGradient)" filter="url(#sealShadow)" />

                {/* Inner highlight for embossed effect */}
                <circle cx="60" cy="60" r="35" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />

                {/* Seal text with shadow */}
                <text
                  x="60"
                  y="68"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="serif"
                  letterSpacing="1.5"
                  opacity="0.95"
                >
                  OFFICIAL
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
