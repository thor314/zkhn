import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";
import { AuthUserAuthenticatedSchema, AuthUserUnauthenticatedSchema, ItemDataSchema } from "@/zodios/utilities/schemas";

const BaseGetItemResponseSchema = z.object({
    comments: z.array(z.object({})), // TODO: replace with schema when available
    isMoreComments: z.boolean(),
    item: ItemDataSchema,
});

const AuthenticatedGetItemResponseSchema = z
    .object({
        authUser: AuthUserAuthenticatedSchema,
        authenticatedItemData: z.object({
            editAndDeleteExpired: z.boolean(),
            favoritedByUser: z.boolean(),
            unvoteExpired: z.boolean(),
            votedOnByUser: z.boolean(),
        }),
    })
    .merge(BaseGetItemResponseSchema);

const UnauthenticatedGetItemResponseSchema = z
    .object({
        authUser: AuthUserUnauthenticatedSchema
            .transform((authUser) => ({ 
                ...authUser,
                isModerator: false
            })),
        authenticatedItemData: z.null()
            .transform(_ => ({
                editAndDeleteExpired: null,
                favoritedByUser: null,
                unvoteExpired: null,
                votedOnByUser: null,
            })),
    })
    .merge(BaseGetItemResponseSchema);

export const getItem = makeEndpoint({
    method: "get",
    path: "/:itemId",
    alias: "getItem",
    parameters: parametersBuilder()
        .addQueries({
            page: z.number().int().positive(),
        })
        .build(),
    response: UnauthenticatedGetItemResponseSchema
        .or(AuthenticatedGetItemResponseSchema),
    errors: genericError,
});
