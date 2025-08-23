import { Uint128 } from "@andromedaprotocol/andromeda.js/dist/api/codegen/AdodbContractTs.types";

export namespace EXCHANGE {

    export type NativeDenom = {
        native: string
    }
    export type Cw20Denom = {
        cw20: string
    }
    export type Denom = NativeDenom | Cw20Denom;

    export const getDenomTypeFromString = (denom: string) => {
        if (denom.startsWith('native:')) {
            return {
                native: denom.replace('native:', '')
            } as NativeDenom
        } else if (denom.startsWith('cw20:')) {
            return {
                cw20: denom.replace('cw20:', '')
            } as Cw20Denom
        }
        throw new Error("Invalid Type")
    }


    export const getSaleInfo = (denom: string) => {
        const asset = getDenomTypeFromString(denom)
        return {
            sale: {
                asset
            }
        };
    };

    export type GetSaleResponse = {
        sale: {
            exchange_rate: Uint128;
            amount: Uint128;
            recipient: string;
            start_time: string;
            end_time: string;
            start_amount: Uint128;
        } | null
    };

}

