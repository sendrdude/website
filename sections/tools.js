document.getElementById('sec-tools-wrap').outerHTML = `
  <!-- ════════════════════════════════════════════
     TOOLS SECTION
════════════════════════════════════════════ -->
  <div id="sec-tools" class="section">
    <div class="tools-layout">
      <div class="tools-list-panel">
        <span class="panel-hdr-title"
          style="display:block;margin-bottom:8px;font-family:var(--head);font-size:9px;color:var(--g);letter-spacing:3px">OSINT
          TOOLS</span>
        <input type="text" class="tool-search-2" placeholder="search..." oninput="filterTools2(this.value)">
        <div class="tools-scroll" id="tools-main-list"></div>
      </div>
      <div class="tool-frame-area">
        <div class="tool-frame-topbar">
          <span class="tool-url-display" id="tool-url-disp">Select a tool from the list →</span>
          <button class="tool-frame-btn" onclick="reloadTool()">↻ RELOAD</button>
          <button class="tool-frame-btn" onclick="openToolExternal()">⤴ NEW TAB</button>
        </div>
        <iframe id="tool-iframe" title="OSINT Tool"></iframe>
        <div class="tool-blocked" id="tool-blocked">
          <div class="tool-blocked-icon">🔒</div>
          <h3>FRAME BLOCKED</h3>
          <p>This site does not allow embedding (X-Frame-Options policy). Click below to open it in a new tab.</p>
          <a href="#" id="tool-blocked-link" target="_blank" class="tool-blocked-open">OPEN IN NEW TAB</a>
        </div>
        <div class="tools-placeholder" id="tools-placeholder">
          <div class="tools-placeholder-txt">SELECT A TOOL FROM THE LEFT PANEL<br><span
              style="font-size:9px;opacity:.4">Tools will load embedded here when supported</span></div>
        </div>
      </div>
    </div>
  </div>
`;
