<?php
function gpu_overclock_assets() {
  $version = '2.0.0';
  wp_enqueue_style('gpu-overclock-style', get_stylesheet_uri(), array(), $version);
  wp_enqueue_script(
    'gpu-overclock-site',
    get_template_directory_uri() . '/assets/site.js',
    array(),
    $version,
    true
  );
}
add_action('wp_enqueue_scripts', 'gpu_overclock_assets');

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('html5', array('script', 'style'));
});

add_filter('document_title_parts', function ($title) {
  $title['title'] = 'GPU — The Meme-Stock Engine';
  return $title;
});
