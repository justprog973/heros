<?php if (have_posts()): ?>
    <?php while (have_posts()): the_post(); ?>
        <?php get_template_part('template-parts/page/content'); ?>
        <?php
        if(comments_open() || get_comments_number()) {
            comments_template();
        }
        ?>
    <?php endwhile; ?>
<?php else: ?>
    <?php get_template_part('template-parts/post/content', 'none'); ?>
<?php endif; ?>