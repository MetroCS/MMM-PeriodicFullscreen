Module.register("MMM-PeriodicFullscreen", {
    defaults: {
        intervalMinutes: 67,
        durationMinutes: 1.5,
        imagePath: "modules/MMM-PeriodicFullscreen/images/"
    },

    start() {
        this.showing = false;
        this.currentImage = 0;
        this.images = [];
        // Start the first timer
        this.scheduleNext();
    },

    scheduleNext() {
        setTimeout(() => this.requestAndShow(), this.config.intervalMinutes * 60 * 1000);
    },

    requestAndShow() {
        this.sendSocketNotification("GET_IMAGES_NOW");
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "IMAGES_LIST") {
            if (payload && payload.length > 0) {
                // Shuffle the new list
                for (let i = payload.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [payload[i], payload[j]] = [payload[j], payload[i]];
                }
                this.images = payload;
                this.showFullscreen();
            } else {
                // If no images found, try again later
                this.scheduleNext();
            }
        }
    },

    showFullscreen() {
        this.showing = true;
        this.updateDom();
        MM.getModules().exceptModule(this).enumerate(m => m.hide(500));
        setTimeout(() => this.hideFullscreen(), this.config.durationMinutes * 60 * 1000);
    },

    hideFullscreen() {
        this.showing = false;
        this.updateDom();
        MM.getModules().exceptModule(this).enumerate(m => m.show(500));
        
        // Advance for next time
        this.currentImage = (this.currentImage + 1) % this.images.length;
        
        // Loop: Start the wait for the next interval
        this.scheduleNext();
    },

    getDom() {
        const wrapper = document.createElement("div");
        if (!this.showing || this.images.length === 0) return wrapper;

        wrapper.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100vw; height: 100vh;
            z-index: 9999;
            background: #000;
        `;

        const img = document.createElement("img");
        // Use the current index and the verified image array
        img.src = this.config.imagePath + this.images[this.currentImage];
        img.style.cssText = "width:100%; height:100%; object-fit:cover; transition: opacity 1s ease-in-out;";
        wrapper.appendChild(img);
        return wrapper;
    }
});
