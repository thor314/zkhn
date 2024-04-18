import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";

const FavoriteStateSchema = z.union([
    z.literal("favorite"),
    z.literal("none"),
]);

export const updateItemFavorite = makeEndpoint({
    method: "post",
    path: "/favorite",
    alias: "updateItemFavorite",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                favorite: FavoriteStateSchema,
                id: z.string(),
            })
        )
        .build(),
    response: FavoriteStateSchema,
    errors: genericError,
});
