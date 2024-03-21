import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function createNewUser(username: string, password: string, callback) {
    axios
        .post(
            apiBaseUrl + "/users/create-new-user",
            { username: username, password: password },
            { withCredentials: true }
        )
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            callback({ submitError: true });
        });
}
