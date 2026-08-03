<?php
$gpu_theme_uri = get_template_directory_uri();
$gpu_x = 'https://x.com/GPUonBSC';
$gpu_dex = 'https://dexscreener.com/bsc/0x29271ed4b6b8ff41c326c81ca040fd110a4a047e';
$gpu_article = 'https://x.com/GPUonBSC/status/2083916931472691223';
$gpu_partnership = 'https://x.com/GPUonBSC/status/2083894735920570783';
$gpu_contract = '0x9dbef6496134c151b9f9855cc5a1ee77f0324444';
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="GPU bridges Wall Street's AI supercycle with high-velocity BSC meme liquidity.">
  <link rel="icon" href="<?php echo esc_url($gpu_theme_uri . '/favicon.png'); ?>" type="image/png">
  <meta property="og:title" content="GPU — The Meme-Stock Engine">
  <meta property="og:description" content="Meme energy. Stock gravity. Powered on BSC.">
  <meta property="og:image" content="<?php echo esc_url($gpu_theme_uri . '/gpu/hero-yacht.webp'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<audio id="gpu-soundtrack" src="<?php echo esc_url($gpu_theme_uri . '/audio/gpu-overclock.mp3'); ?>" preload="auto" autoplay loop></audio>
<button id="gpu-sound-toggle" type="button" class="sound-toggle" aria-pressed="false" aria-label="Play GPU soundtrack">
  <span class="sound-bars" aria-hidden="true"><i></i><i></i><i></i></span>
  <span data-audio-label>Play song</span>
</button>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <a class="brand" href="#gpu" aria-label="GPU home">
    <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/logo.png'); ?>" alt="GPU logo" width="50" height="50">
    <span>GPU</span>
  </a>
  <nav aria-label="Main navigation">
    <a href="#gpu">GPU</a>
    <a href="#manifesto">Manifesto</a>
    <a href="#article">Article</a>
    <a href="#signals">Signals</a>
    <a href="#gallery">Gallery</a>
  </nav>
  <a class="header-cta" href="<?php echo esc_url($gpu_dex); ?>" target="_blank" rel="noopener noreferrer">View chart <span aria-hidden="true">↗</span></a>
</header>

<main id="main">
  <section class="hero" id="gpu" aria-labelledby="hero-title">
    <img class="hero-image" src="<?php echo esc_url($gpu_theme_uri . '/gpu/hero-yacht.webp'); ?>" alt="GPU character seated on a yacht at sunset overlooking the city skyline">
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-content" data-reveal>
      <p class="eyebrow">Four.meme × Meme-Stock</p>
      <p class="hero-wordmark" aria-hidden="true">GPU</p>
      <h1 id="hero-title">THE MEME-STOCK ENGINE.</h1>
      <p class="hero-copy">$GPU is the premier meme token launched from Four.meme's new Meme-Stock mechanism, paired directly against tokenized NVIDIA stock ($NVDAb).</p>
      <div class="hero-actions">
        <a class="button button-primary" href="<?php echo esc_url($gpu_x); ?>" target="_blank" rel="noopener noreferrer">Enter the overclock <span aria-hidden="true">↗</span></a>
        <a class="button button-ghost" href="<?php echo esc_url($gpu_dex); ?>" target="_blank" rel="noopener noreferrer">View chart <span aria-hidden="true">↗</span></a>
      </div>
      <p class="pair-line">BSC // GPU / NVDAb // MEME-STOCK</p>
      <div class="contract-card" aria-label="GPU contract address">
        <div class="contract-copy">
          <span>Official contract / BSC</span>
          <code><?php echo esc_html($gpu_contract); ?></code>
        </div>
        <button type="button" id="gpu-copy-contract" data-contract="<?php echo esc_attr($gpu_contract); ?>" aria-label="Copy GPU contract address">Copy CA <span aria-hidden="true">⎘</span></button>
        <span id="gpu-copy-status" class="sr-only" aria-live="polite"></span>
      </div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span>Scroll to overclock</span><i></i></div>
  </section>

  <section class="manifesto" id="manifesto" aria-labelledby="manifesto-title">
    <div class="manifesto-copy" data-reveal>
      <p class="section-index">// THE BRIDGE</p>
      <h2 id="manifesto-title">MEME ENERGY.<br>STOCK GRAVITY.</h2>
      <p>Bridging Wall Street's AI supercycle with high-velocity BSC meme liquidity.</p>
      <div class="signal-row" aria-label="GPU project signals"><span>AI SUPERCYCLE</span><span>BNB CHAIN</span><span>NVDAb PAIR</span></div>
    </div>
    <figure class="manifesto-art" data-reveal>
      <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/meme-stock.webp'); ?>" alt="GPU character balancing meme culture and stock market energy" loading="lazy">
    </figure>
  </section>

  <section class="article-section" id="article" aria-labelledby="article-title">
    <div class="article-visual" data-reveal>
      <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/gpu-moon.webp'); ?>" alt="GPU community beneath a luminous eye-shaped moon overlooking a city" loading="lazy">
      <div class="article-visual-label"><span>Official transmission</span><strong>02 / 08 / 2026</strong></div>
    </div>
    <div class="article-copy" data-reveal>
      <p class="section-index">// OFFICIAL X ARTICLE</p>
      <h2 id="article-title">THE MEME-STOCK<br>ENGINE.</h2>
      <p>$GPU is the premier meme token launched from Four.meme's new Meme-Stock mechanism, paired directly against tokenized NVIDIA stock ($NVDAb).</p>
      <p>Bridging Wall Street's AI supercycle with high-velocity BSC meme liquidity.</p>
      <a class="button button-primary" href="<?php echo esc_url($gpu_article); ?>" target="_blank" rel="noopener noreferrer">Read the full article on X <span aria-hidden="true">↗</span></a>
    </div>
  </section>

  <section class="timeline-section" id="signals" aria-labelledby="signals-title">
    <div class="timeline-heading" data-reveal>
      <div><p class="section-index">// LIVE TRANSMISSIONS</p><h2 id="signals-title">SIGNAL<br>TIMELINE</h2></div>
      <p>Two official transmissions. Each card opens its own original post on X.</p>
    </div>
    <div class="timeline-shell">
      <div class="timeline-controls" aria-label="Signal timeline controls">
        <button type="button" aria-label="Previous signal" data-rail-control="signal-timeline" data-direction="-1"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path></svg></button>
        <button type="button" aria-label="Next signal" data-rail-control="signal-timeline" data-direction="1"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path></svg></button>
      </div>
      <div class="timeline-rail" id="signal-timeline" aria-label="GPU official updates" tabindex="0">
        <a class="timeline-card" data-signal-url="https://x.com/GPUonBSC/status/2083916931472691223" href="<?php echo esc_url($gpu_article); ?>" target="_blank" rel="noopener noreferrer">
          <div class="timeline-image"><img src="<?php echo esc_url($gpu_theme_uri . '/gpu/gpu-moon.webp'); ?>" alt="GPU community beneath a luminous eye-shaped moon" loading="lazy"><span>01</span></div>
          <div class="timeline-copy"><div><p>AUG 02 / 2026</p><span>Official article</span></div><h3>The Meme-Stock Engine</h3><p>The official long-form introduction to $GPU, the AI supercycle, and a new high-velocity meme-stock narrative.</p><strong>Open on X <span aria-hidden="true">↗</span></strong></div>
        </a>
        <a class="timeline-card" data-signal-url="https://x.com/GPUonBSC/status/2083894735920570783" href="<?php echo esc_url($gpu_partnership); ?>" target="_blank" rel="noopener noreferrer">
          <div class="timeline-image"><img src="<?php echo esc_url($gpu_theme_uri . '/gpu/four-racing.webp'); ?>" alt="GPU and Four.meme racing drivers high-fiving on the grid" loading="lazy"><span>02</span></div>
          <div class="timeline-copy"><div><p>AUG 02 / 2026</p><span>Collaboration</span></div><h3>GPU × Four.meme</h3><p>One team. One mission. A collaboration signal joining GPU performance culture with the Four.meme ecosystem.</p><strong>Open on X <span aria-hidden="true">↗</span></strong></div>
        </a>
      </div>
    </div>
  </section>

  <section class="chapters" id="power" aria-label="GPU visual pillars">
    <article class="chapter chapter-1">
      <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/power-cloud.webp'); ?>" alt="GPU character standing above the clouds on an oversized graphics card" loading="lazy"><div class="chapter-scrim" aria-hidden="true"></div>
      <div class="chapter-copy" data-reveal><p class="chapter-number">01 / 03</p><p class="chapter-label">POWER</p><h2>Compute becomes culture.</h2><p>Built for the AI supercycle, tuned for the speed and energy of BNB Chain.</p></div>
    </article>
    <article class="chapter chapter-2">
      <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/velocity-truck.webp'); ?>" alt="GPU-branded performance truck driving through a mountain landscape" loading="lazy"><div class="chapter-scrim" aria-hidden="true"></div>
      <div class="chapter-copy" data-reveal><p class="chapter-number">02 / 03</p><p class="chapter-label">VELOCITY</p><h2>High performance. Open road.</h2><p>A meme-stock narrative moving at internet speed—from Wall Street imagery to BSC liquidity.</p></div>
    </article>
    <article class="chapter chapter-3">
      <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/culture-workstation.webp'); ?>" alt="GPU character assembling a neon-lit high-performance workstation" loading="lazy"><div class="chapter-scrim" aria-hidden="true"></div>
      <div class="chapter-copy" data-reveal><p class="chapter-number">03 / 03</p><p class="chapter-label">CULTURE</p><h2>Build it. Power it. Dominate.</h2><p>A visual universe made for builders, traders, gamers, and everyone who lives overclocked.</p></div>
    </article>
  </section>

  <section class="gallery-section" id="gallery" aria-labelledby="gallery-title">
    <div class="gallery-heading" data-reveal>
      <div><p class="section-index">// VISUAL ARCHIVE</p><h2 id="gallery-title">GPU<br>UNIVERSE</h2></div><p>Twelve frames. One overclocked world.</p>
    </div>
    <div class="gallery-rail-shell">
      <div class="gallery-controls" aria-label="Gallery controls">
        <button type="button" aria-label="Previous frame" data-rail-control="gpu-gallery-rail" data-direction="-1"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path></svg></button>
        <button type="button" aria-label="Next frame" data-rail-control="gpu-gallery-rail" data-direction="1"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path></svg></button>
      </div>
      <div class="gallery-grid" id="gpu-gallery-rail" aria-label="GPU visual archive" tabindex="0">
        <?php
        $gpu_gallery = array(
          array('hero-city.webp', 'City of compute', 'Hero character flying above a city of graphics cards', false),
          array('meme-stock.webp', 'Meme × Stock', 'GPU character balancing meme and stock symbols', false),
          array('power-cloud.webp', 'Reach further', 'GPU character standing on a graphics card above clouds', false),
          array('velocity-truck.webp', 'Driven to lead', 'GPU-branded truck moving through mountain roads', false),
          array('culture-workstation.webp', 'The builder', 'GPU character working on a neon performance computer', false),
          array('market-concept.webp', 'Market room', 'Concept artwork of a GPU market dashboard', true),
          array('yacht.webp', 'Max life', 'GPU character on a yacht at sunset', false),
          array('four-racing.webp', 'One team. One mission.', 'GPU and Four.meme racing drivers celebrating together', false),
          array('four-skydive.webp', 'Defy gravity', 'GPU and Four.meme skydivers above the clouds', false),
          array('meme-pizza.webp', 'High performance culture', 'GPU character entering a neon meme pizza restaurant', false),
          array('gpu-moon.webp', 'Render reality', 'GPU community watching a luminous eye-shaped moon above a city', false),
          array('market-room-v2.webp', 'Protocol room', 'Concept artwork of a GPU protocol market screen', true),
        );
        foreach ($gpu_gallery as $gpu_index => $gpu_frame) : ?>
          <figure class="gallery-card gallery-card-<?php echo esc_attr($gpu_index + 1); ?>">
            <div class="gallery-image"><img src="<?php echo esc_url($gpu_theme_uri . '/gpu/' . $gpu_frame[0]); ?>" alt="<?php echo esc_attr($gpu_frame[2]); ?>" loading="lazy"></div>
            <figcaption><span><?php echo esc_html(str_pad((string) ($gpu_index + 1), 2, '0', STR_PAD_LEFT)); ?></span><?php echo esc_html($gpu_frame[1]); ?></figcaption>
            <?php if ($gpu_frame[3]) : ?><p class="concept-label">CONCEPT ART — NOT LIVE MARKET DATA</p><?php endif; ?>
          </figure>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="final-cta" aria-labelledby="final-title">
    <img src="<?php echo esc_url($gpu_theme_uri . '/gpu/yacht.webp'); ?>" alt="GPU character overlooking a city from a yacht at sunset" loading="lazy">
    <div class="final-scrim" aria-hidden="true"></div>
    <div class="final-copy" data-reveal><p class="section-index">// SYSTEM READY</p><h2 id="final-title">PUT ON THE<br>LEATHER JACKET.</h2><p>We're overclocking today.</p><div class="hero-actions"><a class="button button-primary" href="<?php echo esc_url($gpu_x); ?>" target="_blank" rel="noopener noreferrer">Follow on X <span aria-hidden="true">↗</span></a><a class="button button-ghost" href="<?php echo esc_url($gpu_dex); ?>" target="_blank" rel="noopener noreferrer">Open DexScreener <span aria-hidden="true">↗</span></a></div></div>
  </section>
</main>

<footer>
  <div class="footer-brand"><img src="<?php echo esc_url($gpu_theme_uri . '/gpu/logo.png'); ?>" alt="GPU logo" width="82" height="82"><span>GPU</span></div>
  <div class="footer-links"><a href="<?php echo esc_url($gpu_x); ?>" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a><a href="<?php echo esc_url($gpu_article); ?>" target="_blank" rel="noopener noreferrer">Article ↗</a><a href="<?php echo esc_url($gpu_dex); ?>" target="_blank" rel="noopener noreferrer">DexScreener ↗</a></div>
  <p class="disclaimer">$GPU is an independent meme token and is not affiliated with NVIDIA Corporation. Digital assets involve risk. Nothing on this site is financial advice.</p>
  <p class="copyright">© 2026 GPU. OVERCLOCK EVERYTHING.</p>
</footer>

<?php wp_footer(); ?>
</body>
</html>
