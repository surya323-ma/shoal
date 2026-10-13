// Shoal HUD / intro controller
const $ = (id) => document.getElementById(id);
const ARC = 163.4;

export class Hud {
  constructor(cb) {
    this.cb = cb;
    this.intro = $('intro'); this.status = $('status'); this.ring = $('ring'); this.arc = $('ringArc');
    this.toastEl = $('toast'); this.chips = [...document.querySelectorAll('#gestures li')];
    this.toastT = 0; this.lastStatus = '';

    $('startCam').onclick = async (e) => {
      const b = e.currentTarget; b.disabled = true; b.textContent = 'Waking the camera…';
      await cb.startCamera();
      b.disabled = false; b.textContent = 'Start with camera';
    };
    $('startMouse').onclick = () => cb.startMouse();
    $('btnHelp').onclick = () => this.showIntro();
    $('btnFull').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
    const w = $('btnWater');
    w.onclick = () => { const on = cb.toggleWater(); w.classList.toggle('on', on); w.setAttribute('aria-pressed', on); };
    const c = $('count'), o = $('countOut');
    c.oninput = () => { o.textContent = c.value; cb.setCount(+c.value); };
  }

  hideIntro() { this.intro.classList.add('hide'); }
  showIntro() { this.intro.classList.remove('hide'); }

  toast(msg, ms = 2600) {
    this.toastEl.textContent = msg; this.toastEl.classList.add('show');
    clearTimeout(this.toastT); this.toastT = setTimeout(() => this.toastEl.classList.remove('show'), ms);
  }

  setCount(n) { $('count').value = n; $('countOut').textContent = Math.round(n); }

  update({ gesture, statusText, hold, tipPx }) {
    for (const c of this.chips) c.classList.toggle('active', c.dataset.g === gesture);
    if (statusText !== this.lastStatus) { this.status.textContent = statusText; this.lastStatus = statusText; }
    const show = hold > 0 && hold < 1 && tipPx;
    this.ring.classList.toggle('show', !!show);
    if (show) {
      this.ring.style.transform = `translate(${tipPx.x}px,${tipPx.y}px)`;
      this.arc.style.strokeDashoffset = ARC * (1 - hold);
    }
  }
}
