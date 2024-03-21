import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function resetPassword(username: string, newPassword: string, resetToken, callback) {
    axios
        .put(apiBaseUrl + "/users/reset-password", {
            username: username,
            newPassword: newPassword,
            resetToken: resetToken,
        })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}
