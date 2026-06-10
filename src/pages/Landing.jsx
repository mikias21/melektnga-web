import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Plane, Package, Shield, ArrowRight, MapPin, Users, Star, TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';

const LANGS = ['en', 'zh', 'am'];

const copy = {
  en: {
    badge: 'Ethiopia · China Bridge',
    h1: 'Send Anything.', h2: 'Anywhere.', h3: 'Together.',
    sub: 'Connect with trusted travelers flying between Ethiopia and China. Ship packages, earn on every trip.',
    cta: 'Download Now',
    ctaSub: 'Free to join · Instant verification',
    qr: 'Scan to Download',
    qrAppLabel: 'Download',
    qrAppSub: 'Android',
    qrTelegramLabel: 'Join',
    qrTelegramSub: 'Telegram Support',
    qrWeChatLabel: 'Join',
    qrWeChatSub: 'WeChat Support',
    langLabel: 'EN',
    stats: [
      { label: 'Active Travelers', value: '2,400+' },
      { label: 'Packages Delivered', value: '18K+' },
      { label: 'Countries', value: '2' },
      { label: 'Trust Score', value: '4.9' },
    ],
    feats: ['Post Your Trip', 'Send Packages', 'Trusted Community', 'Real-time Chat'],
    trust: ['Verified IDs', 'Secure Payments', 'Real-time Tracking', '24/7 Support'],
    website: 'melektnga.vercel.app',
  },
  zh: {
    badge: '埃塞俄比亚 · 中国桥梁',
    h1: '随心发货。', h2: '畅通无阻。', h3: '携手共赢。',
    sub: '与往返埃塞俄比亚和中国的可信旅行者建立联系，轻松寄送包裹。',
    cta: '立即下载',
    ctaSub: '免费加入 · 即时验证',
    qr: '扫码下载',
    qrAppLabel: '下载',
    qrAppSub: '安卓和苹果',
    qrTelegramLabel: '加入',
    qrTelegramSub: 'Telegram支持',
    qrWeChatLabel: '加入',
    qrWeChatSub: '微信支持',
    langLabel: '中文',
    stats: [
      { label: '活跃旅行者', value: '2,400+' },
      { label: '已送达包裹', value: '18K+' },
      { label: '覆盖国家', value: '2' },
      { label: '信任评分', value: '4.9' },
    ],
    feats: ['发布行程', '寄送物品', '可信社区', '实时聊天'],
    trust: ['实名认证', '安全支付', '实时追踪', '全天候支持'],
    website: 'melektnga.vercel.app',
  },
  am: {
    badge: 'ኢትዮጵያ · ቻይና',
    h1: 'ማንኛውንም እቃ', h2: 'ወደ ማንኛውም ቦታ', h3: 'ይላኩ።',
    sub: 'በኢትዮጵያ እና ቻይና መካከል የሚበሩ ታማኝ ተጓዦችን ያግኙ። ዕቃዎትን ይላኩ።',
    cta: 'መጫኛውን ያውርዱ',
    ctaSub: 'በነፃ ይቀላቀሉ · በቶሎ ይላኩ',
    qr: 'ለማውረድ ቃኙ',
    qrAppLabel: 'ያውርዱ',
    qrAppSub: 'ለAndroid ',
    qrTelegramLabel: 'ይቀላቀሉ',
    qrTelegramSub: 'Telegram ድጋፍ',
    qrWeChatLabel: 'ይቀላቀሉ',
    qrWeChatSub: 'WeChat ድጋፍ',
    langLabel: 'አማ',
    stats: [
      { label: 'ንቁ ተጓዦች', value: '2,400+' },
      { label: 'የተላኩ ጥቅሎች', value: '18K+' },
      { label: 'አገሮች', value: '2' },
      { label: 'የታመኝ ውጤት', value: '4.9' },
    ],
    feats: ['ጉዞ ይለጥፉ', 'ጥቅሎች ይላኩ', 'ታማኝ ማህበረሰብ', 'ቀጥታ ውይይት'],
    trust: ['የተረጋገጠ መታወቂያ', 'ደህንነቱ የተጠበቅ ክፍያ', 'በእውነተኛ ጊዜ መከታተል', '24/7 ድጋፍ'],
    website: 'melektnga.vercel.app',
  },
};

const trustIcons = [ShieldCheck, ShieldCheck, MapPin, ShieldCheck];

// ── Cinematic Background ─────────────────────────────────────────────────────
function CinematicBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W/2, y: H/2 };
    let time = 0;

    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);
    
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, W, H);
      
      const orb1X = W * 0.2 + Math.sin(time * 0.5) * 100;
      const orb1Y = H * 0.3 + Math.cos(time * 0.3) * 50;
      const orb2X = W * 0.8 + Math.cos(time * 0.4) * 80;
      const orb2Y = H * 0.7 + Math.sin(time * 0.6) * 60;

      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400);
      grad1.addColorStop(0, 'rgba(234, 88, 12, 0.08)');
      grad1.addColorStop(0.5, 'rgba(234, 88, 12, 0.02)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, W, H);

      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 350);
      grad2.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
      grad2.addColorStop(0.5, 'rgba(245, 158, 11, 0.01)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        p.pulse += 0.02;
        const pulseFactor = Math.sin(p.pulse) * 0.1 + 1;
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.02;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        
        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 88, 12, ${p.opacity * pulseFactor})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.06;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(234, 88, 12, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ── Glass Card Component ─────────────────────────────────────────────────────
function GlassCard({ children, className = "", hover = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: hover ? rotateX : 0, rotateY: hover ? rotateY : 0, transformStyle: "preserve-3d" }}
      className={`relative bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-orange-900/5 rounded-3xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-50/30 pointer-events-none" />
      {children}
    </motion.div>
  );
}

// ── Route Visualization ──────────────────────────────────────────────────────
function RouteVisualization() {
  
  return (
    <div className="relative w-full h-32 md:h-40">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 20 50 Q 100 20 200 50 T 380 50"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        
        <motion.circle cx="20" cy="50" r="6" fill="#f59e0b" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} />
        <motion.circle cx="380" cy="50" r="6" fill="#ea580c" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} />
        
        <motion.g
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: [20, 380, 20], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        >
          <Plane className="w-4 h-4 text-primary" fill="currentColor" />
        </motion.g>
      </svg>
      
      <div className="absolute bottom-0 left-0 flex items-center gap-2">
        <MapPin className="w-3 h-3 text-amber-500" />
        <span className="text-[10px] font-semibold text-muted-foreground">ADD</span>
      </div>
      <div className="absolute bottom-0 right-0 flex items-center gap-2">
        <span className="text-[10px] font-semibold text-muted-foreground">CAN</span>
        <MapPin className="w-3 h-3 text-orange-600" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-primary/50"
        />
      </div>
    </div>
  );
}

function QRDisplay({ seed, color, label, sublabel, delay, imageUrl }) {
  const cells = !imageUrl ? Array.from({ length: 81 }, (_, i) => {
    const r = Math.floor(i / 9), c = i % 9;
    const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
    return finder ? true : (((i * 1103515245 + 12345 * seed) >>> 0) & 0x8000) !== 0;
  }) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="p-4 flex flex-col items-center gap-3 min-w-[140px]">
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-xl blur-xl opacity-30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ background: color }}
          />
          {imageUrl ? (
            <div className="w-20 h-20 bg-white rounded-xl shadow-inner relative overflow-hidden flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={label}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-[10px] text-muted-foreground">
                QR Code
              </div>
            </div>
          ) : (
            <div className="grid gap-[2px] p-2.5 bg-white rounded-xl shadow-inner relative" style={{ gridTemplateColumns: 'repeat(9,1fr)', width: 80, height: 80 }}>
              {cells.map((f, i) => (
                <div key={i} className="rounded-[1px]" style={{ background: f ? '#1a1a1a' : 'transparent' }} />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-foreground">{label}</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">{sublabel}</span>
      </GlassCard>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Landing() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const t = copy[lang];
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#faf8f5] text-foreground font-jakarta overflow-x-hidden">
      <CinematicBackground />
      
      {/* ── NAVIGATION ── */}
      <motion.header 
        style={{ y: headerY, opacity: headerOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-orange-900/5' : 'bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Melektnga</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-1 bg-white/60 backdrop-blur-md border border-orange-100/50 rounded-2xl p-1"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative ${lang === l ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {lang === l && (
                  <motion.div
                    layoutId="langPill"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{copy[l].langLabel}</span>
              </button>
            ))}
          </motion.div>
        </nav>
      </motion.header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-22 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
              >
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{t.badge}</span>
              </motion.div>

              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
                >
                  {t.h1}
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-primary via-accent to-amber-400 bg-clip-text text-transparent"
                >
                  {t.h2}
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
                >
                  {t.h3}
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base text-muted-foreground leading-relaxed max-w-md"
              >
                {t.sub}
              </motion.p>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
                onClick={() => window.open('https://melektnga.vercel.app/melektnga-v1.0.0.apk', '_blank')}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-xl shadow-primary/25 flex items-center justify-center gap-3 group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span>{t.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-700">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span>{t.ctaSub}</span>
                </div>
              </motion.div>

              {/* Website Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2 bg-white/80 border border-orange-100/60 rounded-xl px-4 py-2.5 shadow-sm">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">https://</span>
                  <span className="text-sm font-bold text-primary">{t.website}</span>
                </div>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {t.trust.map((item, i) => {
                  const Icon = trustIcons[i];
                  return (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">{item}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Content - Glass Card with Route + Stats + QR */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <GlassCard className="p-6 md:p-8">
                  <RouteVisualization />
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Package Delivery</div>
                          <div className="text-xs text-muted-foreground">In transit · 2 days left</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">$45.00</div>
                        <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Saved 30%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 bg-white/50 rounded-xl border border-orange-100/30 text-center">
                        <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-xs font-bold">24</div>
                        <div className="text-[10px] text-muted-foreground">Travelers</div>
                      </div>
                      <div className="p-3 bg-white/50 rounded-xl border border-orange-100/30 text-center">
                        <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <div className="text-xs font-bold">4.9</div>
                        <div className="text-[10px] text-muted-foreground">Rating</div>
                      </div>
                      <div className="p-3 bg-white/50 rounded-xl border border-orange-100/30 text-center">
                        <Shield className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                        <div className="text-xs font-bold">100%</div>
                        <div className="text-[10px] text-muted-foreground">Secure</div>
                      </div>
                    </div>

                    {/* QR Codes */}
                    <div className="flex justify-center gap-3">
                      <QRDisplay 
                        seed={1} 
                        color="#ea580c" 
                        label={t.qrAppLabel} 
                        sublabel={t.qrAppSub}
                        delay={0.1}
                        imageUrl="/images/qr.png"
                      />
                      <QRDisplay 
                        seed={2} 
                        color="#0ea5e9" 
                        label={t.qrTelegramLabel} 
                        sublabel={t.qrTelegramSub}
                        delay={0.2}
                        imageUrl="/images/telegram.png"
                      />
                      <QRDisplay 
                        seed={3} 
                        color="#22c55e" 
                        label={t.qrWeChatLabel} 
                        sublabel={t.qrWeChatSub}
                        delay={0.3}
                        imageUrl="/images/wechatgroup.jpg"
                      />
                    </div>
                  </div>
                </GlassCard>

                {/* Floating plane element */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-xl"
                >
                  <Plane className="w-8 h-8 text-primary/60" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}