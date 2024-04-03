import { makeApi } from "@zodios/core";

import { createUser, login } from "@/zodios/users/users";

const usersApi = makeApi([createUser, login]);

export default usersApi;
