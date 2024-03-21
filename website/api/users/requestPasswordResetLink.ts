import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function requestPasswordResetLink(username: string, callback) {
    axios
        .put(apiBaseUrl + "/users/request-password-reset-link", {
            username: username,
        })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}
