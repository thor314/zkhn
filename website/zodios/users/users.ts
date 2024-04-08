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
    response: z.literal(""),
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

const AuthUserAuthenticatedSchema = z.object({
    userSignedIn: z.literal(true),
    username: z.string(),
    karma: z.number().int(),
    containsEmail: z.boolean(),
    showDead: z.boolean(),
    showDownvote: z.boolean(),
    isModerator: z.boolean(),
    banned: z.boolean(),
    cookiesIncluded: z.literal(true),
});

const AuthUserUnauthenticatedSchema = z.object({
    userSignedIn: z.literal(false),
    username: z.null(),
    karma: z.null(),
    containsEmail: z.null(),
    showDead: z.literal(false),
    showDownvote: z.literal(false),
    isModerator: z.null(),
    banned: z.literal(false),
    cookiesIncluded: z.literal(false),
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
        authUser: AuthUserAuthenticatedSchema,
    }),
    errors,
});

const BaseChangePasswordRequestSchema = z.object({
    username: z.string(),
    newPassword: z.string(),
});

export const changePassword = makeEndpoint({
    method: "put",
    path: "/users/change-password",
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
    errors,
});

export const getUser = makeEndpoint({
    method: "get",
    path: "/users/:username",
    alias: "getUser",
    response: z.object({
        about: z.string().or(z.null()),
        authUser: AuthUserUnauthenticatedSchema.or(AuthUserAuthenticatedSchema),
        banned: z.boolean(),
        created: z.string().datetime(),
        email: z.string().email().or(z.null()),
        karma: z.number().int(),
        showDead: z.boolean().or(z.null()),
        showPrivateUserData: z.boolean(),
        username: z.string(),
    }),
    errors,
});
