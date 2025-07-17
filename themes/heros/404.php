<?php get_header(); ?>
    <header class="header-notfound w-full flex bg-gray-200">
        <div class="jp-container !py-0">
            <div class="header-notfound__container flex justify-center flex-col gap-1 w-full h-[150px]">
                <h1 class="hero-title text-slate-800">
                    <?php esc_html_e('404 Error Page Not Found', '_themename'); ?>
                </h1>
            </div>
        </div>
    </header>
    <div class="jp-container max-w-7xl w-full !py-10 mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
        <div class="flex flex-col justify-center items-center w-full gap-5">
            <h3>
                <?php esc_html_e('Nothing found here, maybe you can try to search ?', '_themename'); ?>
            </h3>
            <?php get_search_form(); ?>
        </div>
    </div>
<?php get_footer(); ?>