# Legacy - Decentralized Will Management Platform

<p align="center">
  <img src="/public/legacy.png" width="200" alt="Legacy">
</p>

## About

**Legacy** is a Web3 dApp built on Somnia Testnet that enables users to create, manage, and publish their last will and testaments on the blockchain using Somnia Data Streams SDK. The platform provides immutable, verifiable, and accessible will management with real-time blockchain integration.
<p align="center">
  <img src="/public/legacy-home.png" width="200" alt="Legacy">
</p>
<p align="center">
  <img src="/public/will.png" width="200" alt="Legacy">
</p>

## 🚀 Features

- **Secure Will Creation**: Multi-step wizard for creating comprehensive wills
- **Asset Management**: Track traditional and on-chain assets
- **Beneficiary Management**: Assign beneficiaries with percentage shares
- **Blockchain Publishing**: Publish wills to Somnia Testnet using Data Streams SDK
- **Real-Time Verification**: View transactions on Shannon Explorer
- **Dashboard**: Manage multiple wills in one place
- **Automated Wellness Checks**: Weekly email reminders via n8n workflows to verify user status and prompt will updates

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Wallet (MetaMask, WalletConnect compatible)
- Somnia Testnet RPC URL


## 🔧 Environment Variables

```env
# Database
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-direct-postgresql-connection-string"

# Somnia
NEXT_PUBLIC_SOMNIA_RPC_URL="https://rpc.somnia.network"

# WalletConnect
NEXT_PUBLIC_PROJECT_ID="your-walletconnect-project-id"
```

## 🏗️ Somnia Data Streams SDK Integration

### How We Use Data Streams

Legacy leverages Somnia Data Streams SDK to create structured, immutable will records on the blockchain:

#### 1. **Schema Definition**
We define a custom schema for will data:
```typescript
export const WILL_SCHEMA = "string willId,string fullName,string dateOfBirth,string maritalStatus,string encodedData,uint256 timestamp";
```

#### 2. **Data Publishing**
Wills are published using the SDK's streaming capabilities:
```typescript
import { SDK, SchemaEncoder } from "@somnia-chain/streams";

const sdk = new SDK({ public: publicClient, wallet: walletClient });
const willSchemaId = await sdk.streams.computeSchemaId(WILL_SCHEMA);
const schemaEncoder = new SchemaEncoder(WILL_SCHEMA);

const data = schemaEncoder.encodeData([
  { name: "willId", value: willId, type: "string" },
  { name: "fullName", value: willData.personalInfo.fullName, type: "string" },
  { name: "dateOfBirth", value: willData.personalInfo.dateOfBirth, type: "string" },
  { name: "maritalStatus", value: willData.personalInfo.maritalStatus, type: "string" },
  { name: "encodedData", value: encodedWillData, type: "string" },
  { name: "timestamp", value: BigInt(Math.floor(Date.now() / 1000)), type: "uint256" },
]);

const tx = await sdk.streams.set([{
  id: `0x${Buffer.from(willId).toString("hex").padEnd(64, "0")}`,
  schemaId: willSchemaId,
  data,
}]);
```

#### 3. **Real-Time Features**
- **Transaction Monitoring**: Real-time transaction hash updates
- **Status Synchronization**: Database updates after blockchain confirmation
- **Explorer Integration**: Direct links to view transactions on Shannon Explorer

### Key Implementation Files

- `src/lib/somnia/publish-will.ts` - Core SDK integration for publishing wills
- `src/lib/somnia/client.ts` - Somnia Testnet client configuration
- `src/lib/somnia/schema.ts` - Data stream schema definition

## 📁 Project Structure

```
legacy/
├── app/                    # Next.js app router
│   ├── (app)/              # App routes
│   │   ├── dashboard/      # Dashboard page
│   │   └── will-builder/   # Will creation flow
│   └── api/                # API routes
│       └── trpc/           # tRPC endpoints
├── src/
│   ├── components/         # React components
│   │   ├── will-builder/   # Will creation components
│   │   ├── dashboard/      # Dashboard components
│   │   └── ui/             # UI components
│   ├── lib/
│   │   └── somnia/         # Somnia SDK integration
│   ├── server/             # Server-side code
│   │   └── will/           # Will API routes
│   └── zustand/            # State management
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static assets
```

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SOMNIA_RPC_URL`
- `NEXT_PUBLIC_PROJECT_ID`

## 🔗 Links

- **Live Demo**: https://legacy-lit.vercel.app
- **Github Link**: https://github.com/bytesaparna/legacy
- **Demo Video**: https://drive.google.com/drive/folders/1XiCJ2CmLvbqoBPSEkWjRrDdg972V3wH7?usp=sharing

## 🛡️ Security

- Wills are encrypted before blockchain storage
- Private keys never leave the user's wallet
- All transactions require explicit user approval
- Database stores only metadata, not sensitive will content

---
