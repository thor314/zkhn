import { type ZodiosPlugin } from "@zodios/core";

const logger: ZodiosPlugin = {
    name: "logger",
    request: (async (api, config) => {
        console.log(config);
        return config;
    }),
    response: (async (api, config, response) => {
        console.log(response);
        return response;
    }),
    error: (async (api, config, error) => {
        console.log(error);
        throw error;
    }),
}

export default logger;
