import { createTRPCRouter } from "../trpc";
import { chainConfigRouter } from "./chain";
import { kernelRouter } from "./os/kernel";
import { vfsRouter } from "./os/vfs";
import { appContractRouter } from "./ados/app-contract";
import { assetsRouter } from "./assets";
import { cw721Router } from "./cw721";
import { cw20Router } from "./cw20";
import { primitiveRouter } from "./primitive";
import { exchangeRouter } from "./exchange";
import { auctionRouter } from "./auction";
export const appRouter = createTRPCRouter({
  chainConfig: chainConfigRouter,
  kernel: kernelRouter,
  vfs: vfsRouter,
  appContract: appContractRouter,
  assets: assetsRouter,
  cw721: cw721Router,
  cw20: cw20Router,
  primitive: primitiveRouter,
  exchange: exchangeRouter,
  auction :auctionRouter,
});

export type AppRouter = typeof appRouter;
