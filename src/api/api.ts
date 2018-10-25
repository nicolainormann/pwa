import { API_KEY } from "./api.key";

import { get, set } from "idb-keyval";

class Api {
    private _apiUrl(endpoint: string, page: number, query?: string) {
        return `https://newsapi.org/v2/${endpoint}?apiKey=${API_KEY}&page=${page}${query ? "&q=" + query : ""}`;
    }

    async getNews(page = 1, query = "*") {
        const key = `news-${page}-${query}`;
        const stored = await get(key);
        if(stored) {
            return stored as Promise<IResponse>;
        }
        
        const res = await fetch(this._apiUrl("everything", page, query));
        const json = await res.json() as Promise<IResponse>;
        set(key, json);
        return json;
    }
}

export const api = new Api();