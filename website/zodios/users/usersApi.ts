import { apiBuilder } from "@zodios/core";

import { createUser, getUser, updateUser } from "@/zodios/users/endpoints/userCrud";
import {
    login,
    logout,
    authenticate,
    requestPasswordReset,
    changePassword,
} from "@/zodios/users/endpoints/userAuth";

const usersApi = apiBuilder()
    .addEndpoint(createUser)
    .addEndpoint(getUser)
    .addEndpoint(updateUser)
    .addEndpoint(login)
    .addEndpoint(logout)
    .addEndpoint(authenticate)
    .addEndpoint(requestPasswordReset)
    .addEndpoint(changePassword)
    .build();

export default usersApi;
