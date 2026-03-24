# MMM-PeriodicFullscreen
MagicMirror module to periodically show a fullscreen image.

Images are dynamically read from the images/ folder; no need to restart MM.

Timings are set in config/config.js

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
  position: "fullscreen_above",
  config: {
    intervalMinutes: 67,
    durationMinutes: 1.5,
    imagePath: "modules/MMM-PeriodicFullscreen/images/"
  }
}
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `intervalMinutes` | `67` | How many minutes to show each image |
| `durationMinutes` | `1.5` | How many minutes to display the image |
| `imagePath` | `modules/MMM-PeriodicFullscreen/images/` | Directory where images are located |



---
MMM-PeriodicFullscreen is a MagicMirror module to show a full-screen image periodically
Copyright &copy; 2026 Dr. Jody Paul

This program is free software: you can redistribute it and/or modify
it under the terms of the [GNU General Public License](LICENSE) as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
