import z from "zod";

const envVariablesSchema = z.object({
    DEVELOPMENT_API_URL: z.string(),
    PRODUCTION_API_URL: z.string(),
    ALGOLIA_APP_ID: z.string(),
    ALGOLIA_PUBLIC_API_KEY: z.string(),
});

envVariablesSchema.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
    }
}
