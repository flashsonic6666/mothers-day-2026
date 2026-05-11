// ============ RENDERING ============
// Relies on `ingredients` from data.js (loaded before this file).

function makeIngredientCard(item) {
  const el = document.createElement('div');
  el.className = 'ingredient';
  el.draggable = true;
  el.dataset.id = item.id;
  el.dataset.text = item.text;
  el.dataset.quip = item.quip;
  el.dataset.effect = item.effect || '#7a2230';
  if (item.image) el.dataset.image = item.image;
  el.innerHTML = `<span class="num">${String(item.id).padStart(2, '0')}</span> ${item.text}`;
  return el;
}

const leftCol = document.getElementById('ingredients-left');
const rightCol = document.getElementById('ingredients-right');

ingredients.slice(0, 8).forEach(i => leftCol.appendChild(makeIngredientCard(i)));
ingredients.slice(8).forEach(i => rightCol.appendChild(makeIngredientCard(i)));

// ============ STATE ============
let droppedRealIngredients = 0;
const TOTAL = ingredients.length;
const usedSet = new Set();

const potWrapper = document.getElementById('potWrapper');
const potTint = document.getElementById('potTint');
const speech = document.getElementById('speech');
const steamLayer = document.getElementById('steamLayer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

let draggedEl = null;

document.querySelectorAll('.ingredient').forEach(el => {
  el.addEventListener('dragstart', e => {
    draggedEl = el;
    el.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', el.dataset.id);
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  el.addEventListener('click', () => {
    if (!el.classList.contains('used')) handleDrop(el);
  });
});

potWrapper.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  potWrapper.classList.add('dragover');
});
potWrapper.addEventListener('dragleave', () => potWrapper.classList.remove('dragover'));
potWrapper.addEventListener('drop', e => {
  e.preventDefault();
  potWrapper.classList.remove('dragover');
  if (draggedEl && !draggedEl.classList.contains('used')) handleDrop(draggedEl);
});

function handleDrop(el) {
  const id = el.dataset.id;
  if (usedSet.has(id)) return;
  const quip = el.dataset.quip;
  const effect = el.dataset.effect;
  const image = el.dataset.image;

  flyToPot(el);
  setTimeout(() => { el.classList.add('used'); usedSet.add(id); }, 50);

  setTimeout(() => {
    potWrapper.classList.add('splash');
    setTimeout(() => potWrapper.classList.remove('splash'), 500);

    // Recolor the tint overlay using the ingredient's effect color
    potTint.style.background = `radial-gradient(ellipse 30% 8% at 50% 48%, ${effect} 0%, transparent 70%)`;

    spawnBubbles(6);
    showSpeech(quip);
    if (image) flashImage(image);

    droppedRealIngredients++;
    const pct = (droppedRealIngredients / TOTAL) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = `${droppedRealIngredients} / ${TOTAL}`;
    if (droppedRealIngredients === TOTAL) setTimeout(triggerFinale, 1400);
  }, 550);
}

function flashImage(src) {
  const overlay = document.getElementById('flashOverlay');
  const img = document.getElementById('flashImg');
  if (!overlay || !img) { console.warn('[flash] overlay/img element missing'); return; }

  // Anchor the flash on top of the pot, ~1.5x the pot's size
  const potRect = potWrapper.getBoundingClientRect();
  const size = Math.max(potRect.width, potRect.height) * 1.5;
  const cx = potRect.left + potRect.width / 2;
  const cy = potRect.top + potRect.height / 2;
  console.log('[flash]', src, 'pot:', potRect, 'size:', size);

  img.src = src;
  // Set everything inline so no CSS rule can fight us
  overlay.style.position = 'fixed';
  overlay.style.zIndex = '80';
  overlay.style.pointerEvents = 'none';
  overlay.style.width  = size + 'px';
  overlay.style.height = size + 'px';
  overlay.style.left   = (cx - size / 2) + 'px';
  overlay.style.top    = (cy - size / 2) + 'px';
  overlay.style.transition = 'none';
  overlay.style.opacity = '0';
  overlay.style.transform = 'scale(0.35) rotate(-10deg)';

  // Animate IN on next frame so the transition takes effect
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.2s ease-out, transform 0.55s cubic-bezier(.34,1.56,.64,1)';
      overlay.style.opacity = '1';
      overlay.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Animate OUT after a hold
  clearTimeout(flashImage._t);
  flashImage._t = setTimeout(() => {
    overlay.style.transition = 'opacity 0.35s ease-in, transform 0.4s ease-in';
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.9) rotate(-3deg)';
  }, 1100);
}

function flyToPot(el) {
  const rect = el.getBoundingClientRect();
  const potRect = potWrapper.getBoundingClientRect();
  const fly = el.cloneNode(true);
  fly.classList.add('fly');
  fly.style.left = rect.left + 'px';
  fly.style.top = rect.top + 'px';
  fly.style.width = rect.width + 'px';
  document.body.appendChild(fly);
  fly.offsetHeight;
  const targetX = potRect.left + potRect.width / 2 - rect.width / 2;
  const targetY = potRect.top + potRect.height / 2 - rect.height / 2;
  fly.style.left = targetX + 'px';
  fly.style.top = targetY + 'px';
  fly.style.transform = 'scale(0.2) rotate(360deg)';
  fly.style.opacity = '0';
  setTimeout(() => fly.remove(), 700);
}

function spawnBubbles(count) {
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 8 + Math.random() * 24;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = (35 + Math.random() * 30) + '%';
    bubble.style.top = (40 + Math.random() * 10) + '%';
    bubble.style.animationDelay = (Math.random() * 0.4) + 's';
    bubble.style.animationDuration = (1.8 + Math.random() * 0.8) + 's';
    steamLayer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
  }
}

let speechTimer = null;
function showSpeech(text) {
  speech.classList.remove('visible');
  clearTimeout(speechTimer);
  setTimeout(() => {
    speech.textContent = text;
    speech.classList.add('visible');
  }, 200);
  speechTimer = setTimeout(() => {
    speech.classList.remove('visible');
    setTimeout(() => {
      if (droppedRealIngredients < TOTAL) {
        speech.textContent = "Mmm. Keep 'em coming.";
        speech.classList.add('visible');
      }
    }, 400);
  }, 3500);
}

setTimeout(() => speech.classList.add('visible'), 500);

function triggerFinale() {
  potWrapper.classList.add('shaking');
  showSpeech("SHE'S READY. STAND BACK.");
  const burstInterval = setInterval(() => spawnBubbles(8), 200);
  setTimeout(() => {
    clearInterval(burstInterval);
    potWrapper.classList.remove('shaking');
    showReveal();
  }, 2800);
}

function showReveal() {
  const reveal = document.getElementById('reveal');
  const grid = document.getElementById('traitsGrid');
  ingredients.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'trait-card';
    card.style.animationDelay = (1.2 + idx * 0.08) + 's';
    card.innerHTML = `<span class="badge">${String(item.id).padStart(2,'0')}</span>${item.text}`;
    grid.appendChild(card);
  });
  reveal.classList.add('active');
  setTimeout(spawnConfetti, 400);
}

function spawnConfetti() {
  const colors = ['#7a2230', '#d96d7a', '#d4a14a', '#5c6b3a', '#b8552c', '#a87425'];
  const reveal = document.getElementById('reveal');
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.left = Math.random() * 100 + '%';
      c.style.top = '-20px';
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      reveal.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }, i * 30);
  }
  setInterval(() => {
    if (!reveal.classList.contains('active')) return;
    for (let i = 0; i < 5; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.left = Math.random() * 100 + '%';
      c.style.top = '-20px';
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      reveal.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }, 600);
}

// If pot.png is missing, show a friendly placeholder message
document.getElementById('potImg').addEventListener('error', function() {
  this.style.display = 'none';
  const msg = document.createElement('div');
  msg.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;border:2px dashed #2a1a0f;border-radius:12px;font-family:Caveat,cursive;font-size:22px;color:#7a2230;background:#fff5dc;';
  msg.innerHTML = '🖼️<br/>Drop your pot drawing<br/>at <code style="font-family:DM Mono,monospace;font-size:14px;background:#f0e3c4;padding:2px 6px;border-radius:4px;">images/pot.png</code>';
  this.parentNode.appendChild(msg);
});
