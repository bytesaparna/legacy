export namespace PRIMITIVE {

    export const getAllKeys = () => {
        return {
            all_keys: {}
        };
    };

    export type GetAllKeysResponse = string[];

    export const getValue = (key: string) => {
        return {
            get_value: {
                key: key
            }
        }
    }
    export type DecimalResponse = { value: { decimal: string } }
    export type StringResponse = { value: { string: string } }
    export type UintResponse = { value: { uint128: string } }
    export type GetValueResponse = { key: string, value: DecimalResponse | StringResponse | UintResponse}


    export const isStringValueResponse = (value: GetValueResponse['value']) => {
        return "string" in value;
    }

}

