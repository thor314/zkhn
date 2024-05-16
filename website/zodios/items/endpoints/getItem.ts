import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";
import { AuthUserAuthenticatedSchema, AuthUserUnauthenticatedSchema, ItemDataSchema } from "@/zodios/utilities/schemas";

const BaseGetItemResponseSchema = z.object({ item: ItemDataSchema });

const AuthenticatedGetItemResponseSchema = z
    .object({
        authUser: AuthUserAuthenticatedSchema,
        withComments: z.object({
            authenticatedItemData: z.object({
                editAndDeleteAllowed: z.boolean(),
                favoritedByUser: z.boolean(),
                votedOnByUser: z.boolean(),
            }),
            comments: z.array(z.object({})),
            isMoreComments: z.boolean(),
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
        withComments: z.null().transform(_ => ({
            authenticatedItemData: {
                editAndDeleteAllowed: null,
                favoritedByUser: null,
                votedOnByUser: null,
            },
            comments: [],           // Placeholder for actual comments that should come back when unauthenticated
            isMoreComments: false,
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
