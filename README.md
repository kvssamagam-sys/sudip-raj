# Shubh Vivah (॥ शुभ विवाह ॥) — Offline-Capable Indian Wedding & Engagement Invitation Website

An authentic, regal, mobile-first, 100% offline-capable Indian wedding and engagement invitation website. Built using vanilla HTML5, CSS3, and JavaScript, strictly free of external CDNs, and designed for sharing directly on WhatsApp.

---

## 🪔 Design & Cultural Aesthetic

- **Color Palette:** Royal Imperial Maroon (`#7B1E1E`), Sacred Gold (`#D4AF37`), Festive Saffron (`#FF9933`), Holy Ivory (`#FFF8E7`), and Deep Emerald (`#0F5132`).
- **Sacred Motifs:** Lord Ganesh vector invocation (`॥ श्री गणेशाय नमः ॥`), rotating sacred mandala, lotus dividers, and Vedic shlokas (`॥ वक्रतुण्ड महाकाय ॥`, `॥ मङ्गलं भगवान विष्णुः ॥`, `॥ सदा सौभाग्यवती भव ॥`).
- **Typography:** Display serif headings (`Playfair Display`), clean modern sans body (`Poppins`), and Hindi/Sanskrit script fallback (`Noto Sans Devanagari`). All fonts are self-hosted in `/fonts` (`.woff2`) for instant offline rendering.
- **Mobile-First (360px):** Formatted for mobile phone screens with tap targets ≥ 44px for effortless tapping on WhatsApp links.

---

## ⚙️ (a) How to Edit `config.js` with Names, Date, and Venue

All dynamic content is strictly separated from presentation. You only ever need to edit **`config.js`** at the root of the project:

```javascript
const WEDDING_CONFIG = {
  // Couple Names
  groomName: "Aarav Sharma",           // Replace {{GROOM_NAME}}
  brideName: "Ananya Patel",           // Replace {{BRIDE_NAME}}
  
  // Target Wedding Date & Time (ISO 8601 format)
  weddingDate: "2026-11-28T18:00:00",  // Replace {{WEDDING_DATE}}
  
  // Venue
  venueName: "The Royal Palace & Heritage Gardens",
  venueAddress: "Palace Road, Udaipur, Rajasthan",
  
  // Host WhatsApp Contact (For RSVP receiving)
  hostWhatsApp: "919876543210",        // Replace {{HOST_WHATSAPP}} (Country code + digits, no '+' or spaces)
  
  // Custom Monogram Initials & Hashtag
  coupleInitials: "A & A",
  hashtag: "#AaravWedsAnanya",

  // Events Array (Easily add Mehndi / Sangeet / Haldi)
  events: [
    {
      id: "engagement",
      badge: "Sagai & Ring Ceremony",
      hindiTitle: "॥ सगाई एवं प्रीतिभोज ॥",
      title: "The Engagement & Ring Ceremony",
      date: "Friday, November 27, 2026",
      time: "6:30 PM onwards",
      venue: "Grand Ballroom, The Royal Palace",
      address: "Palace Road, Udaipur, Rajasthan",
      attire: "Traditional Indian / Indo-Western Formal",
      description: "Exchange of rings, family blessings, and royal dinner."
    },
    {
      id: "wedding",
      badge: "Shubh Vivah & Pheras",
      hindiTitle: "॥ शुभ विवाह एवं पाणिग्रहण ॥",
      title: "The Wedding Ceremony (Vedic Vivah)",
      date: "Saturday, November 28, 2026",
      time: "4:30 PM (Baraat) • 6:30 PM (Hast Melap & Pheras)",
      venue: "Royal Lakefront Courtyard & Mandap",
      address: "Palace Road, Udaipur, Rajasthan",
      attire: "Royal Ethnic / Traditional Silk & Sherwani",
      description: "Vedic Vivah rituals, Kanyadaan, and Saat Phere around the sacred Agni."
    }
  ]
};
```

### 💡 Visual Helper: `update-config.html`
You can also open [`update-config.html`](file:///c:/S%20R/PERSONAL/Website%20build/update-config.html) in your browser. It offers a simple UI form that saves directly to browser `localStorage` and generates the exact code snippet for you to copy-paste into `config.js`.

---

## 🌐 (b) How to Host on GitHub Pages & Netlify (100% Free)

Because this website uses pure vanilla HTML, CSS, JavaScript, and local assets, it requires **zero server-side backend or database** and can be hosted for free in under two minutes:

### Option 1: GitHub Pages (Recommended)
1. Initialize a git repository and push your project folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Shubh Vivah invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` and root `/`, then click **Save**.
4. In about 60 seconds, your site will be live at:
   `https://YOUR_USERNAME.github.io/wedding-invitation/`

### Option 2: Netlify (Drag-and-Drop)
1. Visit [Netlify.com](https://www.netlify.com) and log in.
2. In the Netlify dashboard, go to the **Sites** tab.
3. Simply drag and drop the entire project folder (`Website build`) into the upload dropzone.
4. Netlify will deploy it instantly and provide a custom SSL URL (e.g. `https://aarav-weds-ananya.netlify.app`).

---

## ⚡ (c) How PWA Offline Caching Works

This website is built with an **Offline-First Progressive Web App (PWA)** architecture:

1. **Pre-caching on First Load (`sw.js`):**
   When a guest opens the website for the first time while connected to mobile data or Wi-Fi, the Service Worker (`sw.js`) automatically pre-caches all critical assets into browser storage:
   - `index.html` (HTML structure)
   - `manifest.json` (PWA install configuration)
   - `config.js` (Event data)
   - `css/style.css` & `css/tailwind.css` (Stylesheets)
   - `js/main.js` (App logic)
   - `libs/aos.css`, `libs/aos.js`
   - `libs/confetti.browser.min.js`
   - `libs/flipdown.css`, `libs/flipdown.js`
   - All `.woff2` font files in `fonts/`
2. **Cache-First Offline Strategy:**
   On all subsequent visits, the Service Worker intercepts incoming requests and serves them directly from local cache in **0 milliseconds**, even if the guest is in airplane mode or has poor network connectivity at the wedding venue.
3. **Add to Home Screen:**
   Guests on Android and iOS can tap "Add to Home Screen" to install the invitation like a native app with the sacred golden Om icon.

---

## 💬 (d) How to Send on WhatsApp with a Rich Preview Image

When you share your hosted URL on WhatsApp, WhatsApp automatically inspects the Open Graph meta tags embedded in `<head>`:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="॥ शुभ विवाह ॥ Aarav &amp; Ananya's Wedding Invitation">
<meta property="og:description" content="We joyfully invite you to grace our wedding ceremony and shower your divine blessings on Saturday, November 28, 2026. Tap to open invitation.">
<meta property="og:image" content="...">
```

### Pro-Tips for WhatsApp Sharing:
1. Paste your link (e.g. `https://YOUR_USERNAME.github.io/wedding-invitation/`) into the WhatsApp chat bar.
2. **Crucial:** Wait **2 to 3 seconds** before tapping "Send". WhatsApp will fetch the link preview card displaying the title, description, and thumbnail card.
3. Once the rich card appears, tap send!
4. When guests open the link on WhatsApp, they can click the royal envelope, hear the temple bell chime, watch the countdown, add the dates to their Google Calendar, and send their RSVP directly back to your WhatsApp with one tap!

---

## 🛠️ Testing Locally

Start a local HTTP server:
```bash
python -m http.server 8000
```
Then visit:
- **Invitation Site:** `http://localhost:8000/index.html`
- **Helper Tool:** `http://localhost:8000/update-config.html`
- **Admin Control Center:** `http://localhost:8000/admin.html`
