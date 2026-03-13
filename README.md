# OSINT // TACTICAL DASHBOARD

A browser-based open-source intelligence (OSINT) platform with a tactical aesthetic. Provides live camera feeds, real-time flight tracking, radio scanner monitoring, metadata extraction, and a suite of OSINT investigation tools — all in a single-page application.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [File Reference](#file-reference)
  - [index.html](#indexhtml)
  - [script.js](#scriptjs)
  - [style.css](#stylecss)
  - [sections/map.js](#sectionsmapjs)
  - [sections/metadata.js](#sectionsmetadatajs)
  - [sections/radio.js](#sectionsradiojs)
  - [sections/tools.js](#sectionstoolsjs)
  - [sections/panels.js](#sectionspanelsjs)
- [External APIs & Dependencies](#external-apis--dependencies)
- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [UI & Theming](#ui--theming)
- [Usage](#usage)

---

## Features

| Category | Capabilities |
|---|---|
| **Map** | Interactive Leaflet map with dark/satellite/topo/street base layers |
| **Cameras** | 40+ live MJPEG/YouTube/embed streams across 25+ global cities |
| **Flights** | Real-time ADS-B aircraft positions via FlightRadar24, OpenSky, and adsb.lol |
| **Fire Layer** | NASA MODIS active fire data by continent |
| **Military** | Military installation overlay |
| **Radio** | Police/fire scanners (OpenMHz), aviation ATC (LiveATC), ambient streams (SomaFM) |
| **Metadata** | YouTube, image EXIF (GPS extraction), video file, IP geolocation, phone, WHOIS/RDAP, bulk IP |
| **OSINT Tools** | Username search, people finder, email breach check, reverse image search, DNS lookup, SSL cert enumeration, Shodan |
| **Pins** | Right-click map to drop pins; manage and export from pins panel |
| **Session Export** | Export full session state (pins, settings) as JSON |

---

## Project Structure

```
Alex_website/
├── index.html              # Entry point — HTML skeleton and script loading
├── script.js               # All application logic (~3,300 lines)
├── style.css               # Complete styling and theme system (~70KB)
└── sections/               # HTML templates injected at runtime
    ├── map.js              # Map section HTML
    ├── metadata.js         # Metadata tools section HTML
    ├── radio.js            # Radio player section HTML
    ├── tools.js            # OSINT tools section HTML
    └── panels.js           # Floating panels (fire selector, pins, toast)
```

---

## File Reference

### index.html

The main HTML document. Defines the page shell — top status bar, navigation tabs, section container divs, and script tags. Loads section JS files first so their HTML is available before `script.js` initializes.

**Key elements:**

| Element ID | Purpose |
|---|---|
| `#topbar` | Status bar: system/feeds/cams/flights/fires indicators, clock, coordinates |
| `#mainnav` | Tab buttons: MAP / METADATA / RADIO / TOOLS |
| `#sec-map-wrap` | Container for map section |
| `#sec-meta-wrap` | Container for metadata section |
| `#sec-radio-wrap` | Container for radio section |
| `#sec-tools-wrap` | Container for OSINT tools section |
| `#panels-wrap` | Floating panels (fire continent picker, pins list) |

**Script loading order:**
`sections/*.js` → `script.js`

---

### script.js

The core application file. Contains all data definitions, event handlers, API integrations, and UI logic.

#### Camera Data — `CITIES` object

Defines every available camera feed. Top-level keys are city names; each city has `lat`, `lng`, and a `cameras` array.

```js
"New York": {
  lat: 40.7128,
  lng: -74.006,
  cameras: [
    {
      name: "Times Square",
      lat: 40.758,
      lng: -73.9855,
      type: "mjpeg" | "youtube" | "embed",
      sources: ["url1", "url2", ...],  // fallback list
      src: "Provider label"
    }
  ]
}
```

**Coverage:** ~25 cities across North America, Europe, and Asia-Pacific.

#### Radio Stations — `STATIONS` array

Each entry has `name`, `type`, `url`, and display metadata.

| Type | Examples |
|---|---|
| `scanner` | NYPD, FDNY, Chicago CPD/CFD, Boston, Seattle, Las Vegas, DC, LA, Houston |
| `atc` | JFK, LAX, O'Hare, Reagan, SFO, Miami, Heathrow |
| `wx` | SomaFM: Groove Salad, Drone Zone, DEF CON Radio, Space Station |
| `mil` | Andrews AFB (Broadcastify) |

#### Key Functions

**Map & Cameras**

| Function | Description |
|---|---|
| `setBase(name, btn)` | Switch map base tile layer |
| `toggleLayer(name, btn)` | Toggle map overlay (cameras / fires / flights / military) |
| `buildCamMarkers()` | Plot all camera markers on the Leaflet map |
| `loadFeed(cam, city)` | Open camera stream in the right-side feed panel |
| `closeFeed()` | Close the feed panel |
| `buildSidebarCams()` | Populate the camera list in the left sidebar |
| `toggleSidebar()` | Collapse/expand the left sidebar |

**Flight Tracking**

| Function | Description |
|---|---|
| `openFR24Modal()` | Show API key dialog for FlightRadar24 |
| `saveFR24Key()` | Persist FR24 API token to `localStorage` |
| `fetchFromFR24Official()` | Query FlightRadar24 official API |
| `fetchFromFR24Unofficial()` | Fallback to adsb.lol / OpenSky Network |
| `doFetchFlights()` | Master function — tries sources in order |
| `classifyFlight(cs, airline_icao)` | Returns `"commercial"` / `"military"` / `"private"` |
| `renderFlightsADSB()` | Render aircraft markers on map with heading arrows |
| `setFltFilter(f, btn)` | Filter displayed flights by classification |

**Fire Layer**

| Function | Description |
|---|---|
| `toggleFirePanel(e)` | Show/hide continent selector panel |
| `updateFires()` | Fetch and display active fire points from NASA |
| `fetchFires(continentIds)` | Query NASA MODIS FIRMS API for selected continents |

**Metadata Extraction**

| Function | Description |
|---|---|
| `extractYT()` | Fetch YouTube/Vimeo title, author, thumbnail, availability |
| `processImage(file)` | Parse image EXIF via `exifr` — GPS, camera, timestamps |
| `processVideo(file)` | Read video file metadata — duration, resolution, codecs |
| `lookupIP()` | Geolocate IP via ipapi.co — country, city, ASN, ISP, map |
| `lookupPhone()` | Validate phone number and identify carrier/region |
| `lookupCarrier()` | US/Canada carrier lookup |
| `lookupWhois()` | RDAP domain query — registrant, registrar, nameservers, dates |
| `runBulkIP()` | Batch geolocate up to 20 IPs |

**Radio Player**

| Function | Description |
|---|---|
| `startOpenMHzScanner(stn)` | Begin polling an OpenMHz scanner system |
| `fetchOpenMHzCalls()` | Poll for new radio transmissions (8s interval) |
| `playNextOpenMHz()` | Dequeue and play next scanner call |
| `playAudio()` / `togglePlay()` / `stopAudio()` | Playback control |
| `rewindAudio(s)` / `skipAhead(s)` | Timeline scrubbing |
| `setVolume(v)` | Set audio volume (0–100) |
| `startWave()` | Animate the waveform display while audio plays |

**OSINT Tools**

| Function | Description |
|---|---|
| `loadToolFrame(url, name, btn)` | Load a tool URL in the iframe panel |
| `reloadTool()` | Reload the current tool iframe |
| `openToolExternal()` | Open current tool in a new browser tab |

Built-in (native) tools:
- **Username Search** — generates profile links for 30+ platforms
- **People Finder Hub** — links to TruePeopleSearch, Spokeo, Pipl, Whitepages, etc.
- **Email Breach Check** — HaveIBeenPwned API with k-anonymity
- **Reverse Image Search** — TinEye, Google Lens, Yandex, Bing, Baidu
- **DNS Lookup** — A, AAAA, MX, NS, TXT, CNAME, SOA, PTR via Cloudflare 1.1.1.1 DoH
- **SSL Certificate Transparency** — subdomain enumeration via crt.sh
- **WHOIS/RDAP Lookup** — domain registration data
- **Bulk IP Scan** — batch geolocation (links to metadata tab)
- **Shodan Search Hub** — links with pre-filled search filters

**UI & Navigation**

| Function | Description |
|---|---|
| `switchSection(name, btn)` | Switch between MAP / METADATA / RADIO / TOOLS |
| `showMetaTab(name, btn)` | Switch metadata sub-tabs |
| `toggleTheme()` | Toggle light/dark theme (persisted to `localStorage`) |
| `doCoordSearch()` | Search map by place name or `lat,lng` |
| `dropPin(lat, lng)` | Drop a labelled pin (right-click context menu) |
| `togglePinsPanel()` | Show/hide the pins list panel |
| `exportSession()` | Download session state as a JSON file |
| `tick()` | 1-second interval: updates clock and map coordinate display |

**Utilities**

| Function | Description |
|---|---|
| `proxyFetch(url, timeoutMs)` | `fetch` wrapper with `Promise.race` timeout |
| `formatBytes(b)` | Convert bytes to human-readable string |
| `formatDuration(s)` | Convert seconds to `mm:ss` string |
| `getAspectRatio(w, h)` | Calculate simplified aspect ratio |

---

### style.css

Complete CSS stylesheet (~70KB). Implements the tactical/intelligence dashboard aesthetic.

#### CSS Custom Properties (variables)

```css
--bg:     #07090a   /* near-black page background */
--panel:  #0c1014   /* panel/card backgrounds */
--border: #1a2d1a   /* green-tinted borders */
--g:      #22c55e   /* primary green accent */
--amber:  #f59e0b   /* warning / alert */
--red:    #ef4444   /* critical / error */
--blue:   #38bdf8   /* secondary accent */
--purple: #a78bfa   /* tertiary accent */
--text:   #d1fae5   /* primary text */
--dim:    #4b7a5a   /* secondary / dimmed text */

--head: 'Orbitron', sans-serif       /* headings */
--mono: 'Share Tech Mono', monospace /* data / code */
--fm:   'Rajdhani', sans-serif       /* body text */
```

#### Visual Effects
- Scanline overlay (repeating gradient on `body`)
- Text glow / box-glow using `text-shadow` and `box-shadow`
- LED status dots (`.led-green`, `.led-red`, `.led-amber`, `.led-blue`)
- Backdrop blur on panel overlays
- Animated `LIVE` badge (pulse keyframe)
- Waveform bar animations

#### Layout
- Fixed top bar (44px)
- Fixed navigation bar (36px)
- Sidebar panels — left (cameras/tools) and right (feed) — collapsible
- Full-viewport map canvas
- Floating modal dialogs
- Responsive flex containers throughout

---

### sections/map.js

Injects the HTML for the **MAP** tab into `#sec-map-wrap`.

**Structure:**
- Left sidebar with two sub-tabs:
  - **Cameras** — scrollable list built by `buildSidebarCams()`
  - **Tools** — mini tool list with search, built by `buildSideTools()`
- Map toolbar (base layer buttons, overlay toggles, flight filters, refresh)
- Leaflet map container (`#map`)
- Right panel — live feed viewer:
  - Camera name, type badge, source badge, location
  - `LIVE` animated indicator
  - `<iframe>` / `<img>` feed display
  - Offline state and loading spinner
  - External link button
- FlightRadar24 API key modal

---

### sections/metadata.js

Injects the HTML for the **METADATA** tab into `#sec-meta-wrap`.

**Sub-tabs:**

| Tab | Inputs | Outputs |
|---|---|---|
| YouTube / Video URL | URL text input | Thumbnail, title, author, platform, availability, raw metadata grid |
| Image EXIF | File drop-zone | Camera make/model, GPS coordinates, timestamps, full EXIF grid, mini-map |
| Video File | File drop-zone | Duration, resolution, frame rate, codec, file size, video preview |
| IP / Domain | Text input | Country, city, region, ISP, ASN, coordinates, mini-map |
| Phone Lookup | Number input | Country, carrier, line type, validation status, external lookup links |
| WHOIS / RDAP | Domain input | Registrant, registrar, creation/expiry dates, nameservers |
| Bulk IP Scan | Multi-line textarea (up to 20 IPs) | Table of IP → geo results |

---

### sections/radio.js

Injects the HTML for the **RADIO** tab into `#sec-radio-wrap`.

**Layout:**
- Left panel: station list with search/filter input
- Right panel:
  - Waveform visualization (animated bars)
  - Station name and talkgroup/metadata display
  - Status LED
  - Timeline with progress bar and current/total time
  - Transport controls: ⏮ 30s, ⏮ 15s, ▶/⏸, ⏭ 15s, ⏹
  - Volume slider
  - Hidden `<audio>` element

---

### sections/tools.js

Injects the HTML for the **TOOLS** tab into `#sec-tools-wrap`.

**Layout:**
- Left panel: searchable tool list (`filterSideTools()` on input)
- Right panel:
  - URL breadcrumb display
  - Reload and "Open External" buttons
  - `<iframe>` for embedding tools
  - "FRAME BLOCKED" fallback message with direct link
  - Empty-state placeholder

---

### sections/panels.js

Injects floating panels into `#panels-wrap`. These overlay the page rather than being section-specific.

**Panels:**

| Panel ID | Contents |
|---|---|
| `#fire-panel` | Continent checkboxes (N. America, S. America, Europe, Africa, Asia, Oceania, Global) + Apply button |
| `#pins-panel` | List of dropped map pins with coordinates and labels |
| `#export-toast` | Temporary notification shown after session export |

---

## External APIs & Dependencies

### JavaScript Libraries (CDN)

| Library | Version | Purpose |
|---|---|---|
| [Leaflet.js](https://leafletjs.com) | 1.9.4 | Interactive map rendering |
| [exifr](https://github.com/MikeKovarik/exifr) | latest | EXIF/metadata extraction from images |

### Google Fonts

- **Orbitron** — headings, UI labels
- **Share Tech Mono** — data, coordinates, monospace content
- **Rajdhani** — body text

### External Data APIs

| API | Used For | Auth |
|---|---|---|
| FlightRadar24 (official) | Real-time aircraft positions | API key (optional, stored in localStorage) |
| [adsb.lol](https://adsb.lol) | ADS-B fallback flight data | None |
| [OpenSky Network](https://opensky-network.org) | ADS-B fallback flight data | None |
| [OpenMHz](https://openmhz.com) | Police/fire scanner audio streams | None |
| [LiveATC](https://www.liveatc.net) | Aviation ATC audio streams | None |
| [SomaFM](https://somafm.com) | Ambient/music streams | None |
| [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov) | Active fire hotspot data | None |
| [ipapi.co](https://ipapi.co) | IP geolocation | None |
| [HaveIBeenPwned](https://haveibeenpwned.com/API/v3) | Email breach checking (k-anonymity) | None |
| [rdap.org](https://rdap.org) | Domain WHOIS/registration data | None |
| [Cloudflare 1.1.1.1 DoH](https://1.1.1.1) | DNS record lookups | None |
| [crt.sh](https://crt.sh) | SSL certificate transparency (subdomains) | None |

---

## Architecture Overview

The application is built with **vanilla JavaScript** — no frontend framework. The architecture uses a simple module pattern:

```
index.html
  └── loads sections/*.js  (each file sets .outerHTML on its wrapper element)
  └── loads script.js       (initializes everything, defines all functions globally)
```

**State management:**
- In-memory JS objects for live data (flights, fire markers, camera state)
- `localStorage` for persistence (API keys, theme, pins)
- No build step, no bundler — open `index.html` directly in a browser

**Cross-origin handling:**
- `proxyFetch()` wraps all external requests with a configurable timeout
- iframes detect `X-Frame-Options` blocking and fall back to an external link button
- HIBP breach check uses k-anonymity (only the SHA-1 prefix is sent)

---

## Data Flow

```
User opens index.html
  → sections/*.js inject HTML templates
  → script.js initializes Leaflet map
  → CITIES data → buildCamMarkers() → markers on map
  → tick() starts 1-second clock loop

User clicks camera marker
  → loadFeed(cam, city) → iframe/img src set → stream displayed

User enables flights
  → doFetchFlights() → FR24 / adsb.lol / OpenSky
  → classifyFlight() per aircraft
  → renderFlightsADSB() → markers + heading arrows on map

User selects radio station
  → startOpenMHzScanner() or direct stream URL
  → fetchOpenMHzCalls() polls every 8s
  → playNextOpenMHz() dequeues calls → <audio> plays

User runs metadata lookup
  → async fetch to relevant API
  → parse JSON response
  → populate result card / mini-map

User loads OSINT tool
  → loadToolFrame(url) → iframe attempt
  → if blocked → "FRAME BLOCKED" + open-in-tab link
```

---

## UI & Theming

The dashboard uses a dark, green-accent tactical aesthetic by default. A light theme can be toggled via the top-right button (state persisted to `localStorage`).

**Top bar indicators** update automatically:
- `SYSTEM ONLINE` — always green
- `FEEDS` — reflects active stream count
- `CAMS` — reflects loaded camera count
- `FLIGHTS` — reflects tracked aircraft count
- `FIRES` — reflects active fire point count

**Coordinate display** in the top bar updates as the map is panned/zoomed.

---

## Usage

1. Open `index.html` in any modern browser (no server required for most features).
2. Navigate between **MAP**, **METADATA**, **RADIO**, and **TOOLS** tabs.
3. On the map, click any camera marker to open the live feed.
4. Enable the **Flights** overlay and optionally enter a FlightRadar24 API key for enhanced data.
5. Enable **Active Fires** and select continents from the fire panel.
6. Switch to **RADIO** and select a scanner or stream to begin monitoring.
7. Switch to **METADATA** and use any sub-tab to analyze URLs, files, IPs, or domains.
8. Switch to **TOOLS** to access the built-in OSINT tools or launch external tools.
9. Right-click anywhere on the map to drop a pin. Manage pins via the **Pins** button.
10. Use **Export Session** to save current pins and settings as a JSON file.

> **Note:** Some camera streams may be offline or geo-restricted. The player will display an offline state if the feed cannot be loaded. For tools that cannot be embedded due to `X-Frame-Options`, use the "Open in New Tab" button.
