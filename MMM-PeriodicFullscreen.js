Module.register("MMM-PeriodicFullscreen", {
    defaults: {
	intervalMinutes: 67, // Prime to not sync with hourly/half-hourly things
	durationMinutes: 1.5,
	imagePath: "modules/MMM-PeriodicFullscreen/images/"
    },

    start() {
	this.showing = false;
	this.currentImage = 0;
	this.images = [];
	setTimeout(() => this.requestAndShow(), this.config.intervalMinutes * 60 * 1000);
    },

    requestAndShow() {
	this.sendSocketNotification("GET_IMAGES_NOW");  // triggers showFullscreen via socket response
    },

    socketNotificationReceived(notification, payload) {
	if (notification === "IMAGES_LIST") {
	    // Fisher-Yates shuffle
	    const files = payload;
	    for (let i = files.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[files[i], files[j]] = [files[j], files[i]];
	    }
	    this.images = files;
	    if (this.images.length > 0) {
		this.showFullscreen();
	    } else {
		setTimeout(() => this.requestAndShow(), this.config.intervalMinutes * 60 * 1000);
	    }
	}
    },

  showFullscreen() {
    this.showing = true;
    this.updateDom();

    // Hide all other modules
    MM.getModules().exceptModule(this).enumerate(m => m.hide(500));

    setTimeout(() => this.hideFullscreen(), this.config.durationMinutes * 60 * 1000);
  },

  hideFullscreen() {
    this.showing = false;
    this.updateDom();

    // Restore all other modules
    MM.getModules().exceptModule(this).enumerate(m => m.show(500));

    // Advance image for next time
    this.currentImage = (this.currentImage + 1) % this.config.images.length;

    setTimeout(() => this.showFullscreen(), this.config.intervalMinutes * 60 * 1000);
  },

  getDom() {
    const wrapper = document.createElement("div");
    if (!this.showing) return wrapper;

    wrapper.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      z-index: 9999;
      background: #000;
    `;

    const img = document.createElement("img");
    img.src = this.config.imagePath + this.images[0];
    img.style.cssText = "width:100%; height:100%; object-fit:cover;";
    wrapper.appendChild(img);
    return wrapper;
  }
});
