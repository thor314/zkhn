import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl";

export default function submitNewItem(title: string, url, text: string, category, callback) {
    axios
        .post(
            apiBaseUrl + "/items/submit-new-item",
            {
                title: title,
                url: url,
                text: text,
                category: category,
            },
            {
                withCredentials: true,
            }
        )
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.error("An error occurred while submitting the new item:", error);
            callback({ submitError: true });
        });
}
