<article <?php post_class("jp-article bg-white border-t border-gray-100") ?>>
    <?php if (get_the_post_thumbnail() !== ""): ?>
        <header style="background-image: url(<?php the_post_thumbnail_url('full') ?>)" class="jp-article__header before:bg-black/75 before:h-full before:w-full before:absolute relative card-thumbnail w-full h-[350px] bg-no-repeat bg-center bg-cover">
    <?php else: ?>
            <header class="jp-article__header w-full bg-gray-800 py-10">
   <?php endif; ?>
            <div class="header-single-container relative z-10 jp-container h-full flex justify-start items-center">
                <div class="flex flex-col">
                    <?php the_wp_permalink_custom(); ?>
                    <p class="text-slate-300 text-sm italic mb-2"><?php _themename_post_meta(); ?></p>
                    <h1 class="card-title">
                        <a class="card-title__link text-5xl text-white" href="<?php the_permalink(); ?>" title="<?php the_title_attribute() ?>">
                            <?php the_title(); ?>
                        </a>
                    </h1>
                </div>
            </div>
        </header>
    <div class="jp-article__content py-5">
        <div class="jp-container text-base">
            <div class="mb-5 wp-content gap-10 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1">
                <div class="max-w-7xl w-full mx-auto wp-content <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
                    <?php the_content(); ?>
                </div>
                <?php get_template_part('template-parts/page/sidebar'); ?>
            </div>
            <?php
            if (has_category()) {
                echo "<div class='jp-article-cats badge-cats text-sm'>";
                $cats_list = get_the_category_list(esc_html__(' ', '_themname'));
                printf(esc_html__('Publié dans %s', '_themname'), $cats_list);
                echo "</div>";
            }
            if (has_tag()) {
                echo "<div class='jp-article-tags badge-tags'>";
                $tags_list = get_the_tag_list('<ul><li>', '</li><li>', '</li></ul>');
                echo $tags_list;
                echo "</div>";
            }
            ?>
        </div>
</article>