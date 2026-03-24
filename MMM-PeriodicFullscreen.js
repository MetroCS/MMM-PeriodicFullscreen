/* global Module */

Module.register("MMM-PeriodicFullscreen", {
    defaults: {
        images: [],
        displayDuration: 10 * 1000,
        showInterval: 60 * 60 * 1000,
        randomOrder: false
    },

    start: function () {
        this.currentImageIndex = 0;
        this.fullscreenVisible = false;
        this.showTimer = null;
        this.hideTimer = null;
        this.scheduleNextShow();
    },

    stop: function () {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
    },

    getDom: function () {
        const wrapper = document.createElement("div");

        if (!this.fullscreenVisible || this.config.images.length === 0) {
            wrapper.style.display = "none";
            return wrapper;
        }

        wrapper.className = "MMM-PeriodicFullscreen-container";

        const img = document.createElement("img");
        img.src = this.config.images[this.currentImageIndex];
        img.className = "MMM-PeriodicFullscreen-image";

        wrapper.appendChild(img);
        return wrapper;
    },

    getStyles: function () {
        return ["MMM-PeriodicFullscreen.css"];
    },

    scheduleNextShow: function () {
        const self = this;
        this.showTimer = setTimeout(function () {
            self.showFullscreen();
        }, this.config.showInterval);
    },

    showFullscreen: function () {
        if (this.config.images.length === 0) {
            this.scheduleNextShow();
            return;
        }

        if (this.config.randomOrder) {
            this.currentImageIndex = Math.floor(Math.random() * this.config.images.length);
        }

        this.fullscreenVisible = true;
        this.updateDom();

        const self = this;
        this.hideTimer = setTimeout(function () {
            self.hideFullscreen();
        }, this.config.displayDuration);
    },

    hideFullscreen: function () {
        this.fullscreenVisible = false;

        if (!this.config.randomOrder) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.config.images.length;
        }

        this.updateDom();
        this.scheduleNextShow();
    }
});
