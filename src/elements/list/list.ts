import { LitElement, html, property } from "@polymer/lit-element";
import { api } from "../../api/api";
import { css } from "../../utils/css";
import { Translations } from "../../utils/translations";
import { repeat } from "lit-html/directives/repeat";

import "./list-item";

class ListElement extends LitElement {
    @property()
    totalResults = 0;

    @property()
    articles: IArticle[] = [];

    fetching = true;

    constructor() {
        super();

        api.getNews()
            .then(res => {
                this.totalResults = res.totalResults;
                this.articles = res.articles;
                this.fetching = false;
            });
    }

    loadMore = () => {
        if(!this.fetching) {
            this.fetching = true;
    
            api.getNews(this.articles.length / 20 + 1)
                .then(res => {
                    this.totalResults = res.totalResults;
                    this.articles = this.articles.concat(res.articles);
                    this.fetching = false;
                });
        }
    }

    render() {
        const { totalResults, articles, loadMore } = this;
        return html`
            ${css}
            <div class="list">
                <h1>${Translations.list.news}</h1>
            
                <div class="list__items">
                    ${repeat(articles, item => item.source.id, item => html`
                        <app-list-item .item=${item}></app-list-item>
                    `)}
                </div>
            
                ${articles.length !== totalResults ? html`
                    <div class="list__load-more">
                        <div class="list__progress-text">
                            ${Translations.list.showing} ${articles.length} ${Translations.list.of} ${totalResults}
                        </div>
                
                        <button class="btn" @click=${loadMore}>
                            ${Translations.list.loadMore}
                        </button>
                    </div>
                ` : ""}
            </div>
        `;
    }
}

customElements.define("app-list", ListElement);