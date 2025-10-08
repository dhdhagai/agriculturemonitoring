# agriculturemonitoring

# This is for a school project made by Dhruv Dhagai and Siddharth Tiwari

# If you want to use this you may mail me on dhruv.h.dhagai@gmail.com 

## Modern redesign (added)

I refreshed the site layout to a modern, responsive look. Changes include:

- Added `modern.css` with CSS variables, improved typography, and responsive utilities.
- Rebuilt `header.html` and `footer.html` into a clean navbar + footer and moved the dark-mode toggle into the header.
- Updated `index.html` with a hero, feature cards, and CTAs.
- Updated other pages to reference `modern.css` and use the shared header/footer.
- Implemented a theme API in `dark.js` that persists the user's preference and is compatible with the existing `dark-mode-switch.min.js`.

How to test locally (no Node required):

Note: the header and footer are loaded via AJAX (`jQuery.load()`), so pages should be served over HTTP. Opening files with file:// may block the header/footer injection.

Option A — Python (any system with Python 3):

```bash
# From the repository root
python -m http.server 8000
# Open http://localhost:8000
```

Option B — VS Code Live Server extension:

- Install the Live Server extension and click "Open with Live Server" on `index.html`.

Option C — GitHub Pages:

- Push this repo to GitHub and enable GitHub Pages from the repository settings to serve the static site.

Quick checklist after serving:

1. Open `index.html` in the served site (e.g., http://localhost:8000/index.html).
2. Confirm header and footer appear and the theme toggle (in the navbar) switches themes and persists across reloads.
3. Visit `liveview.html`, `weatherapp.html`, `agricultureai.html`, `login.html`, and `signup.html` to confirm consistent layout.

If you'd like, I can continue by polishing form styles, adding accessibility improvements, or producing a small design token file for colors and spacing.

### Blynk (ESP8266) quick setup

If you are using an ESP8266 board (NodeMCU, Wemos D1 mini, etc.), follow these steps to connect the device to Blynk Cloud:

1. Install board support for ESP8266 in the Arduino IDE (Boards Manager) and install the Blynk library via Library Manager.
2. Create a new device in Blynk Cloud and copy the AUTH token.
3. Open `arduino.ino` and set `AUTH_TOKEN`, `WIFI_SSID`, and `WIFI_PASS`.
4. Upload the sketch to your ESP8266 board.
5. In Blynk Cloud add widgets and map:
	- V1: moisture percent (0-100)
	- V2: raw ADC
	- V10: write dry calibration value
	- V11: write wet calibration value

Notes:
- ESP8266 ADC returns 0-1023 on many boards (but some dev boards use a voltage divider, check yours). Adjust `dryVal`/`wetVal` accordingly.
- The sketch reports every 10s by default (see `REPORT_INTERVAL`).
