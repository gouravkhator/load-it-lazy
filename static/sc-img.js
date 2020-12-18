const template = document.createElement('template');
//template is used as when we do styling in constructor, it will always start parser which is slow
// for each instance of SCImg, the template will be used. And keeping it outside is really fast.
template.innerHTML = `
    <style>
        :host{
            display: block;
            background-color: lightcoral;
            position: relative;
            background-size: 100% 100%;
        }

        img{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
`;

//Using Intersection Observer for checking if img is in view
const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.setAttribute('full', '');
        }
    }
});


class SCImg extends HTMLElement {
    static get observedAttributes() {
        return ['full'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        //we are cloning the content of template which is super fast as its already parsed before
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        io.observe(this);
    }

    disconnectedCallback() {
        io.unobserve(this);
    }

    get full() {
        return this.hasAttribute('full');
    }

    get src() {
        return this.getAttribute('src');
    }

    attributeChangedCallback() {
        if (this.loaded)
            return;

        const img = document.createElement('img');
        img.src = this.src;
        img.onload = _ => {
            this.loaded = true;
            this.shadowRoot.appendChild(img);
        }
    }
}

customElements.define('sc-img', SCImg);