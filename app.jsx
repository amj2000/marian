const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "light",
  "font": "mixed",
  "accent": "#a98545",
  "revealColor": true,
  "parallax": 1,
  "layout": "stagger",
  "heroAlign": "left"
} /*EDITMODE-END*/;

/* ---------- reveal-on-scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}});
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <a className="brand" href="#top">MARIAN</a>
      <div className="links">
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact" className="cta">Contact</a>
      </div>
    </nav>);

}

/* ---------- HERO ---------- */
function Hero({ parallax }) {
  const mediaRef = useRef(null);
  const heroRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => heroRef.current && heroRef.current.classList.add('in'), 120);
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (mediaRef.current && y < window.innerHeight * 1.3) {
          mediaRef.current.style.transform = `translate3d(0, ${y * 0.18 * parallax}px, 0) scale(1.04)`;
        }
        raf = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {clearTimeout(t);window.removeEventListener('scroll', onScroll);};
  }, [parallax]);
  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="hero__media" ref={mediaRef}>
        <img src="assets/hero-pier.jpg" alt="MARIAN — 부둣가" />
      </div>
      <div className="hero__veil"></div>
      <div className="hero__inner">
        <div className="hero__top">
          <span className="eyebrow">Actor · Model</span>
          <p className="hero__kr">바람을 입고,<br />풍경이 되다.</p>
        </div>
        <div className="hero__bottom">
          <div className="hero__tagline"><span className="rule"></span><span>Becoming the landscape</span></div>
          <h1 className="hero__word" aria-label="MARIAN">
            {"MARIAN".split("").map((c, i) => <span key={i}>{c}</span>)}
          </h1>
        </div>
      </div>
      <div className="scrollcue"><span className="label">Scroll</span><span className="bar"></span></div>
    </header>);

}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <section className="section about" id="about">
      <div className="about__grid">
        <div className="about__portrait reveal">
          <img src="assets/barn.jpg" alt="안미정 — 푸른 벽 앞에서" />
          <span className="tag">Gangwon, 2022</span>
        </div>
        <div className="about__text">
          <div className="about__label reveal">
            <span className="ix">✦</span><span className="eyebrow">About — 소개</span>
          </div>
          <h2 className="about__h reveal d1">
            쉰을 넘어, 비로소<br /><span className="em">카메라 앞에</span> 섰습니다.
          </h2>
          <p className="about__p reveal d2">늦은 시작이라 말하지 않습니다.
오히려 지금이 가장 나다운 때라 믿으며, 정적 속의 작은 움직임을
카메라에 담아왔습니다.
          </p>
          <p className="about__p reveal d2">
            She stepped in front of the camera in her fifties — not late, but
            arriving exactly when she was most herself. Stillness, texture, and
            the quiet pull of the wind are her language.
          </p>
          <div className="about__meta reveal d3">
            <div><div className="k">Role</div><div className="v">Actor · Model</div></div>
            <div><div className="k">Based</div><div className="v">Seoul, Korea</div></div>
            <div><div className="k">On Screen</div><div className="v">최악의 악 · Disney+, 2023</div></div>
            <div><div className="k">Award</div><div className="v">「나는 모델이다」 美 · 2020</div></div>
            <div><div className="k">Campaign</div><div className="v">포커스미디어코리아, 2021</div></div>
            <div><div className="k">Off Set</div><div className="v">수영, 시인</div></div>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------- STRIP ---------- */
function Strip() {
  const items = ["Actor", "Model", "Poet", "Stillness", "MARIAN", "Editorial"];
  const row = [...items, ...items];
  return (
    <div className="strip">
      <div className="strip__track">
        {row.map((t, i) =>
        <React.Fragment key={i}><span>{t}</span><span className="dot">✦</span></React.Fragment>
        )}
      </div>
    </div>);

}

/* ---------- GALLERY ---------- */
const SHOTS = [
{ src: "assets/hero-pier.jpg", t: "Toward the Light", kr: "부둣가", num: "01", y: "2021" },
{ src: "assets/barn.jpg", t: "Blue Quiet", kr: "푸른 벽", num: "02", y: "2022" },
{ src: "assets/reeds.jpg", t: "Wind", kr: "갈대밭", num: "03", y: "2022" }];

function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="gallery__head">
        <h2 className="reveal">Gallery</h2>
        <p className="sub reveal d1">화보 — 정지된 순간 속<br />흐르는 감정의 기록</p>
      </div>
      <div className="gallery__grid">
        {SHOTS.map((s, i) =>
        <figure className="figure reveal" key={i}>
            <div className="figure__media"><img src={s.src} alt={s.kr} loading="lazy" /></div>
            <figcaption className="figure__cap">
              <span className="t"><span className="num">{s.num}</span>{s.t} <span style={{ opacity: .55 }}>· {s.kr}</span></span>
              <span className="y">{s.y}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>);

}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact__inner">
        <span className="eyebrow reveal">CONTACT</span>
        <h2 className="contact__big reveal d1" style={{ fontWeight: "300", fontFamily: "\"Noto Sans KR\"" }}>새로운 장면을,<br /><span className="em" style={{ fontSize: "70px", fontWeight: "300", fontFamily: "\"Noto Sans\"" }}>함께 만들어요.</span></h2>
        <div className="contact__row reveal d2">
          <div className="item"><div className="k">Email</div><a className="v" href="mailto:name@gmail.com">name@gmail.com</a></div>
          <div className="item"><div className="k">Phone</div><a className="v" href="tel:01012341234">010-1234-1234</a></div>
          <div className="item"><div className="k">Instagram</div><a className="v" href="#">@marian</a></div>
        </div>
      </div>
      <footer className="footer">
        <span className="brand">MARIAN</span>
        <span className="small">MARIAN — Portfolio 2026</span>
      </footer>
    </section>);

}

/* ---------- TWEAKS ---------- */
const ACCENTS = ["#a98545", "#7d4a4a", "#5a6b7a", "#736f66"];
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Mood / 톤" />
      <TweakRadio label="무드" value={t.mood}
      options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }, { label: "Warm", value: "warm" }]}
      onChange={(v) => setTweak('mood', v)} />
      <TweakSection label="Typography" />
      <TweakRadio label="Display 폰트" value={t.font}
      options={[{ label: "Mixed", value: "mixed" }, { label: "Sans", value: "sans" }, { label: "Serif", value: "serif" }]}
      onChange={(v) => setTweak('font', v)} />
      <TweakSection label="Color & Photo" />
      <TweakColor label="Accent" value={t.accent} options={ACCENTS} onChange={(v) => setTweak('accent', v)} />
      <TweakToggle label="호버 시 살아남" value={t.revealColor} onChange={(v) => setTweak('revealColor', v)} />
      <TweakSection label="Motion & Layout" />
      <TweakSlider label="패럴랙스 강도" value={t.parallax} min={0} max={1.8} step={0.1} onChange={(v) => setTweak('parallax', v)} />
      <TweakRadio label="갤러리 배치" value={t.layout}
      options={[{ label: "엇갈림", value: "stagger" }, { label: "정렬", value: "grid" }]}
      onChange={(v) => setTweak('layout', v)} />
      <TweakRadio label="히어로 정렬" value={t.heroAlign}
      options={[{ label: "좌측", value: "left" }, { label: "중앙", value: "center" }]}
      onChange={(v) => setTweak('heroAlign', v)} />
    </TweaksPanel>);

}

/* ---------- APP ---------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-mood', t.mood);
    r.setAttribute('data-font', t.font);
    r.setAttribute('data-layout', t.layout);
    r.setAttribute('data-hero', t.heroAlign);
    r.setAttribute('data-reveal-color', String(t.revealColor));
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--par', String(Math.max(t.parallax, 0.001)));
  }, [t]);
  return (
    <React.Fragment>
      <Nav />
      <Hero parallax={t.parallax} />
      <About />
      <Strip />
      <Gallery />
      <Contact />
      <Tweaks t={t} setTweak={setTweak} />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root-app')).render(<App />);