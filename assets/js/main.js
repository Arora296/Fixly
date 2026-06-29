
// Build the animated headline
(function buildHeadline() {
  const phrase = "The skilled workers you need, exactly when you need them";
  const highlight = "skilled workers";
  const hlWords = highlight.split(' ');
  const words = phrase.split(' ');
  let i = 0, result = '';
  while (i < words.length) {
    if (i + hlWords.length <= words.length) {
      const chunk = words.slice(i, i + hlWords.length).map(w => w.replace(/[^a-z]/gi, '')).join(' ');
      if (chunk.toLowerCase() === highlight.toLowerCase()) {
        const inner = hlWords.map(w => `<span class="word">${w}</span>`).join(' ');
        result += `<span class="hw"><span class="hw-inner">${inner}</span></span> `;
        i += hlWords.length;
        continue;
      }
    }
    result += `<span class="word">${words[i]}</span> `;
    i++;
  }
  document.getElementById('headline').innerHTML = result.trim();
})();

// Section navigation
function show(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  document.getElementById('nav-menu').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hamburger menu
function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('open');
}

// Dark theme toggle
(function initTheme() {
  const saved = localStorage.getItem('fixly-theme');
  if (saved === 'dark') document.body.classList.add('dark');
  updateThemeIcon();
})();

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('fixly-theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark');
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  if (isDark) {
    btn.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
    btn.title = 'Switch to light mode';
  } else {
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.title = 'Switch to dark mode';
  }
}

// Contact form
function submitForm() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// Service modal data
const services = {
  plumbing: {
    title: 'Plumbing',
    tag: 'Home & Maintenance',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/></svg>`,
    desc: 'From a dripping tap to a full bathroom refit, our certified plumbers handle every job with precision. We source quality parts and guarantee our work.',
    points: ['Leak detection and repair', 'Pipe installation and replacement', 'Water heater and geyser service', 'Bathroom and kitchen fitting', 'Drainage and sewer line clearing', 'Emergency call-outs available']
  },
  electrical: {
    title: 'Electrical',
    tag: 'Home & Maintenance',
    icon: `<svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    desc: 'Our licensed electricians handle everything from fitting a new socket to full rewiring. Safety-certified work on every job.',
    points: ['Wiring and rewiring', 'Switchboard and panel upgrades', 'Light fixture installation', 'Safety inspections and certifications', 'Inverter and UPS setup', 'CCTV and smart home wiring']
  },
  painting: {
    title: 'Painting',
    tag: 'Interior & Exterior',
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    desc: 'Transform any space with a fresh coat. Our painters prep surfaces properly, use premium paints, and deliver a finish that lasts.',
    points: ['Interior wall and ceiling painting', 'Exterior facade and boundary walls', 'Texture and decorative finishes', 'Waterproofing coatings', 'Wood staining and varnishing', 'Post-construction clean-up included']
  },
  ac: {
    title: 'AC & HVAC',
    tag: 'Climate Control',
    icon: `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M6 8H5a4 4 0 0 0 0 8h1"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
    desc: 'Beat the Indian heat with reliable AC service. We install, service, and repair all major brands, and offer annual maintenance contracts.',
    points: ['Split and window AC installation', 'Annual maintenance contracts (AMC)', 'Gas refilling and refrigerant top-up', 'Coil cleaning and filter replacement', 'Fault diagnosis and repair', 'Cassette and commercial unit service']
  },
  carpentry: {
    title: 'Carpentry',
    tag: 'Woodwork & Furniture',
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
    desc: 'Skilled carpenters for bespoke furniture, modular kitchens, and structural woodwork. Quality joinery using premium timber and hardware.',
    points: ['Modular kitchen and wardrobe fitting', 'Custom furniture design and build', 'Door and window frame repair', 'False ceiling and partition work', 'Shelving, lofts, and storage', 'Furniture polishing and restoration']
  },
  cleaning: {
    title: 'Deep Cleaning',
    tag: 'Housekeeping',
    icon: `<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
    desc: 'Professional deep-cleaning for homes, offices, and post-construction sites. We use eco-friendly products that are safe for families and pets.',
    points: ['Full home deep cleaning', 'Move-in / move-out cleaning', 'Post-construction debris and dust removal', 'Sofa, carpet and upholstery shampooing', 'Kitchen and bathroom sanitisation', 'Office and commercial premises cleaning']
  },
  renovation: {
    title: 'Renovation',
    tag: 'Remodelling & Refurbishment',
    icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    desc: 'Complete renovation solutions from concept to completion. Our project managers coordinate every trade so you don\'t have to.',
    points: ['Kitchen remodelling', 'Bathroom renovation', 'Living space redesign', 'Flooring — tiles, marble, vinyl, wood', 'False ceiling and partition walls', 'End-to-end project management']
  },
  security: {
    title: 'Security',
    tag: 'Smart Home & Safety',
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    desc: 'Protect what matters most. We install and configure professional-grade security systems tailored to your property and budget.',
    points: ['CCTV camera installation and setup', 'Smart digital door locks', 'Video doorbell fitting', 'Alarm and sensor systems', 'Remote monitoring configuration', 'Existing system upgrades']
  }
};

function openModal(key) {
  const s = services[key];
  if (!s) return;
  document.getElementById('modal-icon').innerHTML = s.icon;
  document.getElementById('modal-title').textContent = s.title;
  document.getElementById('modal-tag').textContent = s.tag;
  document.getElementById('modal-desc').textContent = s.desc;
  const ul = document.getElementById('modal-list');
  ul.innerHTML = s.points.map(p => `<li>${p}</li>`).join('');
  document.getElementById('service-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('service-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('service-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

