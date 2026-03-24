const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
  socketNotificationReceived(notification, payload) {
    if (notification === "GET_IMAGES_NOW") {
      const imgDir = path.join(__dirname, "images");
      const exts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      try {
        const files = fs.readdirSync(imgDir)
          .filter(f => exts.includes(path.extname(f).toLowerCase()));
        this.sendSocketNotification("IMAGES_LIST", files);
      } catch (e) {
        this.sendSocketNotification("IMAGES_LIST", []);
      }
    }
  }
});
