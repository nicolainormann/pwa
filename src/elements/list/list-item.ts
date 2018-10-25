import { LitElement, html, property } from "@polymer/lit-element";
import { css } from "../../utils/css";
import { Translations } from "../../utils/translations";

class ListItemElement extends LitElement {
    @property()
    item: IArticle = {
        author: "",
        content: "",
        description: "",
        publishedAt: "",
        source: {
            id: "",
            name: "",
        },
        title: "",
        url: "",
        urlToImage: ""
    };

    constructor() {
        super();
    }

    render() {
        const { item } = this;
        return html`
            ${css}
            <div class="list-item">
                <div class="list-item__image" style="background-image: url(${item.urlToImage})"></div>
            
                <h2 class="list-item__title">
                    ${item.title}
                </h2>

                ${item.author ? html`
                    <div class="list-item__author">
                        ${Translations.list.author}: ${item.author}
                    </div>
                ` : ""}
            
                <div class="list-item__description">
                    ${item.description}
                </div>
            </div>
        `;
    }
}

customElements.define("app-list-item", ListItemElement);