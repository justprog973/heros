<!doctype html>
<html data-theme="light" lang=<?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="jp-layout <?php if(is_admin_bar_showing())echo 'admin_bar_is_show';?>">
    <header class="jp-header">
        <nav class="jp-header__nav navbar bg-base-100">
            <div class="jp-header__container w-full max-w-7xl mx-auto">
                <div class="jp-header__container--sub flex flex-wrap items-center p-4">
                    <!---<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />--->
                    <div class="jp-site-brand flex-1">
                        <?php if(has_custom_logo()): the_custom_logo(); else: ?>
                            <a href="<?php echo esc_url(home_url('/')); ?>">
                                <span class="jp-site-brand__name self-center text-3xl font-semibold whitespace-nowrap"><?php esc_html(bloginfo('name')); ?></span>
                            </a>
                        <?php endif; ?>
                    </div>
                    <div>
                        <?php get_search_form(); ?>
                    </div>
                </div>
            </div>
        </nav>

        <?php if(has_nav_menu('primary-menu')): ?>
            <nav class="jp-nav-menu bg-gray-50 border-t border-b-2 border-gray-100">
                <div class="jp-nav-menu__container max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
                    <button data-collapse-toggle="navbar-multi-level" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                        <?php wp_nav_menu([
                            'theme_location' => 'primary-menu',
                            'container' =>  false,
                            'menu_class' => 'jp-nav-menu__wrapper flex flex-row gap-5',
                            'walker' => new Walker_Custom()
                        ]); ?>
                    </div>
                </div>
            </nav>
        <?php endif; ?>
    </header>
    <main>
