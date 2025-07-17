<article <?php post_class(); ?>>
    <?php
        if (get_the_post_thumbnail() !== ""): ?>
            <header style="background-image: url(<?php the_post_thumbnail_url('full') ?>)"  class="before:bg-black/75 before:h-full before:w-full before:absolute relative card-thumbnail w-full h-[250px] bg-no-repeat bg-center bg-cover">
                <?php else: ?>
                <header class="header-page before:bg-gray-200  w-full h-[350px]">
        <?php endif; ?>
            <div class="header-page__container relative z-10 jp-container h-full flex justify-start items-center">
                <div class="header-page__content flex flex-col">
                    <h1 class="header-page__title hero-title text-white">
                       <?php the_title(); ?>
                    </h1>
                </div>
            </div>
        </header>
    <div class="jp-page__content">
        <div class="jp-container">
            <?php the_content(); ?>
        </div>
    </div>
</article>