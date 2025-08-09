<?php get_header();
get_template_part('template-parts/page/header');
?>
<article <?php post_class(); ?>>
        <div class="jp-page__content">
            <div class="jp-container">
                <div class="gap-10 my-5 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1">
                    <div class="max-w-7xl w-full mx-auto wp-content <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
                        <?php get_template_part('loop', 'page'); ?>
                    </div>
                    <?php get_template_part('template-parts/page/sidebar'); ?>
                </div>
            </div>
        </div>
</article>
<?php get_footer(); ?>


