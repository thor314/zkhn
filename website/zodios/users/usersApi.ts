import { makeApi } from "@zodios/core";

import { createUser, login, logout, authenticate, getUser } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login, logout, authenticate, getUser]);

export default usersApi;
