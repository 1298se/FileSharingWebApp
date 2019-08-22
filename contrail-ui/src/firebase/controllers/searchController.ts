import axios from "axios";
import { ISuggestion } from "../../components/resources/share-dialog/shareDialog.types";

export const searchUsers = (query: string): Promise<any> => {
    const searchUrl = `/search?where_query=${query}`;
    return new Promise((resolve, reject) => {
        axios.get("/api" + searchUrl)
            .then((response) => {
                const newOptions: ISuggestion[] = [];
                response.data.map((user: firebase.User) => {
                    if (user.email && user.displayName) {
                        newOptions.push({
                            id: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                        });
                    }
                });
                resolve(newOptions);
            })
            .catch((error) => {
                reject(error.response.data.message);
            });
    });
};
