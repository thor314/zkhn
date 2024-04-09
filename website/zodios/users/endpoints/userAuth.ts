import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";
import { AuthUserAuthenticatedSchema, BaseChangePasswordRequestSchema } from "@/zodios/users/schemas";

export const login = makeEndpoint({
    method: "post",
    path: "/login",
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
    errors: genericError,
});

export const logout = makeEndpoint({
    method: "post",
    path: "/logout",
    alias: "logout",
    parameters: parametersBuilder().addBody(z.object({})).build(),
    response: z.object({}),
    errors: genericError,
});

export const authenticate = makeEndpoint({
    method: "get",
    path: "/authenticate",
    alias: "authenticate",
    response: z.object({
        banned: z.boolean(),
        containsEmail: z.boolean(),
        isModerator: z.boolean(),
        karma: z.number(),
        showDead: z.boolean(),
        username: z.string(),
        authUser: AuthUserAuthenticatedSchema,
    }),
    errors: genericError,
});

export const requestPasswordReset = makeEndpoint({
    method: "put",
    path: "/reset-password-link/:username",
    alias: "requestPasswordReset",
    parameters: parametersBuilder().addBody(z.object({})).build(),
    response: z.literal(""),
    errors: genericError,
});

export const changePassword = makeEndpoint({
    method: "put",
    path: "/change-password",
    alias: "changePassword",
    parameters: parametersBuilder()
        .addBody(
            BaseChangePasswordRequestSchema.merge(
                z
                    .object({
                        currentPassword: z.string(),
                    })
                    .strict()
            ).or(
                BaseChangePasswordRequestSchema.merge(
                    z.object({
                        resetPasswordToken: z.string(),
                    })
                ).strict()
            )
        )
        .build(),
    response: z.literal(""),
    errors: genericError,
});
