import { makeEndpoint, parametersBuilder } from "@zodios/core";
import z from "zod";

import genericError from "@/zodios/utilities/genericError";

const VoteStateSchema = z.union([
    z.literal("Upvote"),
    z.literal("Downvote"),
    z.literal("None"),
]);

export const updateItemVote = makeEndpoint({
    method: "post",
    path: "/vote",
    alias: "updateItemVote",
    parameters: parametersBuilder()
        .addBody(
            z.object({
                contentId: z.string(),
                voteState: VoteStateSchema,
            })
        )
        .build(),
    response: VoteStateSchema,
    errors: genericError,
});
