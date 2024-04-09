import z from "zod";

export const AuthUserAuthenticatedSchema = z.object({
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

export const AuthUserUnauthenticatedSchema = z.object({
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

export const BaseChangePasswordRequestSchema = z.object({
    username: z.string(),
    newPassword: z.string(),
});
