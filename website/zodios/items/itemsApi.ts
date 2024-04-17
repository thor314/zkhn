import { apiBuilder } from "@zodios/core";

import { createItem, getItem } from "@/zodios/items/itemsCrud";

const itemsApi = apiBuilder()
    .addEndpoint(createItem)
    .addEndpoint(getItem)
    .build();

export default itemsApi;
