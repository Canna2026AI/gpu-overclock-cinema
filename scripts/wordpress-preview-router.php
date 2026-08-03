<?php
$theme_dir = dirname(__DIR__) . '/wordpress-theme/gpu-overclock';
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$asset = realpath($theme_dir . $path);

if ($path !== '/' && $asset && str_starts_with($asset, realpath($theme_dir)) && is_file($asset)) {
  return false;
}

function language_attributes() { echo 'lang="en"'; }
function bloginfo($key) { echo $key === 'charset' ? 'UTF-8' : 'GPU'; }
function body_class() { echo 'class="gpu-wordpress-preview"'; }
function wp_body_open() {}
function get_template_directory_uri() { return 'http://127.0.0.1:8081'; }
function esc_url($value) { return htmlspecialchars($value, ENT_QUOTES); }
function esc_attr($value) { return htmlspecialchars($value, ENT_QUOTES); }
function esc_html($value) { return htmlspecialchars($value, ENT_QUOTES); }
function wp_head() {
  echo '<title>GPU — The Meme-Stock Engine</title>';
  echo '<link rel="stylesheet" href="/style.css">';
}
function wp_footer() { echo '<script src="/assets/site.js"></script>'; }

require $theme_dir . '/index.php';
