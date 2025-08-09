<?php
/**
 * Template Name: Full Width Page
 */

get_header();
get_template_part('template-parts/page/header');
?>

    <article <?php post_class(); ?>>
            <div class="jp-page__content">
                <div class="jp-container">
                    <div class="gap-10 my-5 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1">
                    <div class="max-w-7xl w-full mx-auto wp-content col-span-12" >
                        <?php get_template_part('loop', 'page'); ?>
                    </div>
                </div>
            </div>
    </article>
<?php get_footer(); ?>