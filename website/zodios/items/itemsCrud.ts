import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";

export const createItem = makeEndpoint({
    method: "post",
    path: "",
    alias: "createItem",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                title: z.string(),
                itemType: z.string().optional().transform(type => type ?? 'news'),
                itemCategory: z.string(),
                textOrUrlContent: 
                    z.object({
                        url: z.string(),
                    }).or(z.object({
                        text: z.string(),
                    })),
            })
        )
        .build(),
    response: z.string(),
    errors: genericError,
});
