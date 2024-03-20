import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl";

export default function editItem(id, newItemTitle, newItemText, newItemCategory, callback) {
    axios
        .put(
            apiBaseUrl + "/items/edit-item",
            {
                id: id,
                newItemTitle: newItemTitle,
                newItemText: newItemText,
                newItemCategory: newItemCategory,
            },
            {
                withCredentials: true,
            },
        )
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}
