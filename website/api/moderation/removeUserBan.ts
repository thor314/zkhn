import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function removeUserBan(username: string, callback) {
    axios
        .put(
            apiBaseUrl + "/moderation/remove-user-ban",
            {
                username: username,
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
