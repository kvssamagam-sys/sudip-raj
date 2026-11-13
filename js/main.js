/**
 * ============================================================================
 * SHUBH VIVAH - ROYAL WEDDING APPLICATION SCRIPT (js/main.js)
 * ============================================================================
 * 100% Offline-Capable, WhatsApp-First RSVP, Service Worker & Local Libraries
 */

// --------------------------------------------------------------------------
// 1. REGISTER SERVICE WORKER (OFFLINE SUPPORT)
// --------------------------------------------------------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[ServiceWorker] Registered with scope:', reg.scope))
      .catch((err) => console.warn('[ServiceWorker] Registration failed:', err));
  });
}

// --------------------------------------------------------------------------
// 2. CONFIGURATION RESOLVER & LOCAL STORAGE MERGER
// --------------------------------------------------------------------------
function getConfig() {
  const cfg = (typeof WEDDING_CONFIG !== 'undefined') ? WEDDING_CONFIG : (window.WEDDING_CONFIG || {});
  try {
    const overrides = localStorage.getItem('wedding_custom_config') || localStorage.getItem('shubh_vivah_custom_config');
    if (overrides) {
      Object.assign(cfg, JSON.parse(overrides));
    }
  } catch (e) {
    console.warn("Could not merge local config overrides", e);
  }
  return cfg;
}

function resolveVal(val, fallback) {
  if (!val || typeof val !== 'string') return fallback || '';
  if (val.trim().startsWith('{{') && val.trim().endsWith('}}')) return fallback || '';
  return val;
}

// --------------------------------------------------------------------------
// 3. SYNTHETIC TEMPLE BELL CHIME (WEB AUDIO API - ZERO EXTERNAL AUDIO)
// --------------------------------------------------------------------------
class RoyalAudioController {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pure bell resonance resembling a sacred brass temple bell / ghanti
  playTempleBell() {
    try {
      this.init();
      const now = this.ctx.currentTime;

      // Strike tone
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.50, now); // C6
      osc1.frequency.exponentialRampToValueAtTime(523.25, now + 1.2);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.8);

      // Warm harmonic overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1567.98, now); // G6
      gain2.gain.setValueAtTime(0.18, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 2.2);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }
}

const royalAudio = new RoyalAudioController();

// --------------------------------------------------------------------------
// 4. INTERACTIVE ROYAL ENVELOPE OPENING SCENE
// --------------------------------------------------------------------------
function initEnvelope() {
  const overlay = document.getElementById('envelope-overlay');
  const wrapper = document.getElementById('envelope-wrapper');
  const seal = document.getElementById('wax-seal');
  const replayBtn = document.getElementById('replay-envelope-btn');

  if (!overlay || !wrapper || !seal) return;

  function openEnvelope() {
    if (wrapper.classList.contains('is-open')) return;

    // 1. Play brass bell chime
    royalAudio.playTempleBell();

    // 2. Confetti Burst using local canvas-confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#FF9933', '#7B1E1E', '#FFF8E7', '#0F5132', '#F3E5AB']
      });
    }

    // 3. 3D flap unfolds and letter slides up
    wrapper.classList.add('is-open');

    // 4. Smoothly reveal main invitation
    setTimeout(() => {
      overlay.classList.add('opened');
      document.body.style.overflow = 'auto';

      // Refresh AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 1100);
  }

  seal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  wrapper.addEventListener('click', openEnvelope);

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      overlay.classList.remove('opened');
      wrapper.classList.remove('is-open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --------------------------------------------------------------------------
// 5. HYDRATION ENGINE (NAMES, DATES, EVENTS, TIMELINE)
// --------------------------------------------------------------------------
function hydratePage() {
  const cfg = getConfig();
  const d = cfg._defaults || {};

  const groom = resolveVal(cfg.groomName, d.groomName || "Aarav Sharma");
  const bride = resolveVal(cfg.brideName, d.brideName || "Ananya Patel");
  const initials = resolveVal(cfg.coupleInitials, d.coupleInitials || `${groom[0]} & ${bride[0]}`);
  const venue = resolveVal(cfg.venueName, d.venueName || "Sri Rameshwar Paradise");
  const address = resolveVal(cfg.venueAddress, d.venueAddress || "Sri Rameshwar Paradise, Varanasi, Uttar Pradesh");
  const hashtag = resolveVal(cfg.hashtag, d.hashtag || "#SudipWedsKhusboo");
  const invocationSub = resolveVal(cfg.invocationSub, "|| Engagement Ceremony ||");
  const saveTheDate = resolveVal(cfg.saveTheDateHeader, "Save Our Date");
  const lead = resolveVal(cfg.invitationLead, "Together with the divine blessings of our elders and families, cordially invite you to celebrate the auspicious Engagement & Ring Ceremony of");

  // Couple names & branding
  document.querySelectorAll('[data-populate="groomName"]').forEach(el => el.textContent = groom);
  document.querySelectorAll('[data-populate="brideName"]').forEach(el => el.textContent = bride);
  document.querySelectorAll('[data-populate="coupleNames"]').forEach(el => el.textContent = `${bride} & ${groom}`);
  document.querySelectorAll('[data-populate="coupleInitials"]').forEach(el => el.textContent = initials);
  document.querySelectorAll('[data-populate="venueName"]').forEach(el => el.textContent = venue);
  document.querySelectorAll('[data-populate="venueAddress"]').forEach(el => el.textContent = address);
  document.querySelectorAll('[data-populate="hashtag"]').forEach(el => el.textContent = hashtag);
  document.querySelectorAll('[data-populate="invocationSub"]').forEach(el => el.textContent = invocationSub);
  document.querySelectorAll('[data-populate="saveTheDateHeader"]').forEach(el => el.textContent = saveTheDate);
  document.querySelectorAll('[data-populate="invitationLead"]').forEach(el => el.textContent = lead);

  // Render Events Array Dynamically (Engagement + Wedding + any future events)
  renderEvents(cfg.events || []);

  // Render Story Timeline
  renderTimeline(cfg.storyTimeline || []);
}

// --------------------------------------------------------------------------
// 6. RENDER EVENT CARDS (CALENDAR + GOOGLE MAPS)
// --------------------------------------------------------------------------
function renderEvents(events) {
  const container = document.getElementById('events-container');
  if (!container) return;
  const cfg = getConfig();

  container.innerHTML = events.map((ev, index) => {
    const encodedAddress = encodeURIComponent(ev.venue + ', ' + ev.address);
    const gmapsUrl = ev.mapsUrl || cfg.mapsUrl || `https://maps.google.com/?q=${encodedAddress}`;
    
    // Calendar URL
    const gcalParams = ev.googleCalendarParams || {};
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(gcalParams.title || ev.title)}&dates=${gcalParams.startIso || '20261128T120000Z'}/${gcalParams.endIso || '20261128T180000Z'}&details=${encodeURIComponent(ev.description || '')}&location=${encodeURIComponent(ev.venue + ', ' + ev.address)}`;

    return `
      <div class="event-card" data-aos="fade-up" data-aos-delay="${index * 150}">
        <div class="flex items-center justify-between mb-4">
          <span class="shubh-vivah-badge text-[0.7rem]">${ev.badge}</span>
          <span class="font-devanagari text-xs text-saffron-dark font-semibold">${ev.hindiTitle || ''}</span>
        </div>

        <h3 class="font-serif text-2xl sm:text-3xl font-bold text-maroon mb-2">${ev.title}</h3>
        <p class="text-sm text-charcoal-light leading-relaxed mb-6 font-sans">${ev.description}</p>

        <div class="space-y-3 border-t border-b border-gold/30 py-4 my-5 text-sm font-sans">
          <div class="flex items-start gap-3">
            <span class="text-gold-dark font-bold">📅</span>
            <div>
              <strong class="text-charcoal block">Date:</strong>
              <span class="text-charcoal-light">${ev.date}</span>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="text-gold-dark font-bold">⏰</span>
            <div>
              <strong class="text-charcoal block">Auspicious Time (Muhurat):</strong>
              <span class="text-charcoal-light">${ev.time}</span>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="text-gold-dark font-bold">📍</span>
            <div>
              <strong class="text-charcoal block">Venue:</strong>
              <span class="text-charcoal-light font-medium">${ev.venue}</span>
              <span class="text-xs text-charcoal-muted block">${ev.address}</span>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="text-gold-dark font-bold">👗</span>
            <div>
              <strong class="text-charcoal block">Dress Code:</strong>
              <span class="text-charcoal-light">${ev.attire}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons (Calendar & Google Maps Link) -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="btn-royal-maroon flex-1 text-center text-xs">
            📅 Add to Calendar
          </a>
          <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-royal-outline flex-1 text-center text-xs">
            📍 Open in Google Maps
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// 7. RENDER OUR STORY TIMELINE (3-ITEM ROMANTIC JOURNEY)
// --------------------------------------------------------------------------
function renderTimeline(timeline) {
  const container = document.getElementById('story-container');
  if (!container) return;

  container.innerHTML = timeline.map((item, idx) => `
    <div class="timeline-card mb-6" data-aos="fade-up" data-aos-delay="${idx * 150}">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-8 h-8 rounded-full bg-ivory border border-gold flex items-center justify-center text-sm font-bold text-maroon">
          ${idx + 1}
        </span>
        <div>
          <h4 class="font-serif text-lg sm:text-xl font-bold text-maroon">${item.title}</h4>
          <span class="text-xs uppercase tracking-wider text-saffron-dark font-semibold">${item.subtitle}</span>
        </div>
      </div>
      <div class="motif-divider">
        <svg class="w-4 h-4 fill-gold" viewBox="0 0 24 24"><path d="M12 2C9 7 4 9 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-5-5-7-8-12z"/></svg>
      </div>
      <p class="text-sm text-charcoal-light leading-relaxed font-sans">${item.description}</p>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// 8. OFFLINE FLIPDOWN COUNTDOWN TIMER
// --------------------------------------------------------------------------
function initFlipdownTimer() {
  const flipContainer = document.getElementById('flipdown');
  if (!flipContainer) return;

  const cfg = getConfig();
  const d = cfg._defaults || {};
  const rawDate = resolveVal(cfg.weddingDate, d.weddingDate || "2026-11-28T18:00:00");
  
  let targetEpoch = Math.floor(new Date(rawDate).getTime() / 1000);
  if (isNaN(targetEpoch)) {
    targetEpoch = Math.floor(new Date("2026-11-28T18:00:00").getTime() / 1000);
  }

  // Clear previous rotors if re-initialized
  flipContainer.innerHTML = '';

  try {
    if (typeof FlipDown !== 'undefined') {
      new FlipDown(targetEpoch, "flipdown", {
        theme: "dark",
        headings: ["Days", "Hours", "Minutes", "Seconds"]
      }).start().ifEnded(() => {
        const note = document.getElementById('countdown-note');
        if (note) note.textContent = "॥ मंगलम् भगवान विष्णुः — The Auspicious Wedding Day is Here! ॥";
      });
    }
  } catch (err) {
    console.warn("FlipDown initialization error:", err);
  }
}

// --------------------------------------------------------------------------
// 9. WHATSAPP-FIRST RSVP SUBMISSION (NO BACKEND REQUIRED)
// --------------------------------------------------------------------------
function initWhatsAppRsvp() {
  const form = document.getElementById('whatsapp-rsvp-form');
  const successModal = document.getElementById('rsvp-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const radioTiles = document.querySelectorAll('.radio-tile');

  // Radio active state styling
  radioTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      radioTiles.forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      const radio = tile.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Check if previously submitted in localStorage
  const savedRsvp = localStorage.getItem('shubh_vivah_rsvp_saved');
  if (savedRsvp) {
    try {
      const data = JSON.parse(savedRsvp);
      const notice = document.getElementById('saved-rsvp-notice');
      if (notice) {
        notice.classList.remove('hidden');
        notice.innerHTML = `
          <div class="p-3 bg-ivory border border-gold rounded-lg text-xs text-charcoal flex items-center justify-between">
            <span>🙏 Pranam <strong>${data.name}</strong>, your response (<strong>${data.attending}</strong> for ${data.guests} guest/s) is recorded!</span>
            <button type="button" id="edit-rsvp-btn" class="underline text-maroon font-bold ml-2">Edit</button>
          </div>
        `;
        document.getElementById('edit-rsvp-btn')?.addEventListener('click', () => {
          notice.classList.add('hidden');
        });
      }
    } catch (e) {
      console.warn(e);
    }
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cfg = getConfig();
    const d = cfg._defaults || {};
    let hostPhone = resolveVal(cfg.hostWhatsApp, d.hostWhatsApp || "9140805890").replace(/[^0-9]/g, '');
    if (hostPhone.length === 10) {
      hostPhone = '91' + hostPhone;
    }

    const name = document.getElementById('rsvp-name').value.trim();
    const guests = document.getElementById('rsvp-guests').value;
    const attendingRadio = document.querySelector('input[name="attending"]:checked');
    const attending = attendingRadio ? attendingRadio.value : "Joyfully Attending";
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    // Save locally
    const rsvpPayload = {
      name,
      guests,
      attending,
      message,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('shubh_vivah_rsvp_saved', JSON.stringify(rsvpPayload));

    // Construct WhatsApp pre-filled text
    const coupleText = `${resolveVal(cfg.brideName, d.brideName)} & ${resolveVal(cfg.groomName, d.groomName)}`;
    const textMsg = 
`🙏 *॥ सगाई समारोह / Engagement Ceremony — RSVP Response ॥*
Dear Host,

*Guest Name:* ${name}
*Attending:* ${attending}
*Number of Guests:* ${guests}
*Wishes / Blessings:* ${message ? message : 'Heartiest congratulations and best wishes to Sudip & Khusboo!'}

_With warm regards to ${coupleText}!_`;

    const encodedMsg = encodeURIComponent(textMsg);
    const waUrl = `https://wa.me/${hostPhone}?text=${encodedMsg}`;

    // Confetti celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FF9933', '#7B1E1E', '#0F5132', '#FFF8E7']
      });
    }

    // Show modal
    if (successModal) {
      document.getElementById('modal-guest-name').textContent = name;
      document.getElementById('whatsapp-send-link').href = waUrl;
      successModal.classList.remove('hidden');
      successModal.classList.add('flex');
    }

    // Also attempt opening WhatsApp link in new tab directly
    window.open(waUrl, '_blank');
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }
}

// --------------------------------------------------------------------------
// 10. INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Hydrate DOM
  hydratePage();

  // Initialize Envelope
  initEnvelope();

  // Initialize FlipDown countdown
  initFlipdownTimer();

  // Initialize WhatsApp RSVP
  initWhatsAppRsvp();

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
});
