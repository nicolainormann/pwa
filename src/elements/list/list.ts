import { LitElement, html, property } from "@polymer/lit-element";
import { Api } from "../../api/api";
import { css } from "../../utils/css";
import { Translations } from "../../utils/translations";

import "./list-item";

class ListElement extends LitElement {
    @property()
    totalResults = 0;

    @property()
    articles: IArticle[] = [];

    fetching = true;

    constructor() {
        super();

        Api.getNews()
            .then(res => {
                this.totalResults = res.totalResults;
                this.articles = res.articles;
                this.fetching = false;
            });
    }

    loadMore = () => {
        if(!this.fetching) {
            this.fetching = true;
    
            Api.getNews(this.articles.length / 20 + 1)
                .then(res => {
                    this.totalResults = res.totalResults;
                    this.articles = this.articles.concat(res.articles);
                    this.fetching = false;
                });
        }
    }

    render() {
        return html`
            ${css}
            <div class="list">
                <h1>${Translations.list.news}</h1>
            
                <div class="list__items">
                    ${this.articles.map(item => html`
                        <app-list-item .item=${item}></app-list-item>
                    `)}
                </div>
            
                ${this.articles.length !== this.totalResults ? html`
                    <div class="list__load-more">
                        <div class="list__progress-text">
                            ${Translations.list.showing} ${this.articles.length} ${Translations.list.of} ${this.totalResults}
                        </div>
                
                        <button class="btn" @click=${this.loadMore}>
                            ${Translations.list.loadMore}
                        </button>
                    </div>
                ` : null}
            </div>
        `;
    }
}

customElements.define("app-list", ListElement);