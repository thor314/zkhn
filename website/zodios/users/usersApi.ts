import { makeApi } from "@zodios/core";

import { createUser, login, logout, authenticate, changePassword, getUser } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login, logout, authenticate, changePassword, getUser]);

export default usersApi;
