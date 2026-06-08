import { useState, useEffect, useRef } from 'react';
import { motion} from 'framer-motion';
import { Plane, Package, Shield, MessageCircle, ArrowRight, Globe } from 'lucide-react';

const LANGS = ['en', 'zh', 'am'];

const copy = {
  en: {
    badge: 'Ethiopia · China Bridge',
    h1: 'Send Anything.', h2: 'Anywhere.', h3: 'Together.',
    sub: 'Connect with trusted travelers flying between Ethiopia and China. Ship packages, earn on every trip.',
    cta: 'Download Now',
    qr: 'Scan to Download',
    langLabel: 'EN',
    feats: ['Post Your Trip', 'Send Packages', 'Trusted Community', 'Real-time Chat'],
  },
  zh: {
    badge: '埃塞俄比亚 · 中国桥梁',
    h1: '随心发货。', h2: '畅通无阻。', h3: '携手共赢。',
    sub: '与往返埃塞俄比亚和中国的可信旅行者建立联系，轻松寄送包裹。',
    cta: '立即下载',
    qr: '扫码下载',
    langLabel: '中文',
    feats: ['发布行程', '寄送物品', '可信社区', '实时聊天'],
  },
  am: {
    badge: 'ኢትዮጵያ · ቻይና ድልድይ',
    h1: 'ማንኛውንም ላክ።', h2: 'ወደ ማንኛውም።', h3: 'አብረን።',
    sub: 'ከኢትዮጵያ እና ቻይና መካከል የሚበሩ ታማኝ ተጓዦችን ያግኙ። ዕቃዎችን ይላኩ።',
    cta: 'ያውርዱ',
    qr: 'ለማውረድ ቃኙ',
    langLabel: 'አማ',
    feats: ['ጉዞ ይለጥፉ', 'ጥቅሎች ይላኩ', 'ታማኝ ማህበረሰብ', 'ቀጥታ ውይይት'],
  },
};

const featIcons = [Plane, Package, Shield, MessageCircle];
const featColors = ['from-orange-500 to-amber-400', 'from-primary to-accent', 'from-emerald-500 to-teal-400', 'from-violet-500 to-purple-400'];

// ── Film grain ────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.025]" aria-hidden>
      <filter id="grain-f">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-f)" />
    </svg>
  );
}

// ── Particle mesh background ──────────────────────────────────────────────────
function ParticleMesh() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const N = 55;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      // Connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(234,88,12,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234,88,12,${p.alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ── Floating orbs ─────────────────────────────────────────────────────────────
function Orbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Large warm orb top-left */}
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: 600, height: 600, top: -200, left: -200, background: 'radial-gradient(circle, rgba(234,88,12,0.28) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Amber orb bottom-right */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{ width: 550, height: 550, bottom: -180, right: -180, background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Small accent mid */}
      <motion.div
        className="absolute rounded-full blur-[80px]"
        style={{ width: 280, height: 280, top: '40%', left: '45%', background: 'radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </div>
  );
}

// ── QR code ───────────────────────────────────────────────────────────────────
function QRCode({ seed = 1, dotColor = '#111827' }) {
  const cells = Array.from({ length: 81 }, (_, i) => {
    const r = Math.floor(i / 9), c = i % 9;
    const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
    return finder ? true : (((i * 1103515245 + 12345 * seed) >>> 0) & 0x8000) !== 0;
  });
  return (
    <div className="grid gap-[3px] p-3 bg-white rounded-2xl shadow-inner" style={{ gridTemplateColumns: 'repeat(9,1fr)', width: 96, height: 96 }}>
      {cells.map((f, i) => (
        <div key={i} className="rounded-[1.5px]" style={{ background: f ? dotColor : 'transparent' }} />
      ))}
    </div>
  );
}

// ── Animated flight path ──────────────────────────────────────────────────────
function FlightPath() {
  return (
    <div className="relative w-full max-w-xs h-8 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 280 20" className="w-full h-8 overflow-visible absolute">
        <defs>
          <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <motion.line x1="22" y1="10" x2="258" y2="10" stroke="url(#lg2)" strokeWidth="1.5" strokeDasharray="7 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} />
        <motion.circle cx="22" cy="10" r="4.5" fill="#f59e0b"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 300 }} />
        <motion.circle cx="258" cy="10" r="4.5" fill="#ea580c"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: 'spring', stiffness: 300 }} />
      </svg>
      <motion.div className="absolute top-1/2 -translate-y-1/2"
        initial={{ left: '7%', opacity: 0 }}
        animate={{ left: ['7%', '87%', '7%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, ease: 'easeInOut', delay: 1.2, repeat: Infinity, repeatDelay: 1.2 }}>
        <Plane className="w-4 h-4 text-primary -rotate-3 drop-shadow" />
      </motion.div>
      <span className="absolute left-0 -bottom-3.5 text-sm">🇪🇹</span>
      <span className="absolute right-0 -bottom-3.5 text-sm">🇨🇳</span>
    </div>
  );
}

export default function Landing() {
  const [lang, setLang] = useState('en');
  const t = copy[lang];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fdf8f4] text-foreground font-jakarta flex flex-col" style={{ maxHeight: '100dvh' }}>
      <Grain />
      <ParticleMesh />
      <Orbs />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 bg-white/60 backdrop-blur-2xl border-b border-orange-100/80 relative z-10">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
            animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <Plane className="w-4.5 h-4.5 text-white" />
          </motion.div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">LinkBridge</span>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 border border-orange-100 rounded-xl p-1">
          {LANGS.map(l => (
            <motion.button key={l} onClick={() => setLang(l)} whileTap={{ scale: 0.92 }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${lang === l ? 'bg-gradient-to-r from-primary to-accent text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {copy[l].langLabel}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* ── MAIN ── */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-6 min-h-0">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* LEFT: Text content */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <Globe className="w-3.5 h-3.5 text-primary" />
              </motion.span>
              <span className="text-xs font-bold text-primary">{t.badge}</span>
            </motion.div>

            {/* Headline — static, no language animation */}
            <div style={{ perspective: 900 }}>
              <motion.h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1]"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span className="block text-foreground">{t.h1}</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-amber-400 bg-clip-text text-transparent">{t.h2}</span>
                <span className="block text-foreground">{t.h3}</span>
              </motion.h1>
            </div>

            {/* Flight path */}
            <FlightPath />

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-2">
              {t.sub}
            </motion.p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-1">
              {t.feats.map((f, i) => {
                const Icon = featIcons[i];
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.07, type: 'spring', stiffness: 220 }}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="flex items-center gap-1.5 bg-white/80 border border-orange-100 rounded-full px-3 py-1.5 shadow-sm cursor-default">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${featColors[i]} flex items-center justify-center`}>
                      <Icon className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] font-semibold text-foreground">{f}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: CTA + QR side by side */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* QR cards row */}
            <div className="flex gap-3 items-start">
              {/* App Download QR */}
              <motion.div
                whileHover={{ scale: 1.04, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white/90 backdrop-blur border border-orange-100 rounded-3xl p-4 flex flex-col items-center gap-2.5 shadow-2xl shadow-orange-200/60"
              >
                <div className="relative">
                  <motion.div className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ background: 'rgba(234,88,12,0.18)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }} />
                  <QRCode seed={1} />
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                  <span className="text-[11px] font-bold text-muted-foreground">{t.qr}</span>
                </div>
                <div className="flex gap-1 text-[10px] text-muted-foreground/60 font-medium">
                  <span>iOS</span><span>·</span><span>Android</span>
                </div>
              </motion.div>

              {/* Telegram QR */}
              <motion.div
                whileHover={{ scale: 1.04, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white/90 backdrop-blur border border-sky-100 rounded-3xl p-4 flex flex-col items-center gap-2.5 shadow-xl shadow-sky-100/60"
              >
                <div className="relative">
                  <motion.div className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ background: 'rgba(14,165,233,0.15)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />
                  <QRCode seed={2} dotColor="#0369a1" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">✈️</span>
                  <span className="text-[11px] font-bold text-sky-700">Telegram</span>
                </div>
                <span className="text-[10px] text-muted-foreground/60 font-medium">Support Group</span>
              </motion.div>

              {/* WeChat QR */}
              <motion.div
                whileHover={{ scale: 1.04, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white/90 backdrop-blur border border-emerald-100 rounded-3xl p-4 flex flex-col items-center gap-2.5 shadow-xl shadow-emerald-100/60"
              >
                <div className="relative">
                  <motion.div className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ background: 'rgba(34,197,94,0.15)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: 1 }} />
                  <QRCode seed={3} dotColor="#15803d" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">💬</span>
                  <span className="text-[11px] font-bold text-emerald-700">WeChat</span>
                </div>
                <span className="text-[10px] text-muted-foreground/60 font-medium">Support Group</span>
              </motion.div>
            </div>

            {/* CTA button */}
            <motion.button
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden w-full h-[54px] px-8 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-2xl shadow-primary/40 flex items-center justify-center gap-2.5">
              {/* shimmer sweep */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{ x: ['-150%', '250%'] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.8 }} />
              <span className="relative z-10">{t.cta}</span>
              <motion.span className="relative z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="flex-shrink-0 text-center py-2.5 text-[10px] text-muted-foreground/50 relative z-10">
        © 2025 LinkBridge · Connecting Ethiopia &amp; China
      </motion.footer>
    </div>
  );
}