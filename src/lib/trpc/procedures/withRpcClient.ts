import { t } from "../trpc";
import { RpcClient } from "@/lib/andrjs/rpc-client/client";

const cachedRpcClients: {
  [url: string]: Promise<RpcClient>;
} = {};

/**
 * Middleware to add rpc client to the context.
 * Adds a required chainId to the input and adds the chain config to the context.
 */
export const withRpcClient = t.procedure.use(async ({ ctx, next }) => {
  const getRpcClient = async (chainIdentifier: string) => {
    const chainConfig = ctx.chainList.find(
      (c) => c.chainId === chainIdentifier || c.name === chainIdentifier,
    );
    if (!chainConfig) {
      throw new Error(`Chain config not found for ${chainIdentifier}`);
    }
    // Cache rpc client and try to reuse it
    let rpcClientPromise = cachedRpcClients[chainConfig.chainUrl];
    if (!rpcClientPromise) {
      rpcClientPromise = RpcClient.connect({
        url: chainConfig.chainUrl,
        batch: 10,
        batchInterval: 500,
      });
      cachedRpcClients[chainConfig.chainUrl] = rpcClientPromise;
    }
    const rpcClient = await rpcClientPromise;
    return rpcClient;
  };
  return next({ ctx: { ...ctx, getRpcClient } });
});
