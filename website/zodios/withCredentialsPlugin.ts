import { type ZodiosPlugin } from "@zodios/core";

const withCredentials: ZodiosPlugin = {
    name: "withCredentials",
    request: (async (api, config) => {
        return {
            ...config,
            withCredentials: true,
        }
    })
}

export default withCredentials;
