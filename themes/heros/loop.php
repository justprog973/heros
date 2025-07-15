<?php if (have_posts()): ?>
    <?php while (have_posts()): the_post(); ?>
        <?php get_template_part('template-parts/post/content'); ?>
    <?php endwhile; ?>
<?php else: ?>
    <?php get_template_part('template-parts/post/content', 'none'); ?>
<?php endif; ?>
