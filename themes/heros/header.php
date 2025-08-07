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
        <nav class="jp-header__nav !p-0 navbar bg-base-200 border-b h-[80px] border-b-gray-200">
            <div class="jp-header__container w-full h-full max-w-7xl mx-auto px-4">
                <div class="jp-header__container--sub h-full flex flex-wrap gap-10 items-center justify-between">
                    <!---<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />--->
                    <div class="jp-site-brand">
                        <?php if(has_custom_logo()):
                            _themename_get_custom_logo('w-[40px]');
                        else: ?>
                            <a href="<?php echo esc_url(home_url('/')); ?>">
                                <span class="jp-site-brand__name self-center text-3xl font-semibold whitespace-nowrap"><?php esc_html(bloginfo('name')); ?></span>
                            </a>
                        <?php endif; ?>
                    </div>
                    <?php if(has_nav_menu('primary-menu')): ?>
                        <nav class="jp-nav-menu-wrapper md:flex items-center hidden font-medium text-[15px]">
                           <div class="jp-menu-desktop">
                               <?php wp_nav_menu([
                                   'theme_location' => 'primary-menu',
                                   'container' =>  false,
                                   'menu_class' => 'jp-nav-menu__content max-h-[80px] h-[80px] flex flex-row lg:gap-10 gap-5 justify-center items',
                                   'walker' => new Walker_Custom_Desktop()
                               ]); ?>
                           </div>
                        </nav>
                        <div x-data="{ open: false }" x-init="$watch('open', value => document.body.classList.toggle('overflow-hidden', value))" class="jp-menu-mobile md:hidden flex" >
                            <span @click="open = ! open" :class=" open ? 'bg-transparent border-none hover:bg-transparent' : ''" class="relative z-[30] transition duration-150 cursor-pointer ease-in w-[50px] h-[40px] flex justify-center items-center">
                                <span :class="open ? 'after:-rotate-90 after:top-0 -rotate-45 before:hidden bg-rose-600 after:bg-rose-600 after:w-[20px]' : 'bg-slate-800 after:w-[25px] before:w-[25px] after:bg-slate-800 before:bg-slate-800'" class="flex relative z-[20]  w-[20px] h-[1px] after:-top-[8px] after:absolute  after:h-[1px] before:top-[8px] before:absolute before:h-[1px] transition-transform duration-50 ease-linear"></span>
                            </span>
                            <div x-show="open" class="absolute w-full h-full top-0 left-0 z-[25]"
                                 x-transition:enter="transition ease-out duration-150"
                                 x-transition:enter-start="opacity-0 scale-0"
                                 x-transition:enter-end="opacity-100 scale-100"
                                 x-transition:leave="transition ease-in duration-100"
                                 x-transition:leave-start="opacity-100 scale-100"
                                 x-transition:leave-end="opacity-0 scale-0"
                            >
                                <div class="jp-menu-mobile__wrapper relative flex justify-center items-center">
                                    <div class="jp-menu-mobile__overlay fixed h-screen w-full top-0 bottom-0 bg-white"></div>
                                    <div class="jp-mobile-menu__content relative mt-[130px]">
                                        <?php if(has_custom_logo()):
                                            _themename_get_custom_logo('w-[100px]', 'flex justify-center items-center');
                                        else: ?>
                                            <a class="flex" href="<?php echo esc_url(home_url('/')); ?>">
                                                <span class="jp-site-brand__name text-6xl w-full text-center font-semibold whitespace-nowrap"><?php esc_html(bloginfo('name')); ?></span>
                                            </a>
                                        <?php endif; ?>
                                        <nav class="jp-nav-menu-wrapper mt-10 text-xl font-bold">
                                            <?php wp_nav_menu([
                                                'theme_location' => 'primary-menu',
                                                'container' =>  false,
                                                'menu_class' => 'jp-nav-menu-wrapper__content  relative flex flex-col justify-center items-center',
                                                'walker' => new Walker_Custom_Mobile()
                                            ]); ?>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                    <div class="hidden lg:flex">
                        <?php get_search_form(); ?>
                    </div>
                </div>
            </div>
        </nav>


            <!---<nav class="jp-nav-menu bg-gray-50 border-t border-b-2 border-gray-100">
                <div class="jp-nav-menu__container max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
                    <button data-collapse-toggle="navbar-multi-level" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">

                    </div>
                </div>
            </nav>-->

    </header>
    <main>
