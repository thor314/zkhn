import { apiBuilder } from "@zodios/core";

import { createItem } from "@/zodios/items/endpoints/createItem";
import { getItem } from "@/zodios/items/endpoints/getItem";
import { updateItemVote } from "@/zodios/items/endpoints/updateItemVote";
import { updateItemFavorite } from "@/zodios/items/endpoints/updateItemFavorite";

const itemsApi = apiBuilder()
    .addEndpoint(createItem)
    .addEndpoint(getItem)
    .addEndpoint(updateItemVote)
    .addEndpoint(updateItemFavorite)
    .build();

export default itemsApi;
