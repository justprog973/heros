<article <?php post_class("bg-white border-t border-gray-100") ?>>
    <?php if (get_the_post_thumbnail() !== ""): ?>
        <header style="background-image: url(<?php the_post_thumbnail_url('full') ?>)" class="before:bg-black/75 before:h-full before:w-full before:absolute relative card-thumbnail w-full h-[350px] bg-no-repeat bg-center bg-cover">
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
    <?php endif; ?>
    <div class="card-body">
        <div class="card-content jp-container text-base">
            <div class="mb-5">
                <?php the_content(); ?>
            </div>
            <?php
            if (has_category()) {
                echo "<div class='card-cats text-sm'>";
                $cats_list = get_the_category_list(esc_html__(' ', '_themname'));
                printf(esc_html__('Publié dans %s', '_themname'), $cats_list);
                echo "</div>";
            }
            if (has_tag()) {
                echo "<div class='card-tags'>";
                $tags_list = get_the_tag_list('<ul><li>', '</li><li>', '</li></ul>');
                echo $tags_list;
                echo "</div>";
            }
            ?>
        </div>
</article>