import { apiBuilder } from "@zodios/core";

import { createItem } from "@/zodios/items/itemsCrud";

const itemsApi = apiBuilder()
    .addEndpoint(createItem)
    .build();

export default itemsApi;
