document.getElementById('sec-radio-wrap').outerHTML = `
  <!-- ════════════════════════════════════════════
     RADIO SECTION
════════════════════════════════════════════ -->

  <div id="sec-radio" class="section">
    <div class="radio-layout">
      <div class="radio-list">
        <div class="radio-list-hdr">
          <div class="radio-list-title">RADIO INTEL</div>
          <input type="text" class="radio-search" placeholder="search stations..." oninput="filterStations(this.value)">
        </div>
        <div class="radio-stations" id="station-list"></div>
      </div>
      <div class="radio-player">
        <div class="rp-display" id="rp-display">
          <div class="rp-idle" id="rp-idle">SELECT A STATION<span>Choose from the list to begin monitoring</span></div>
          <div id="rp-playing" style="display:none;flex-direction:column;align-items:center;gap:16px;width:100%">
            <div class="rp-waveform" id="rp-wave"></div>
            <div class="rp-station-name" id="rp-name">–</div>
            <div class="rp-station-meta" id="rp-meta">–</div>
            <div class="rp-status">
              <div class="led r" id="rp-status-led" style="display:none"></div>
              <span id="rp-status-txt" style="font-family:var(--mono);font-size:10px;color:var(--dim)">STANDBY</span>
            </div>
          </div>
          <div class="rp-embed-wrap" id="rp-embed-wrap"
            style="display:none;width:100%;height:200px;border-radius:3px;overflow:hidden;border:1px solid var(--border)">
          </div>
        </div>
        <div class="rp-controls">
          <div class="rp-timeline" id="rp-timeline" onclick="seekAudio(event)">
            <div class="rp-progress" id="rp-progress"></div>
          </div>
          <div class="rp-time-row">
            <span id="rp-cur">0:00</span>
            <span id="rp-dur">LIVE</span>
          </div>
          <div class="rp-btns">
            <button class="rp-btn" onclick="rewindAudio(30)" title="Rewind 30s">◀◀ 30s</button>
            <button class="rp-btn" onclick="rewindAudio(15)" title="Rewind 15s">◀ 15s</button>
            <button class="rp-btn play-btn" id="rp-play-btn" onclick="togglePlay()">▶ PLAY</button>
            <button class="rp-btn" onclick="skipAhead(15)" title="Forward 15s">15s ▶</button>
            <button class="rp-btn" onclick="stopAudio()" title="Stop">■ STOP</button>
          </div>
          <div class="rp-vol-row">
            <span>VOL</span>
            <input type="range" class="rp-vol" id="rp-vol" min="0" max="1" step="0.05" value="0.8"
              oninput="setVolume(this.value)">
            <span id="rp-vol-pct">80%</span>
          </div>
        </div>
      </div>
    </div>
    <audio id="radio-audio"></audio>
  </div>
`;
