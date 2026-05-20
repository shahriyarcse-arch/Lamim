/* =============================================
   LAMIM — NOTIFICATIONS & BROADCASTS
   ============================================= */
const Notifications = {
  broadcasts: [],
  lastSeen: DB.rawGet('lamim_last_broadcast') || '0',

  async init() {
    console.log("Notifications: Initializing...");
    await this.fetch();
    this.setupRealtime();
    
    // Auto-refresh every 60s as fallback
    setInterval(() => this.fetch(), 60000);
  },

  async fetch() {
    if (!window.supabaseClient) return;
    try {
      const { data, error } = await window.supabaseClient
        .from('app_broadcasts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      if (data) {
        this.broadcasts = data;
        this.updateUI();
      }
    } catch (e) {
      console.warn("Notifications: Fetch failed", e);
    }
  },

  updateUI() {
    if (!this.broadcasts.length) return;
    const latestId = String(this.broadcasts[0].id);
    const hasNew = latestId !== String(this.lastSeen);
    
    const badgeIds = ['home-badge-sidebar', 'home-badge-bottom', 'global-badge-top', 'global-badge-top-section', 'sidebar-msg-badge'];
    badgeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = hasNew ? 'block' : 'none';
    });
  },

  show() {
    if (!this.broadcasts.length) {
      Utils.toast("No messages found", "info");
      return;
    }

    // Mark as seen
    this.lastSeen = String(this.broadcasts[0].id);
    DB.rawSet('lamim_last_broadcast', this.lastSeen);
    this.updateUI();
    
    const listHtml = this.broadcasts.map((b, idx) => {
      const isLatest = idx === 0;
      const animationStyle = `animation: card-entry 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: ${idx * 80}ms;`;
      
      return `
        <div class="an-card" style="position:relative; display:flex; flex-direction:column; align-items:flex-start; flex-shrink:0; gap:8px; padding:20px; border-radius:20px; border:1px solid rgba(255, 255, 255, 0.04); background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); word-break: break-word; overflow-wrap: anywhere; overflow: hidden; ${animationStyle}">
          
          <!-- Subtle Glowing Corner Light for latest message -->
          ${isLatest ? `
            <div style="position:absolute; top:-20px; right:-20px; width:60px; height:60px; border-radius:50%; background:radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0) 70%); filter:blur(10px); pointer-events:none;"></div>
          ` : ''}

          <!-- Left glowing strip -->
          <div class="an-strip" style="position:absolute; left:0; top:15%; bottom:15%; width:3.5px; border-radius:0 4px 4px 0; background: ${isLatest ? 'linear-gradient(to bottom, #a78bfa, #c084fc)' : 'rgba(255,255,255,0.1)'}; box-shadow: ${isLatest ? '0 0 10px rgba(167,139,250,0.5)' : 'none'}; transition: all 0.3s;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; z-index:1;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background: ${isLatest ? 'rgba(167, 139, 250, 0.15)' : 'rgba(255,255,255,0.05)'}; color: ${isLatest ? '#c084fc' : 'rgba(255,255,255,0.5)'}; padding: 3px 10px; border-radius: 20px; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                ${isLatest ? '● Latest Announcement' : 'Announcement'}
              </span>
            </div>
            <span style="font-size:11px; font-weight:600; color:rgba(255, 255, 255, 0.3); display:flex; align-items:center; gap:4px;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="opacity:0.5;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${Utils.timeAgo(b.created_at)}
            </span>
          </div>

          <div style="font-size:14px; font-weight:550; line-height:1.6; color:rgba(255, 255, 255, 0.85); margin-top:6px; z-index:1; font-family:inherit; transition: color 0.3s; text-align: left; width: 100%;">
            ${Utils.escapeHTML(b.message)}
          </div>
        </div>
      `;
    }).join('');

    const modalHtml = `
      <div id="broadcast-modal" class="modal-overlay" onclick="this.remove()" style="z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(6, 6, 10, 0.8); backdrop-filter:blur(20px) saturate(190%); transition:all 0.3s;">
        <div class="modal-content anim-scale-up" onclick="event.stopPropagation()" style="position:relative; width:92%; max-width:480px; max-height:82vh; border-radius:28px; background:rgba(18, 18, 28, 0.9); border:1px solid rgba(255, 255, 255, 0.08); box-shadow:0 30px 60px -15px rgba(0,0,0,0.8), 0 0 50px -10px rgba(167, 139, 250, 0.15); padding:24px; display:flex; flex-direction:column; overflow:hidden;">
          
          <!-- Modern Mesh Background Blobs (Depth Effect) -->
          <div style="position: absolute; top: -10%; left: -20%; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0) 70%); filter: blur(40px); pointer-events: none; z-index: 0; animation: blob-float 8s infinite ease-in-out;"></div>
          <div style="position: absolute; bottom: -10%; right: -20%; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(96,165,250,0.12) 0%, rgba(96,165,250,0) 70%); filter: blur(40px); pointer-events: none; z-index: 0; animation: blob-float 6s infinite ease-in-out alternate;"></div>

          <style>
            @keyframes blob-float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-15px) scale(1.08); }
            }
            @keyframes card-entry {
              0% { opacity: 0; transform: translateY(18px) scale(0.97); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .an-card:hover {
              transform: translateY(-3px) scale(1.01);
              border-color: rgba(167, 139, 250, 0.25) !important;
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%) !important;
              box-shadow: 0 10px 24px -8px rgba(167, 139, 250, 0.3);
            }
            .an-card:hover .an-strip {
              background: #a78bfa !important;
              box-shadow: 0 0 12px #a78bfa !important;
            }
            .lb-scroll::-webkit-scrollbar {
              width: 5px;
            }
            .lb-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .lb-scroll::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.05);
              border-radius: 99px;
            }
            .lb-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(167, 139, 250, 0.3);
            }
          </style>
          
          <!-- Sticky Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:18px; z-index: 1;">
            <div style="display:flex; align-items:center;">
              <div style="position:relative; width:44px; height:44px; border-radius:14px; background:rgba(167, 139, 250, 0.1); display:flex; align-items:center; justify-content:center; color:#a78bfa; margin-right:12px; border:1px solid rgba(167, 139, 250, 0.2); box-shadow:0 4px 12px rgba(167,139,250,0.1)">
                <!-- Notification Badge Dot -->
                <div style="position:absolute; top:2px; right:2px; width:8px; height:8px; border-radius:50%; background:#ef4444; border:1.5px solid #12121c; box-shadow: 0 0 6px #ef4444;"></div>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: bell-bounce 2s infinite ease-in-out">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div>
                <h3 style="margin:0; font-size:18px; font-weight:800; background:linear-gradient(135deg, #ffffff 40%, #c084fc 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; letter-spacing:0.5px;">Announcements</h3>
                <div style="font-size:10px; color:rgba(255,255,255,0.45); font-weight:700; margin-top:2px; text-transform:uppercase; letter-spacing:0.8px;">Spiritual Feed & System Alerts</div>
              </div>
            </div>
            
            <button onclick="document.getElementById('broadcast-modal').remove()" style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); display:flex; align-items:center; justify-content:center; font-size:14px; cursor:pointer; transition:all 0.2s; outline:none;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.color='#fff'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.color='rgba(255,255,255,0.5)'; this.style.transform='scale(1)';">&times;</button>
          </div>
          
          <!-- Scrollable Content -->
          <div class="lb-scroll" style="display:flex; flex-direction:column; gap:12px; overflow-y:auto; padding-right:4px; max-height:calc(82vh - 110px); z-index: 1;">
            ${listHtml}
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  setupRealtime() {
    if (!window.supabaseClient) return;
    window.supabaseClient
      .channel('broadcast_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'app_broadcasts' }, (payload) => {
        console.log('Notifications: New broadcast received!', payload);
        this.fetch();
        Utils.toast("New Admin Message Received", "info");
      })
      .subscribe();
  }
};

// Initialize immediately with interactive readyState safeguard
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Notifications.init());
} else {
  Notifications.init();
}
