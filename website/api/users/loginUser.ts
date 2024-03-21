import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function loginUser(username: string, password: string, callback) {
    axios
        .put(
            `${apiBaseUrl}/users/login`,
            {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
            }
        )
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}
