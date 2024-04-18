import { apiBuilder } from "@zodios/core";

import { createItem } from "@/zodios/items/endpoints/createItem";
import { getItem } from "@/zodios/items/endpoints/getItem";
import { updateItemVote } from "@/zodios/items/endpoints/updateItemVote";

const itemsApi = apiBuilder()
    .addEndpoint(createItem)
    .addEndpoint(getItem)
    .addEndpoint(updateItemVote)
    .build();

export default itemsApi;
