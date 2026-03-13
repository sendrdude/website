document.getElementById('panels-wrap').outerHTML = `
  <!-- Fire continent panel — appended to body so no stacking context clips it -->
  <div class="fire-panel" id="fire-panel">
    <div class="fp-head">SELECT CONTINENTS</div>
    <label class="fp-row"><input type="checkbox" id="fc-na" onchange="updateFires()"> N. America</label>
    <label class="fp-row"><input type="checkbox" id="fc-sa" onchange="updateFires()"> S. America</label>
    <label class="fp-row"><input type="checkbox" id="fc-eu" onchange="updateFires()"> Europe</label>
    <label class="fp-row"><input type="checkbox" id="fc-af" onchange="updateFires()"> Africa</label>
    <label class="fp-row"><input type="checkbox" id="fc-as" onchange="updateFires()"> Asia</label>
    <label class="fp-row"><input type="checkbox" id="fc-oc" onchange="updateFires()"> Oceania</label>
    <label class="fp-row"><input type="checkbox" id="fc-gl" onchange="updateFires()"> Global (all)</label>
    <div class="fp-note" id="fire-status">Select continents to load fires</div>
  </div>

  <div id="pins-panel">
    <div id="pins-panel-hdr"><span>📍 MAP PINS</span><button onclick="togglePinsPanel()"
        style="background:none;border:none;color:var(--dim);cursor:pointer;font-size:12px">✕</button></div>
    <div id="pins-list">
      <div style="padding:12px;font-family:var(--mono);font-size:9px;color:var(--dim);text-align:center">Right-click on
        map to drop a pin</div>
    </div>
  </div>
  <div id="export-toast">✓ SESSION EXPORTED</div>

`;
