<?php get_header(); ?>
    <header class="header-search w-full flex bg-gray-200">
        <div class="jp-container !py-0">
            <div class="header-search__container flex justify-center flex-col gap-1 w-full h-[150px]">
                <?php the_wp_permalink_custom(); ?>
                <h1 class="font-bold text-3xl md:text-5xl text-slate-800">
                    <?php printf(esc_html__('Search Results for : "%s"', '_themename'), get_search_query()); ?>
                </h1>
            </div>
        </div>
    </header>
    <div class="jp-container max-w-7xl w-full mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
        <div class="grid lg:grid-cols-3 lg:gap-10 gap-5 md:grid-cols-2 grid-cols-2">
            <?php get_template_part('loop', 'search'); ?>
        </div>
    </div>
<?php get_footer(); ?>