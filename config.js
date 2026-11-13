/**
 * ============================================================================
 * ENGAGEMENT INVITATION CONFIGURATION (config.js)
 * ============================================================================
 * Sudip Raj & Khusboo Gupta — Engagement Ceremony
 */

const WEDDING_CONFIG = {
  // Couple Information
  groomName: "Sudip Raj",
  brideName: "Khusboo Gupta",
  weddingDate: "2026-12-15T18:30:00", // ISO format: Tuesday, Dec 15, 2026 at 6:30 PM
  venueName: "Sri Rameshwar Paradise",
  venueAddress: "Sri Rameshwar Paradise, Varanasi, Uttar Pradesh",
  
  // Direct Google Maps Link
  mapsUrl: "https://maps.google.com/maps?udm&fvr=1&pvq=Cg0vZy8xMWxjXzJ5amwyIhIKDHdlZGRpbmcgbGF3bhACGAOJAe1s0SIYN5PR&lqi=Chh3ZWRkaW5nIGxhd24gaW4gdmFyYW5hc2lIwoS78a-ygIAIWiQQABABGAEYAhgDIhh3ZWRkaW5nIGxhd24gaW4gdmFyYW5hc2mSAQ13ZWRkaW5nX3ZlbnVl&vet=10CAAQoqAOahcKEwjA0bmcrYSYAxUAAAAAHQAAAAAQBw..i&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x398e31001f804bd7:0xd193371822d16ced",

  // Host WhatsApp Contact (For Instant WhatsApp RSVP)
  hostWhatsApp: "9140805890", // 9140805890 / +91-9140805890

  // Couple Monogram Initials
  coupleInitials: "S & K",

  // Custom Titles & Cultural Invocations for Engagement
  invocationSanskrit: "॥ श्री गणेशाय नमः ॥",
  invocationSub: "|| Engagement Ceremony ||",
  saveTheDateHeader: "Save Our Date",
  invitationLead: "Together with the divine blessings of our elders and families",
  invitationAction: "cordially invite you to celebrate the auspicious Engagement & Ring Ceremony of",
  invitationQuote: "“Two lives, two hearts, joined together in friendship, united forever in love.”",
  hashtag: "#SudipWedsKhusboo",

  // Primary Host Family Details
  hostFamily: "The Raj & Gupta Families",

  // Default Fallbacks
  _defaults: {
    groomName: "Sudip Raj",
    brideName: "Khusboo Gupta",
    weddingDate: "2026-12-15T18:30:00",
    venueName: "Sri Rameshwar Paradise",
    venueAddress: "Sri Rameshwar Paradise, Varanasi, Uttar Pradesh",
    hostWhatsApp: "9140805890",
    coupleInitials: "S & K",
    hashtag: "#SudipWedsKhusboo"
  },

  // Engagement Events
  events: [
    {
      id: "ring-ceremony",
      badge: "Sagai & Ring Exchange",
      hindiTitle: "॥ सगाई एवं मुद्रिका बंधन ॥",
      title: "The Engagement & Ring Ceremony",
      date: "Tuesday, December 15, 2026",
      time: "6:30 PM onwards",
      venue: "Sri Rameshwar Paradise",
      address: "Varanasi, Uttar Pradesh",
      attire: "Traditional Indian / Festive Ethnic Formal",
      description: "Join us for the auspicious exchange of rings, family blessings, and a celebratory gathering as Sudip & Khusboo begin their journey together.",
      googleCalendarParams: {
        title: "Engagement Ceremony - Khusboo & Sudip",
        startIso: "20261215T130000Z",
        endIso: "20261215T173000Z",
        description: "The Auspicious Engagement & Ring Ceremony of Khusboo Gupta and Sudip Raj at Sri Rameshwar Paradise, Varanasi."
      }
    },
    {
      id: "dinner-celebration",
      badge: "Dinner & Musical Sangeet",
      hindiTitle: "॥ प्रीतिभोज एवं संगीत ॥",
      title: "Royal Dinner & Sangeet Evening",
      date: "Tuesday, December 15, 2026",
      time: "8:00 PM onwards",
      venue: "Sri Rameshwar Paradise",
      address: "Varanasi, Uttar Pradesh",
      attire: "Evening Glamour & Dancing Shoes",
      description: "An enchanting evening featuring live music, heartfelt toasts, joyful dancing, and a sumptuous royal banquet.",
      googleCalendarParams: {
        title: "Engagement Dinner & Celebration - Khusboo & Sudip",
        startIso: "20261215T143000Z",
        endIso: "20261215T190000Z",
        description: "Dinner, Music & Celebration for Khusboo Gupta and Sudip Raj at Sri Rameshwar Paradise."
      }
    }
  ],

  // 3-Item Story Timeline
  storyTimeline: [
    {
      title: "Pehli Mulaqaat (The First Glance)",
      subtitle: "A Serendipitous Beginning",
      description: "Two souls brought together by destiny, sharing laughter and finding an effortless comfort that felt like home from the very first conversation.",
      icon: "lotus"
    },
    {
      title: "Roka & Family Blessings",
      subtitle: "Two Families Unite",
      description: "With heartfelt blessings, sweet traditional delicacies, and shared joy, our families united to welcome each other with love and reverence.",
      icon: "mandala"
    },
    {
      title: "The Ring Ceremony (Sagai)",
      subtitle: "The Promise of Forever",
      description: "Exchanging rings as a token of eternity, stepping forward hand in hand into a lifetime of shared dreams and unconditional companionship.",
      icon: "paisley"
    }
  ]
};

// Global exposition
if (typeof window !== 'undefined') {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WEDDING_CONFIG;
}
