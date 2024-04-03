import { makeEndpoint, makeErrors } from "@zodios/core";
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
    parameters: [
        {
            name: "createUser",
            type: "Body",
            schema: z.object({
                username: z.string(),
                password: z.string(),
                email: z.string().email().optional(),
                about: z.string().optional(),
            }),
        },
    ],
    response: z.object({
        success: z.literal(true),
        username: z.string(),
        auth_token: z.string(),
        auth_token_expiration_timestamp: z.string().transform((timestamp) => new Date(timestamp)),
    }),
    errors,
});

export const login = makeEndpoint({
    method: "post",
    path: "/users/login",
    alias: "login",
    parameters: [
        {
            name: "login",
            type: "Body",
            schema: z.object({
                username: z.string(),
                password: z.string(),
                next: z.string().or(z.literal(null)).default(null),
            }),
        },
    ],
    response: z.object({}),
    errors,
});
