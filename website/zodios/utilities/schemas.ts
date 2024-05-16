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

const LinkItemSubSchema = z.object({
    text: z.null(),
    url: z.string(),
    domain: z.string(),
});

const TextItemSubSchema = z.object({
    text: z.string(),
    url: z.null(),
    domain: z.null(),
});

export const ItemDataSchema = z.object({
    commentCount: z.number(),
    created: z.string(),
    dead: z.boolean(),
    id: z.string(),
    itemCategory: z.union([
        z.literal("tweet"),
        z.literal("blog"),
        z.literal("paper"),
        z.literal("other"),
    ]),
    itemType: z.union([
        z.literal("news"),
        z.literal("show"),
        z.literal("ask"),
    ]),
    points: z.number(),
    score: z.number(),
    title: z.string(),
    username: z.string(),
}).and(LinkItemSubSchema.or(TextItemSubSchema));

export type ItemData = z.infer<typeof ItemDataSchema>;
