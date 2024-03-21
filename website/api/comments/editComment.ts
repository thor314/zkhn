import axios from "axios";

import apiBaseUrl from "@/utils/apiBaseUrl";

export default function editComment(id, newCommentText: string, callback) {
    axios
        .put(
            apiBaseUrl + "/comments/edit-comment",
            {
                id: id,
                newCommentText: newCommentText,
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
