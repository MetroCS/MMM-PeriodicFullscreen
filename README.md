# MMM-PeriodicFullscreen
MagicMirror module to periodically show a fullscreen image.

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/MetroCS/MMM-PeriodicFullscreen.git
```

## Configuration

Add the following to your `config/config.js` file:

```javascript
{
    module: "MMM-PeriodicFullscreen",
    config: {
        images: [
            "modules/MMM-PeriodicFullscreen/images/photo1.jpg",
            "modules/MMM-PeriodicFullscreen/images/photo2.jpg"
        ],
        displayDuration: 10 * 1000,
        showInterval: 60 * 60 * 1000,
        randomOrder: false
    }
}
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `images` | `[]` | Array of image paths to display |
| `displayDuration` | `10000` | How long (ms) each image is shown |
| `showInterval` | `3600000` | How often (ms) a fullscreen image is shown |
| `randomOrder` | `false` | Show images in random order when `true`, sequential when `false` |
