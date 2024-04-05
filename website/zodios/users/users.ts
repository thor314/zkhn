import { makeEndpoint, makeErrors, parametersBuilder } from "@zodios/core";
import z from "zod";

const errors = makeErrors([
    {
        status: "default",
        schema: z.object({
            code: z.number(),
            error: z.string(),
        }),
    },
]);

export const createUser = makeEndpoint({
    method: "post",
    path: "/users",
    alias: "createUser",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                username: z.string(),
                password: z.string(),
                email: z.string().email().optional(),
                about: z.string().optional(),
            })
        )
        .build(),
    response: z.object({
        success: z.literal(true),
        username: z.string(),
        auth_token: z.string(),
        auth_token_expiration_timestamp: z.string().datetime(),
    }),
    errors,
});

export const login = makeEndpoint({
    method: "post",
    path: "/users/login",
    alias: "login",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                username: z.string(),
                password: z.string(),
                next: z.string().or(z.null()).default(null),
            })
        )
        .build(),
    response: z.literal(""),
    errors,
});

export const logout = makeEndpoint({
    method: "post",
    path: "/users/logout",
    alias: "logout",
    parameters: parametersBuilder()
        .addBody(z.object({}))
        .build(),
    response: z.object({}),
    errors,
});

export const authenticate = makeEndpoint({
    method: "get",
    path: "/users/authenticate",
    alias: "authenticate",
    response: z.object({
        banned: z.boolean(),
        containsEmail: z.boolean(),
        isModerator: z.boolean(),
        karma: z.number(),
        showDead: z.boolean(),
        username: z.string(),
    }),
    errors,
});
