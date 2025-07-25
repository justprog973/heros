<?php get_header(); ?>
    <header class="header-archive w-full flex bg-gray-600">
        <div class="jp-container !py-0">
            <div class="header-archive__container flex justify-center flex-col gap-1 w-full h-[350px]">
                <h1 class="hero-title text-white">
                    <?php
                        echo esc_html__('Archive', '_themename') . ' - ' . get_the_archive_title();
                    ?>
                </h1>
                <?php the_archive_description('<div class="font-medium text-gray-400">','</div>'); ?>
            </div>
        </div>
    </header>
    <div class="jp-container max-w-7xl w-full !py-10 mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
        <div class="grid lg:grid-cols-3 lg:gap-10 gap-5 md:grid-cols-2 grid-cols-2">
            <?php get_template_part('loop', 'archive'); ?>
        </div>
        <?php the_wp_custom_pagination(); ?>
    </div>
<?php if (is_active_sidebar('primary-sidebar')): ?>
    <div class="jp-sidebar lg:col-span-3 md:col-span-12 <?php if (is_search()): echo "col-span-full"; endif; ?>">
        <?php dynamic_sidebar('primary-sidebar'); ?>
    </div>
<?php endif; ?>
<?php get_footer(); ?>