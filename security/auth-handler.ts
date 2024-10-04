import { setToken } from "@/services/client-side/axios.config";
import { TokenProps } from "@/types/componentTypes";
import { logInfo } from "@/utils/log-helper";

export const authHandler = (token?: TokenProps) => {
    if (!token) {
        logInfo("Header", {
            token
        });
    } else {
        setToken(token ? token.tokenValue : "");
        if (!token.tokenName || !token.tokenValue) {
            logInfo("Header", {
                tokenName: token.tokenName,
                tokenValue: token.tokenValue,
            });
        }
    }
}