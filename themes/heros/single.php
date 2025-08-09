<?php

get_header();


$layout = _themename_meta(get_the_ID(), '__themename_post_layout', 'full');
$sidebar = is_active_sidebar('primary-sidebar');

if($layout === 'sidebar' && !$sidebar){
    $layout = 'full';
}

get_template_part('loop', 'single');

get_footer();

