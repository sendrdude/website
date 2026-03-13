document.getElementById('sec-map-wrap').outerHTML = `
  <!-- ════════════════════════════════════════════
     MAP SECTION
════════════════════════════════════════════ -->
  <div id="sec-map" class="section active" style="flex-direction:column">
    <div style="flex:1;display:flex;overflow:hidden;position:relative">
      <!-- Left Sidebar -->
      <div id="left">
        <div class="panel-hdr"><span class="panel-hdr-title">INTEL</span></div>
        <div class="ptabs">
          <button class="ptab active" onclick="showSideTab('cameras',this)">CAMERAS</button>
          <button class="ptab" onclick="showSideTab('tools-side',this)">TOOLS</button>
        </div>
        <div class="scroll" id="pane-cameras"></div>
        <div class="scroll hidden-pane" id="pane-tools-side">
          <input type="text" id="tool-search-input" placeholder="filter tools..." oninput="filterSideTools(this.value)">
          <div id="side-tools-list"></div>
        </div>
      </div>
      <div id="sidetog" onclick="toggleSidebar()">◀</div>

      <!-- Map -->
      <div id="map-wrap">
        <div id="map-toolbar">
          <span class="btm-lbl">BASE</span>
          <button class="mtbtn" id="bl-dark" onclick="setBase('dark',this)">DARK</button>
          <button class="mtbtn on" id="bl-sat" onclick="setBase('sat',this)">SAT</button>
          <button class="mtbtn" id="bl-topo" onclick="setBase('topo',this)">TOPO</button>
          <button class="mtbtn" id="bl-street" onclick="setBase('street',this)">STREET</button>
          <span class="bsep"></span>
          <span class="btm-lbl">LAYERS</span>
          <button class="mtbtn on" id="ov-cams" onclick="toggleLayer('cams',this)">CAMS</button>
          <button class="mtbtn" id="ov-fires" onclick="toggleFirePanel(event)">FIRES</button>
          <button class="mtbtn" id="ov-flights" onclick="toggleLayer('flights',this)">FLIGHTS</button>

          <button class="mtbtn" id="ov-mil" onclick="toggleMilitary(this)">MIL BASES</button>
          <span class="bsep"></span>
          <span class="btm-lbl">FLIGHTS</span>
          <button class="mtbtn on" id="ft-all" onclick="setFltFilter('all',this)">ALL</button>
          <button class="mtbtn" id="ft-com" onclick="setFltFilter('commercial',this)">COM <span class="fcnt"
              style="background:rgba(34,197,94,.15);color:var(--g)" id="cnt-com">0</span></button>
          <button class="mtbtn" id="ft-mil" onclick="setFltFilter('military',this)">MIL <span class="fcnt"
              style="background:rgba(239,68,68,.15);color:var(--red)" id="cnt-mil">0</span></button>
          <button class="mtbtn" id="ft-pvt" onclick="setFltFilter('private',this)">PVT <span class="fcnt"
              style="background:rgba(245,158,11,.15);color:var(--amber)" id="cnt-pvt">0</span></button>
          <button class="mtbtn" onclick="doFetchFlights()" style="margin-left:4px;color:var(--g)">↻ REFRESH</button>
          <span class="bsep" style="margin-left:4px"></span>
          <button class="mtbtn" id="fr24-key-btn" onclick="openFR24Modal()"
            title="Set FlightRadar24 API key for live data">FR24 KEY</button>
        </div>
        <div id="map"></div>
      </div>

      <!-- Right Feed Panel -->
      <div id="right">
        <div class="fp-hdr">
          <span class="fp-title">LIVE FEED</span>
          <button class="fp-close" onclick="closeFeed()">✕ CLOSE</button>
        </div>
        <div class="fp-meta">
          <div class="fp-camname" id="fp-name">–</div>
          <div class="fp-tags">
            <span class="ftag" id="fp-type">–</span>
            <span class="ftag b" id="fp-src">–</span>
            <span id="fp-city" style="font-family:var(--mono);font-size:9px;color:var(--dim)">–</span>
          </div>
        </div>
        <div class="fp-view">
          <iframe id="fp-iframe" allow="autoplay;encrypted-media"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"></iframe>
          <img id="fp-img" alt="Camera Feed">
          <div class="fp-offline" id="fp-offline">
            <div class="fp-offline-icon">📡</div>
            <p>FEED NOT DIRECTLY EMBEDDABLE<br>Click below to open in new tab</p>
          </div>
          <div class="cam-loading" id="fp-loading" style="display:none">
            <div class="cam-spin"></div>
            <div style="font-size:9px;color:var(--dim);margin-top:6px;letter-spacing:1px">CONNECTING…</div>
          </div>
          <div class="live-badge" id="fp-live-badge">
            <div class="live-dot"></div>LIVE
          </div>
          <div class="snap-badge" id="fp-snap-badge">
            <div class="live-dot" style="background:var(--blue);animation:none"></div>SNAPSHOT
          </div>
        </div>
        <a href="#" id="fp-ext" target="_blank" class="fp-ext">⟶ OPEN IN NEW TAB</a>
      </div>
    </div>
  </div>

  <!-- ════════════════════════════════════════════
     FR24 API KEY MODAL
════════════════════════════════════════════ -->
  <div id="fr24-modal">
    <div class="fr24-box">
      <div class="fr24-title">FLIGHTRADAR24 API KEY</div>
      <div class="fr24-sub">
        Enter your FR24 API token to enable live flight data via the official FlightRadar24 API.<br>
        Get a free sandbox key or paid plan at <a href="https://fr24api.flightradar24.com"
          target="_blank">fr24api.flightradar24.com</a>.<br>
        Without a key, fallback sources (adsb.lol / OpenSky) will be used automatically.
      </div>
      <input class="fr24-input" id="fr24-key-input" type="password" placeholder="Paste your Bearer token here…"
        autocomplete="off">
      <div class="fr24-row">
        <button class="fr24-btn" onclick="saveFR24Key()">SAVE &amp; CONNECT</button>
        <button class="fr24-btn clear" onclick="clearFR24Key()">CLEAR KEY</button>
        <button class="fr24-btn cancel" onclick="closeFR24Modal()">CANCEL</button>
      </div>
      <div class="fr24-status" id="fr24-status"></div>
    </div>
  </div>
`;
