import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function changePassword(currentPassword: string, newPassword: string, callback) {
    axios
        .put(
            apiBaseUrl + "/users/change-password",
            {
                currentPassword: currentPassword,
                newPassword: newPassword,
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
