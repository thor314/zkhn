import { makeApi } from "@zodios/core";

import { createUser, login, logout, authenticate } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login, logout, authenticate]);

export default usersApi;
