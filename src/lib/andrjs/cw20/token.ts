export namespace CW20_TOKENS {

    export const getTotalSupply = () => {
        return {
            token_info: {}
        };
    };

    export type GetTotalSupplyResponse = { total_supply: number, decimals: number };

    export interface GetAllAccountsLimit {
        limit: number
    }

    export function getAllCountsLimit(value?: GetAllAccountsLimit): GetAllAccountsLimit {
        return {
            limit: value?.limit ?? 25
        }
    }
    export const getAllAccounts = (limitValue: GetAllAccountsLimit) => {
        return {
            all_accounts: {
                limit: limitValue.limit
            }
        };
    };

    export type GetAllAccountsResponse = { accounts: string[] }



    export const getBalance = (address: string) => {
        return {
            balance: {
                address: address
            }
        }
    }

    export type GetBalanceResponse = { balance: number }

}
