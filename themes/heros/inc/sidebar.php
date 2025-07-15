<?php

function _themename_sidebar_widgets(): void
{
    register_sidebar(
        array(
            'id' => 'primary-sidebar',
            'name' => esc_html__('Primary Sidebar', '_themename'),
            'description' => esc_html__('This sidebar appears in the blog posts page.', '_themename'),
            'before_widget' => '<section id="%1$s" class="container-sidebar-widgets mb-5" %2$s>',
            'after_widget' => '</section>',
            'before_title' => '<h5 class="widget-title">',
            'after_title' => '</h5>'
        )
    );
}

$footer_layout = sanitize_text_field(get_theme_mod('_themename_footer_layout', '3,3,3,3'));
$footer_layout = preg_replace('/\s+/','', $footer_layout);
$columns= explode(',', $footer_layout);
$widget_theme = '';

foreach ($columns as $i => $column) {
    register_sidebar(array(
        'id' => 'footer-sidebar-'.($i + 1),
        'name' => sprintf(esc_html__('Footer Widget Column %s', '_themename'), $i+1),
        'description' => esc_html__('Footer widgets.', '_themename'),
        'before_widget' => '<section id="%1$s" class="c-footer-widget mb-5 p-2'. $widget_theme.'" %2$s>',
        'after_widget' => '</section>',
        'before_title' => '<h5>',
        'after_title' => '</h5>'
    ));
}

add_action('widgets_init', '_themename_sidebar_widgets');
