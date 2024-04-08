import { makeApi } from "@zodios/core";

import { createUser, login, logout, authenticate, changePassword, getUser, updateUser } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login, logout, authenticate, changePassword, getUser, updateUser]);

export default usersApi;
