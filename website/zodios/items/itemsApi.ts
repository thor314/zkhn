import { apiBuilder } from "@zodios/core";

import { createItem } from "@/zodios/items/endpoints/createItem";
import { getItem } from "@/zodios/items/endpoints/getItem";

const itemsApi = apiBuilder()
    .addEndpoint(createItem)
    .addEndpoint(getItem)
    .build();

export default itemsApi;
