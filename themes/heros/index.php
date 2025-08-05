<?php get_header(); ?>
<div class="jp-container gap-10 my-10 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1">
    <div class="max-w-7xl w-full mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
        <div class="grid lg:grid-cols-3 lg:gap-10 gap-5 md:grid-cols-2 grid-cols-2">
            <?php get_template_part('loop', 'index'); ?>
        </div>
        <?php the_wp_custom_pagination(); ?>
    </div>
    <?php get_template_part('template-parts/page/sidebar'); ?>
</div>
<?php get_footer(); ?>

