<?php

function the_wp_custom_pagination($args = [], $class = 'pagination') {

    if ($GLOBALS['wp_query']->max_num_pages <= 1) return;

    $args = wp_parse_args($args, [
        'mid_size'           => 1,
        'prev_next'          => true,
        'prev_text'          => '<span class="btn join-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></span>',
        'next_text'          => '<span class="btn join-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>',
        'type'               => 'array',
        'screen_reader_text' => __('Posts Navigation', '_themename'),
    ]);

    $links     = paginate_links($args);
    $next_link = get_previous_posts_link($args['next_text']);
    $prev_link = get_next_posts_link($args['prev_text']);

    $links = paginate_links($args);

    if (!$links) return;

    // Traiter les liens pour injecter les classes DaisyUI
    $output = '';
    foreach ($links as $link) {
        if (strpos($link, 'current') !== false) {
            // Lien actif
            $link = str_replace('class="page-numbers current"', 'class="btn btn-primary join-item"', $link);
        } elseif (strpos($link, 'dots') !== false) {
            // Points de suspension
            $link = str_replace('class="page-numbers dots"', 'class="btn btn-disabled join-item"', $link);
        } else {
            // Lien normal
            $link = str_replace('class="page-numbers"', 'class="btn btn-ghost join-item"', $link);
        }

        $output .= $link;
    }

    echo '<div class="w-full flex justify-end py-2">';
    echo '<nav class="' . esc_attr($class) . 'flex justify-center" role="navigation">';
    echo '  <h2 class="sr-only">' . esc_html($args['screen_reader_text']) . '</h2>';
    echo '  <div class="join">' . $output . '</div>';
    echo '</nav>';
    echo '</div>';

}


function the_wp_permalink_custom () {

    ?>
    <nav class="text-sm breadcrumbs" aria-label="Breadcrumb">
        <ul>
            <li><a href="<?php echo esc_url(home_url('/')); ?>">Accueil</a></li>

            <?php if (is_page() || is_single()) : ?>
                <?php
                $parents = get_post_ancestors(get_the_ID());
                $parents = array_reverse($parents);
                foreach ($parents as $parent_id) :
                    ?>
                    <li>
                        <a href="<?php echo get_permalink($parent_id); ?>">
                            <?php echo get_the_title($parent_id); ?>
                        </a>
                    </li>
                <?php endforeach; ?>
                <li><?php the_title(); ?></li>

            <?php elseif (is_category()) : ?>
                <li><?php single_cat_title(); ?></li>

            <?php elseif (is_search()) : ?>
                <li><?php echo esc_html__('Result for search', '_themename') ?> "<?php the_search_query(); ?>"</li>

            <?php elseif (is_404()) : ?>
                <li><?php echo esc_html__('Error 404', '_themename') ?></li>
            <?php endif; ?>
        </ul>
    </nav>
<?php
}