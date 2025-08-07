<div class="gap-10 my-5 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1">
    <div class="max-w-7xl w-full mx-auto wp-content <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
        <?php the_content(); ?>
    </div>
   <?php get_template_part('template-parts/page/sidebar'); ?>
</div>