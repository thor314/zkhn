import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function logoutUser(callback) {
    axios
        .put(`${apiBaseUrl}/users/logout`, {}, { withCredentials: true })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ success: false });
        });
}
