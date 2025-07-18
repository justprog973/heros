<?php if (have_posts()): ?>
    <?php while (have_posts()): the_post(); ?>
        <?php get_template_part('template-parts/single/content'); ?>
        <?php
        if(get_theme_mod('_themename_display_author_info', true)) {
            get_template_part('template-parts/single/author');
        }
        get_template_part('template-parts/single/navigation');
        ?>
    <?php
        if(comments_open() || get_comments_number()) {
            comments_template();
        }
    ?>
    <?php endwhile; ?>
<?php else: ?>
    <?php get_template_part('template-parts/post/content', 'none'); ?>
<?php endif; ?>