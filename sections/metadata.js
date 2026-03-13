document.getElementById('sec-meta-wrap').outerHTML = `
  <!-- ════════════════════════════════════════════
     METADATA SECTION
════════════════════════════════════════════ -->
  <div id="sec-meta" class="section">
    <div class="meta-layout">
      <div class="meta-sidebar">
        <div class="meta-panel-title">METADATA TOOLS</div>
        <button class="meta-tab-btn active" onclick="showMetaTab('yt',this)">YouTube / Video URL</button>
        <button class="meta-tab-btn" onclick="showMetaTab('img',this)">Image EXIF</button>
        <button class="meta-tab-btn" onclick="showMetaTab('vid',this)">Video File</button>
        <button class="meta-tab-btn" onclick="showMetaTab('ip',this)">IP / Domain</button>
        <button class="meta-tab-btn" onclick="showMetaTab('phone',this)">Phone Lookup</button>
        <button class="meta-tab-btn" onclick="showMetaTab('whois',this)">WHOIS / RDAP</button>
        <button class="meta-tab-btn" onclick="showMetaTab('bulk',this)">Bulk IP Scan</button>
      </div>
      <div class="meta-content">

        <!-- YouTube -->
        <div class="meta-pane active" id="mpane-yt">
          <div class="meta-h1">YOUTUBE / VIDEO METADATA</div>
          <div class="meta-sub">Extract title, author, thumbnail, embed code and availability data from any YouTube or
            Vimeo URL.</div>
          <div class="meta-error" id="yt-err"></div>
          <div class="meta-form">
            <input class="meta-input" id="yt-url" placeholder="https://www.youtube.com/watch?v=..."
              onkeydown="if(event.key==='Enter')extractYT()">
            <button class="meta-btn" onclick="extractYT()">EXTRACT METADATA</button>
          </div>
          <div class="meta-loading" id="yt-loading">Fetching metadata</div>
          <div class="meta-results" id="yt-results" style="display:none">
            <img class="meta-thumb" id="yt-thumb" alt="Thumbnail">
            <div class="meta-card">
              <div class="meta-card-hdr">VIDEO INFO</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="yt-grid"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image EXIF -->
        <div class="meta-pane" id="mpane-img">
          <div class="meta-h1">IMAGE EXIF METADATA</div>
          <div class="meta-sub">Upload any image to extract EXIF data including GPS coordinates, camera info,
            timestamps, and device details.</div>
          <div id="img-drop" class="meta-drop" onclick="document.getElementById('img-file').click()"
            ondragover="event.preventDefault();this.classList.add('drag-over')"
            ondragleave="this.classList.remove('drag-over')" ondrop="handleImgDrop(event)">
            <div class="meta-drop-txt">Drop image here or <span>click to upload</span><br>JPG, PNG, TIFF, RAW supported
            </div>
          </div>
          <input type="file" id="img-file" accept="image/*" style="display:none" onchange="processImage(this.files[0])">
          <img id="img-preview" alt="Preview">
          <div class="meta-error" id="img-err"></div>
          <div class="meta-results" id="img-results" style="display:none">
            <div class="meta-card">
              <div class="meta-card-hdr">EXIF DATA</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="img-grid"></div>
              </div>
            </div>
            <div class="meta-card" id="gps-card" style="display:none">
              <div class="meta-card-hdr">GPS COORDINATES</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="gps-grid"></div>
                <div id="exif-mini-map" class="map-mini"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Video File -->
        <div class="meta-pane" id="mpane-vid">
          <div class="meta-h1">VIDEO FILE METADATA</div>
          <div class="meta-sub">Upload a video file to read duration, resolution, codec info, and embedded metadata
            tags.</div>
          <div class="meta-drop" onclick="document.getElementById('vid-file').click()"
            ondragover="event.preventDefault();this.classList.add('drag-over')"
            ondragleave="this.classList.remove('drag-over')" ondrop="handleVidDrop(event)">
            <div class="meta-drop-txt">Drop video file here or <span>click to upload</span><br>MP4, MOV, AVI, MKV, WebM
              supported</div>
          </div>
          <input type="file" id="vid-file" accept="video/*" style="display:none" onchange="processVideo(this.files[0])">
          <div class="meta-error" id="vid-err"></div>
          <div class="meta-results" id="vid-results" style="display:none">
            <video id="vid-preview" controls
              style="width:100%;max-width:480px;border-radius:2px;border:1px solid var(--border);margin-bottom:12px;display:block"></video>
            <div class="meta-card">
              <div class="meta-card-hdr">VIDEO METADATA</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="vid-grid"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- IP/Domain -->
        <div class="meta-pane" id="mpane-ip">
          <div class="meta-h1">IP / DOMAIN LOOKUP</div>
          <div class="meta-sub">Lookup geolocation, ASN, ISP, and open port data for any IP address or domain name.
          </div>
          <div class="meta-error" id="ip-err"></div>
          <div class="meta-form">
            <input class="meta-input" id="ip-input" placeholder="8.8.8.8 or example.com"
              onkeydown="if(event.key==='Enter')lookupIP()">
            <button class="meta-btn" onclick="lookupIP()">LOOKUP</button>
          </div>
          <div class="meta-loading" id="ip-loading">Fetching data</div>
          <div class="meta-results" id="ip-results" style="display:none">
            <div class="meta-card">
              <div class="meta-card-hdr">IP INTELLIGENCE</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="ip-grid"></div>
              </div>
            </div>
            <div id="ip-mini-map" class="map-mini"></div>
          </div>
        </div>


        <!-- Phone Lookup -->
        <div class="meta-pane" id="mpane-phone">
          <div class="meta-h1">PHONE NUMBER LOOKUP</div>
          <div class="meta-sub">Validate and analyze any phone number — country, line type, and formatting details using
            international databases.</div>
          <div class="meta-error" id="phone-err"></div>
          <div class="meta-form">
            <input class="meta-input" id="phone-input" placeholder="+1 212 555 0100"
              onkeydown="if(event.key==='Enter')lookupPhone()">
            <button class="meta-btn" onclick="lookupPhone()">LOOKUP</button>
          </div>
          <div class="meta-loading" id="phone-loading">Querying phone database</div>
          <div class="meta-results" id="phone-results" style="display:none">
            <div class="meta-card">
              <div class="meta-card-hdr">PHONE INTELLIGENCE</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="phone-grid"></div>
              </div>
            </div>
            <div class="meta-card" style="margin-top:8px">
              <div class="meta-card-hdr">EXTERNAL LOOKUP</div>
              <div class="meta-card-body" id="phone-ext-links"
                style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 0"></div>
            </div>
          </div>

          <!-- CARRIER LOOKUP — separate section -->
          <div style="margin-top:18px;border-top:1px solid rgba(255,255,255,.08);padding-top:14px">
            <div class="meta-h1">CARRIER LOOKUP</div>
            <div class="meta-sub">Look up the exact carrier for a US/Canada number using real-time telecom databases.
            </div>
            <div class="meta-error" id="carrier-err"></div>
            <div class="meta-form">
              <input class="meta-input" id="carrier-input" placeholder="+1 212 555 0100"
                onkeydown="if(event.key==='Enter')lookupCarrier()">
              <button class="meta-btn" onclick="lookupCarrier()">LOOKUP CARRIER</button>
            </div>
            <div class="meta-loading" id="carrier-loading">Querying carrier database</div>
            <div class="meta-results" id="carrier-results" style="display:none">
              <div class="meta-card">
                <div class="meta-card-hdr">CARRIER INTELLIGENCE</div>
                <div class="meta-card-body">
                  <div class="meta-grid" id="carrier-grid"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- WHOIS / RDAP -->
        <div class="meta-pane" id="mpane-whois">
          <div class="meta-h1">WHOIS / RDAP LOOKUP</div>
          <div class="meta-sub">Query global RDAP infrastructure for domain registration data — registrar, creation
            date, expiry, nameservers, and registrant country.</div>
          <div class="meta-error" id="whois-err"></div>
          <div class="meta-form">
            <input class="meta-input" id="whois-input" placeholder="example.com"
              onkeydown="if(event.key==='Enter')lookupWhois()">
            <button class="meta-btn" onclick="lookupWhois()">LOOKUP</button>
          </div>
          <div class="meta-loading" id="whois-loading">Querying RDAP registry</div>
          <div class="meta-results" id="whois-results" style="display:none">
            <div class="meta-card">
              <div class="meta-card-hdr">DOMAIN REGISTRATION</div>
              <div class="meta-card-body">
                <div class="meta-grid" id="whois-grid"></div>
              </div>
            </div>
            <div class="meta-card" id="whois-ns-card" style="display:none">
              <div class="meta-card-hdr">NAMESERVERS</div>
              <div class="meta-card-body">
                <div id="whois-ns"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bulk IP Scan -->
        <div class="meta-pane" id="mpane-bulk">
          <div class="meta-h1">BULK IP SCAN</div>
          <div class="meta-sub">Paste up to 20 IP addresses (one per line) to batch-lookup geolocation, ASN, and ISP
            data simultaneously.</div>
          <div class="meta-error" id="bulk-err"></div>
          <div class="meta-form" style="flex-direction:column;align-items:stretch">
            <textarea class="bulk-textarea" id="bulk-input"
              placeholder="8.8.8.8&#10;1.1.1.1&#10;208.67.222.222"></textarea>
            <div style="display:flex;gap:8px;margin-top:6px">
              <button class="meta-btn" onclick="runBulkIP()">RUN SCAN</button>
              <button class="meta-btn" style="background:none;border-color:var(--border);color:var(--dim)"
                onclick="document.getElementById('bulk-input').value='';document.getElementById('bulk-results').style.display='none'">CLEAR</button>
            </div>
          </div>
          <div class="meta-loading" id="bulk-loading">Scanning IPs</div>
          <div class="meta-results" id="bulk-results" style="display:none">
            <div class="meta-card">
              <div class="meta-card-hdr">SCAN RESULTS</div>
              <div class="meta-card-body" style="padding:0">
                <div class="bulk-row hdr">
                  <div>IP</div>
                  <div>Country</div>
                  <div>ASN</div>
                  <div>ISP / Org</div>
                </div>
                <div id="bulk-rows"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
