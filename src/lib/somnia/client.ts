import { createPublicClient, http, defineChain } from "viem";
import { somniaTestnet } from "viem/chains";

export function getSomniaPublicClient() {
    return createPublicClient({
        chain: somniaTestnet,
        transport: http(process.env.NEXT_PUBLIC_SOMNIA_RPC_URL),
    });
}
