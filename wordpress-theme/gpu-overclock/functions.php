<?php
function gpu_overclock_assets() {
  wp_enqueue_style('gpu-overclock-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'gpu_overclock_assets');

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
});
