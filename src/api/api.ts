import { API_KEY } from "./api.key";

import { get, set } from "idb-keyval";

export class Api {
    private static _apiUrl(endpoint: string, page: number, query?: string) {
        return `https://newsapi.org/v2/${endpoint}?apiKey=${API_KEY}&page=${page}${query ? "&q=" + query : ""}`;
    }

    static async getNews(page = 1, query = "*") {
        const stored = await get("news");
        if(stored) {
            return stored as Promise<IResponse>;
        }
        const res = await fetch(this._apiUrl("everything", page, query));
        const json = await res.json() as Promise<IResponse>;
        set("news", json);
        return json;
    }
}