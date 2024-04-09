import { Zodios, mergeApis } from "@zodios/core";

import usersApi from "@/zodios/users/usersApi";
import API_BASE_URL from "@/zodios/utilities/apiBaseURL";

import withCredentialsPlugin from "@/zodios/plugins/withCredentialsPlugin";
import loggerPlugin from "@/zodios/plugins/loggerPlugin";

const api = mergeApis({
    "/users": usersApi,
});

const apiClient = new Zodios(API_BASE_URL, api);
apiClient.use(withCredentialsPlugin);
apiClient.use(loggerPlugin);

export default apiClient;
