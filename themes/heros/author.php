<?php get_header(); ?>
<?php
$author = get_query_var('author');
$author_posts = count_user_posts($author);
$author_display = get_the_author_meta('display_name', $author);
$author_description = get_the_author_meta('user_description', $author);
$author_website = get_the_author_meta('user_url', $author);
?>
    <header class="header-author w-full flex bg-gray-600">
        <div class="jp-container !py-0">
            <div class="header-author__container flex justify-center flex-col gap-1 w-full h-[350px]">
                <div class="header-author__content flex flex-col gap-3">
                    <div class="header-author__infos flex flex-row gap-5">
                        <?php echo get_avatar($author, 128);?>
                       <div class="header-author__desc">
                           <h1 class="hero-title text-white">
                               <?php echo esc_html($author_display); ?>
                           </h1>
                           <div class="font-medium text-gray-400">
                               <?php printf(esc_html(_n('%s post', '%s posts', $author_posts, '_themename')),
                                   number_format_i18n($author_posts)); ?>
                           </div>
                           <?php if (!empty($author_website)): ?>
                               <a class="font-medium text-gray-400 hover:text-white" target="_blank" href="<?php echo esc_url($author_website); ?>">
                                   <?php echo esc_html($author_website); ?>
                               </a>
                           <?php endif; ?>
                       </div>
                    </div>
                    <p class="font-medium  text-gray-300"><?php
                        echo esc_html($author_description);
                        ?></p>
                </div>
            </div>
        </div>
    </header>
    <div class="jp-container gap-10 my-10 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1 p-4">
        <div class="max-w-7xl w-full mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
            <div class="grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-5 gap-x-5 gap-y-10 md:grid-cols-2 grid-cols-2">
                <?php get_template_part('loop', 'author'); ?>
            </div>
            <?php the_wp_custom_pagination(); ?>
        </div>
    </div>
<?php get_footer(); ?>