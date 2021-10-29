import { LitElement, html, css } from 'lit-element';
import { genId } from 'wgnhs-common';
import { ignoredKeys, SiteData } from '../../site-data.js';

export class TableLayout extends LitElement {

  static get layoutName() {
    return undefined;
  }

  static include(info, context) {
    return html`<table-layout .info=${info} .context=${context}></table-layout>`;
  }

  static get properties() {
    return {
      info: {
        type: Object
      },
      context: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.genId = (function() {
      const memo = {};
      return function(index) {
        if (!memo[index]) {
          memo[index] = genId();
        }
        return memo[index];
      }
    })();
  }

  static get styles() {
    return css`
      [data-element="table"] {
        display: grid;
        grid-template-columns: 40% 1fr;
        grid-gap: var(--border-radius);
        margin: 0 var(--border-radius);
      }
      .label {
        font-weight: var(--font-weight-bold);
      }
    `;
  }

  render() {
    let key = 0, value = 1;
    let entries = Object.entries(this.info).filter((el) => {
      return !ignoredKeys.includes(el[key]);
    }).filter((el) => {
      return !SiteData.getFieldHidden(el[key], this.context.layoutName);
    }).filter((el) => {
      return !!el[value];
    });
    entries.sort((a, b) => SiteData.getFieldConfiguration(a[key], this.context.layoutName).sortOrder - SiteData.getFieldConfiguration(b[key], this.context.layoutName).sortOrder);
    entries = entries.map((el, index) => html`
      <dt class="label" title="${SiteData.getFieldDescription(el[key], this.context.layoutName)}">
        <label for="${this.genId(index)}" >
          ${SiteData.getFieldTitle(el[key], this.context.layoutName)}
        </label>
      </dt>
      <dd class="detail" title="${SiteData.getFieldDescription(el[key], this.context.layoutName)}">
        <span id="${this.genId(index)}">
          ${el[value]}
        </span>
      </dd>
    `);
    return html`
      <dl data-element="table">
        ${entries}
      </dl>
    `;
  }
}
customElements.define('table-layout', TableLayout);
