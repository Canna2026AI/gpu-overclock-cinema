import Image from "next/image";
import { GalleryRail } from "./gallery-rail";
import { ScrollEffects } from "./scroll-effects";

const LINKS = {
  x: "https://x.com/GPUonBSC",
  dex: "https://dexscreener.com/bsc/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e",
};

const chapters = [
  {
    number: "01",
    label: "POWER",
    title: "Compute becomes culture.",
    body: "Built for the AI supercycle, tuned for the speed and energy of BNB Chain.",
    image: "/gpu/power-cloud.webp",
    alt: "GPU character standing above the clouds on an oversized graphics card",
  },
  {
    number: "02",
    label: "VELOCITY",
    title: "High performance. Open road.",
    body: "A meme-stock narrative moving at internet speed—from Wall Street imagery to BSC liquidity.",
    image: "/gpu/velocity-truck.webp",
    alt: "GPU-branded performance truck driving through a mountain landscape",
  },
  {
    number: "03",
    label: "CULTURE",
    title: "Build it. Power it. Dominate.",
    body: "A visual universe made for builders, traders, gamers, and everyone who lives overclocked.",
    image: "/gpu/culture-workstation.webp",
    alt: "GPU character assembling a neon-lit high-performance workstation",
  },
];

const gallery = [
  { src: "/gpu/hero-city.webp", caption: "City of compute", alt: "Hero character flying above a city of graphics cards" },
  { src: "/gpu/meme-stock.webp", caption: "Meme × Stock", alt: "GPU character balancing meme and stock symbols" },
  { src: "/gpu/power-cloud.webp", caption: "Reach further", alt: "GPU character standing on a graphics card above clouds" },
  { src: "/gpu/velocity-truck.webp", caption: "Driven to lead", alt: "GPU-branded truck moving through mountain roads" },
  { src: "/gpu/culture-workstation.webp", caption: "The builder", alt: "GPU character working on a neon performance computer" },
  { src: "/gpu/market-concept.webp", caption: "Market room", alt: "Concept artwork of a GPU market dashboard" },
  { src: "/gpu/yacht.webp", caption: "Max life", alt: "GPU character on a yacht at sunset" },
];

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#gpu" aria-label="GPU home">
          GPU<span className="brand-dot">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#gpu">GPU</a>
          <a href="#manifesto">Manifesto</a>
          <a href="#gallery">Gallery</a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
            X <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a className="header-cta" href={LINKS.dex} target="_blank" rel="noopener noreferrer">
          View chart <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="gpu" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/gpu/hero-city.webp"
            alt="GPU heroine flying above a glowing city made from graphics cards"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-scrim" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content" data-reveal>
            <p className="eyebrow">Four.meme × Meme-Stock</p>
            <p className="hero-wordmark" aria-hidden="true">GPU</p>
            <h1 id="hero-title">THE MEME-STOCK ENGINE.</h1>
            <p className="hero-copy">
              $GPU is the premier meme token launched from Four.meme&apos;s new Meme-Stock mechanism,
              paired directly against tokenized NVIDIA stock ($NVDAb).
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={LINKS.x} target="_blank" rel="noopener noreferrer">
                Enter the overclock <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-ghost" href={LINKS.dex} target="_blank" rel="noopener noreferrer">
                View chart <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="pair-line">BSC // GPU / NVDAb // MEME-STOCK</p>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll to overclock</span>
            <i />
          </div>
        </section>

        <section className="manifesto" id="manifesto" aria-labelledby="manifesto-title">
          <div className="manifesto-copy" data-reveal>
            <p className="section-index">{"// THE BRIDGE"}</p>
            <h2 id="manifesto-title">MEME ENERGY.<br />STOCK GRAVITY.</h2>
            <p>
              Bridging Wall Street&apos;s AI supercycle with high-velocity BSC meme liquidity.
            </p>
            <div className="signal-row" aria-label="GPU project signals">
              <span>AI SUPERCYCLE</span>
              <span>BNB CHAIN</span>
              <span>NVDAb PAIR</span>
            </div>
          </div>
          <figure className="manifesto-art" data-reveal>
            <Image
              src="/gpu/meme-stock.webp"
              alt="GPU character balancing meme culture and stock market energy"
              width={2400}
              height={1200}
              sizes="(max-width: 840px) 100vw, 54vw"
            />
          </figure>
        </section>

        <section className="chapters" id="power" aria-label="GPU visual pillars">
          {chapters.map((chapter, index) => (
            <article className={`chapter chapter-${index + 1}`} key={chapter.label}>
              <Image src={chapter.image} alt={chapter.alt} fill sizes="100vw" />
              <div className="chapter-scrim" />
              <div className="chapter-copy" data-reveal>
                <p className="chapter-number">{chapter.number} / 03</p>
                <p className="chapter-label">{chapter.label}</p>
                <h2>{chapter.title}</h2>
                <p>{chapter.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="gallery-heading" data-reveal>
            <div>
              <p className="section-index">{"// VISUAL ARCHIVE"}</p>
              <h2 id="gallery-title">GPU<br />UNIVERSE</h2>
            </div>
            <p>Seven frames. One overclocked world.</p>
          </div>
          <GalleryRail items={gallery} />
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <Image
            src="/gpu/yacht.webp"
            alt="GPU character overlooking a city from a yacht at sunset"
            fill
            sizes="100vw"
          />
          <div className="final-scrim" />
          <div className="final-copy" data-reveal>
            <p className="section-index">{"// SYSTEM READY"}</p>
            <h2 id="final-title">PUT ON THE<br />LEATHER JACKET.</h2>
            <p>We&apos;re overclocking today.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={LINKS.x} target="_blank" rel="noopener noreferrer">
                Follow on X <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-ghost" href={LINKS.dex} target="_blank" rel="noopener noreferrer">
                Open DexScreener <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">GPU<span>.</span></div>
        <div className="footer-links">
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
          <a href={LINKS.dex} target="_blank" rel="noopener noreferrer">DexScreener ↗</a>
        </div>
        <p className="disclaimer">
          $GPU is an independent meme token and is not affiliated with NVIDIA Corporation.
          Digital assets involve risk. Nothing on this site is financial advice.
        </p>
        <p className="copyright">© 2026 GPU. OVERCLOCK EVERYTHING.</p>
      </footer>
    </>
  );
}
