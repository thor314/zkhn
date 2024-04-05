import { makeApi } from "@zodios/core";

import { createUser, login, authenticate } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login, authenticate]);

export default usersApi;
