import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default async function getUserData(username: string, req) {
    try {
        const cookie = req.headers.cookie ? req.headers.cookie : "";

        const response = await axios({
            url: `${apiBaseUrl}/users/get-user-data?username=${username}`,
            headers: req ? { cookie: cookie } : "",
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return { getDataError: true };
    }
}
