import { Zodios } from "@zodios/core";

import API_BASE_URL from "@/zodios/baseURL";
import usersApi from "@/zodios/users/usersApi";
import withCredentialsPlugin from "@/zodios/withCredentialsPlugin";
import loggerPlugin from "@/zodios/loggerPlugin";

const apiClient = new Zodios(API_BASE_URL, usersApi);
apiClient.use(withCredentialsPlugin);
apiClient.use(loggerPlugin);

export default apiClient;
