const innerHtml = `
    <div class="progress__title">
        Progress
    </div>
    <div class="progress__bar">
        <div class="diagram" id="diagram">
            <svg width="100" viewBox="0 0 37 37">
                <circle r="15.9155" cx="50%" cy="50%"></circle>
                <circle id="progress" r="15.9155" cx="50%" cy="50%"></circle>
                <text x="50%" y="50%"></text>
            </svg>
        </div>
        <div class="control">
            <div class="control__element">
                <input type="number" class="control__input-value" id="input_value">
                <p>Value</p>
            </div>
            <div class="control__element">
                <label>
                    <input id="animate-btn" class="checkbox" type="checkbox" value="1">
                    <div class="switch-btn"></div>
                </label>
                <p>Animate</p>
            </div>
            <button class="control__element control__btn" style="display: none;" id="default-btn">Set to default</button>
            <div class="control__element">
                <label>
                    <input id="hide-btn" class="checkbox" type="checkbox" value="1">
                    <div class="switch-btn"></div>
                </label>
                <p>Hide</p>
            </div>
        </div>
    </div>
    `

export default class Progress extends HTMLElement {

    constructor() {
        super();
        this.innerHTML= innerHtml;
        this.rotationInterval = null;
        this.rotation = 0;
        this.diagram = this.querySelector("#diagram");

        const progress = this.querySelector("#progress");
        if (!progress) {
            console.error("Circle element not found");
            return;
        } else {
            this.progress = progress;
        }

        const inputValue = this.querySelector("#input_value");
        if (!inputValue) {
            console.error("Percent input element not found");
            return;
        } else {
            this.inputValue = inputValue;
        }

        const animateBtn = this.querySelector("#animate-btn");
        if (!animateBtn) {
            console.error("Animation checkbox element not found");
            return;
        } else {
            this.animateBtn = animateBtn;
        }

        const defaultBtn = this.querySelector("#default-btn");
        if (!defaultBtn) {
            console.error("Default btn not found");
            return;
        } else {
            this.defaultBtn = defaultBtn;
        }

        const hideBtn = this.querySelector("#hide-btn");
        if (!hideBtn) {
            console.error("Hide checkbox element not found");
            return;
        } else {
            this.hideBtn = hideBtn;
        }
    }

    updateProgress = (val) => {
        if (this.progress)
            this.progress.style.strokeDasharray = val + " 100";
    };

    toggleAnimation = (value) => {
        if (this.animateBtn && this.defaultBtn) {
            this.defaultBtn.style.display = "block";
            if (value) {
                this.rotateBlock(this.rotation);
            } else {
                clearInterval(this.rotationInterval);
                this.rotationInterval = null;
            }
        }
    };

    toggleOpacity = (val) => {
        if (val) {
            this.diagram.classList.add("hidden");
        } else {
            this.diagram.classList.remove("hidden");
        }
    };

    setToDefaultPosition = () => {
        this.rotation = 0;
        this.diagram.style.transform = "rotate(0deg)";
        this.defaultBtn.style.display = "none";
    };

    rotateBlock = () => {
        this.rotationInterval = setInterval(() => {
            this.rotation += 1;
            this.rotation = (this.rotation === 360) ? 0 : this.rotation;
            this.diagram.style.transform = `rotate(${this.rotation}deg)`;
        }, 10); // Интервал вращения в миллисекундах
    }

    static get observedAttributes() {
        return ["percentage", "animate", "hidde"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'percentage') {
            this.inputValue.value = Number(newValue);
            this.updateProgress(Number(newValue));
        }

        if (name === 'animate') {
            newValue = Boolean(newValue);
            if (newValue !== null && newValue !== false) {
                this.animateBtn.checked = newValue;
                this.toggleAnimation(newValue);
            }
        }

        if (name === 'hidde') {
            newValue = Boolean(newValue);
            if (newValue !== null && newValue !== false) {
                this.hideBtn.checked = newValue;
                this.toggleOpacity(newValue);
            }
        }
    }


    connectedCallback() {
        this.inputValue.addEventListener('change', (e) => {
            let value = (e.target.value > 100)?100:(e.target.value < 0)?0:e.target.value;
            this.updateProgress(value);
        });

        this.animateBtn.addEventListener("change", (e) => {
            this.toggleAnimation(e.target.checked);
        });

        this.hideBtn.addEventListener("change", (e) => {
            this.toggleOpacity(e.target.checked);
        });

        this.defaultBtn.addEventListener('click', (e) => {
            this.setToDefaultPosition();
        });
    }

    disconnectedCallback() {
        if (this.inputValue) {
            this.inputValue.removeEventListener("change", (e) => {
                let value = (e.target.value > 100)?100:(e.target.value < 0)?0:e.target.value;
                this.updateProgress(value);
            });
        }

        if (this.animateBtn && this.defaultBtn) {
            this.animateBtn.removeEventListener("change", (e) => {
                this.toggleAnimation(e.target.checked);
            });
        }

        if (this.hideBtn) {
            this.hideBtn.removeEventListener("change", (e) => {
                this.toggleOpacity(e.target.checked);
            });
        }
    }
}
