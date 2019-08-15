import { LitElement, html, css } from 'lit-element';

export class FilterSummary extends LitElement {
  static get properties() {
    return {
      counts: {
        type: Array
      }
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
    `;
  }

  render() {
    return (!this.counts)?html``:html`
    <div>
      <span>Showing:</span>
      <ul>
        <li>
          <span>
          ${this.counts.reduce((prev, count) => (count.current + prev), 0)}
          </span> of <span>
          ${this.counts.reduce((prev, count) => (count.total + prev), 0)}
          </span> total sites
        </li>
        ${this.counts.map((el) => html`
        <li>
          <span>${el.current}</span> of <span>${el.total}</span> sites having <span>${el.name}</span>
        </li>
        `)}
      </ul>
    </div>
    `;
  }

  setCounts(counts) {
    this.counts = counts;
  }
}
customElements.define('filter-summary', FilterSummary);