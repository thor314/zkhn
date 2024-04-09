import { makeErrors } from "@zodios/core";
import z from "zod";

const genericError = makeErrors([
    {
        status: "default",
        schema: z.object({
            code: z.number(),
            error: z.string(),
        }),
    },
]);

export default genericError;
