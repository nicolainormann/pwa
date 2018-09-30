import { API_KEY } from "./api.key";

export class Api {
    private static _apiUrl(endpoint: string, page: number, query?: string) {
        return `https://newsapi.org/v2/${endpoint}?apiKey=${API_KEY}&page=${page}${query ? "&q=" + query : ""}`;
    }

    static getNews(page = 1, query = "*") {
        return fetch(this._apiUrl("everything", page, query))
            .then(res => res.json() as Promise<IResponse>);
    }
}