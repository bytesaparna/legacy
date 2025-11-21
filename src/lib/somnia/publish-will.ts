import { getSomniaPublicClient } from "./client";
import { SDK, SchemaEncoder } from "@somnia-chain/streams";
import { WILL_SCHEMA } from "./schema";
import { WillData } from "@/zustand/will-data";
import type { WalletClient } from "viem";

export async function publishWill(walletClient: WalletClient | undefined, willData: WillData) {
    if (!walletClient) {
        throw new Error("Wallet client is required to publish will");
    }

    const publicClient = getSomniaPublicClient();
    const sdk = new SDK({ public: publicClient, wallet: walletClient });
    
    // Compute schema ID
    const willSchemaId = await sdk.streams.computeSchemaId(WILL_SCHEMA);

    if (!willSchemaId) {
        throw new Error("Failed to compute will schema ID");
    }
    
    const schemaEncoder = new SchemaEncoder(WILL_SCHEMA);

    const willId = `will-${Date.now()}`;
    const encodedWillData = JSON.stringify(willData); // storing as JSON blob
    
    const data = schemaEncoder.encodeData([
        { name: "willId", value: willId, type: "string" },
        { name: "fullName", value: willData.personalInfo.fullName, type: "string" },
        { name: "dateOfBirth", value: willData.personalInfo.dateOfBirth, type: "string" },
        { name: "maritalStatus", value: willData.personalInfo.maritalStatus, type: "string" },
        { name: "encodedData", value: encodedWillData, type: "string" },
        { name: "timestamp", value: BigInt(Math.floor(Date.now() / 1000)), type: "uint256" },
    ]);

    const tx = await sdk.streams.set([
        {
            id: `0x${Buffer.from(willId).toString("hex").padEnd(64, "0")}`,
            schemaId: willSchemaId,
            data,
        },
    ]);

    return { tx, willId, encodedWillData, data };
}
