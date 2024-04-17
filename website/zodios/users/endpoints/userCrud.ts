import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";
import { AuthUserUnauthenticatedSchema, AuthUserAuthenticatedSchema } from "@/zodios/utilities/schemas";

export const createUser = makeEndpoint({
    method: "post",
    path: "",
    alias: "createUser",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                username: z.string(),
                password: z.string(),
                email: z.string().optional(),
                about: z.string().optional(),
            })
        )
        .build(),
    response: z.literal(""),
    errors: genericError,
});

export const getUser = makeEndpoint({
    method: "get",
    path: "/:username",
    alias: "getUser",
    response: z.object({
        about: z
            .string()
            .or(z.null())
            .transform((about) => about ?? ""),
        authUser: AuthUserUnauthenticatedSchema
            .transform((authUser) => ({ ...authUser, isModerator: false }))
            .or(AuthUserAuthenticatedSchema),
        banned: z.boolean(),
        created: z.string().datetime(),
        email: z
            .string()
            .or(z.null())
            .transform((email) => email ?? ""),
        karma: z.number().int(),
        showDead: z
            .boolean()
            .or(z.null())
            .transform((showDead) => showDead ?? false),
        showPrivateUserData: z.boolean(),
        username: z.string(),
    }),
    errors: genericError,
});

export const updateUser = makeEndpoint({
    method: "put",
    path: "",
    alias: "updateUser",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                about: z.string(),
                email: z.string(),
                showDead: z.boolean(),
            })
        )
        .build(),
    response: z.literal(""),
    errors: genericError,
});
