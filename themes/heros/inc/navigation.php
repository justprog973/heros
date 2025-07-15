<?php

require_once 'walker-custom-menu.php';
require_once 'pagination-custom.php';

function _themename_register_menu()
{
    register_nav_menus(
        array(
            'primary-menu' => esc_html__('Primary menu', '_themename'),
            'footer-menu' => esc_html__('Footer menu', '_themename'),
        )
    );
}

add_action('init', '_themename_register_menu');


function _themename_has_menu_item_add_div_container ($item = null ,$depth = 0): string
{
    $buttonDrop = "";
    if(in_array('menu-item-has-children', $item->classes)) {
        if($depth) {
            $buttonDrop = "<div id='doubleDropdown$item->menu_order' class='z-10 border border-slate-200 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>";

        }else {
            $buttonDrop = "<div id='dropdownNavbar$item->menu_order' class='z-10 border border-slate-200 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'>";

        }
    }

    return $buttonDrop;
}


function _themename_has_menu_item_add_el ($item = null ,$depth = 0, $el = "", $show = true): string
{
    $el_add = "";
    if(in_array('menu-item-has-children', $item->classes) && $show) {
        $el_add = $el;
    }else if(!$show) {
        $el_add = $el;
    }

    return $el_add;
}


function _themename_has_menu_item_add_button ($item = null ,$depth = 0, $el = ""): string
{
    $el_add = "a class='block transition-colors duration-150 ease-in hover:text-primary'";
    if(in_array('menu-item-has-children', $item->classes)) {
        if($depth) {
            $el_add = 'button id="doubleDropdownButton'.$item->menu_order.'" data-dropdown-toggle="doubleDropdown'.$item->menu_order.'" data-dropdown-placement="right-start" type="button" class="flex items-center justify-between w-full sm:px-4 sm:py-2 transition-colors duration-150 ease-in hover:text-white hover:bg-blue-700"';
        }else {
            $el_add = $el;
        }
    }else if($depth) {
        $el_add = "a class='block px-4 py-2 transition-colors duration-150 ease-in hover:bg-blue-700 hover:text-white'";
    }
    return $el_add;
}

function _themename_has_menu_item_add_icon ($item=null, $depth = 0, $el =  [
    '<svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
    '<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>'
]): string
{
       $icon = "";

    if(in_array('menu-item-has-children', $item->classes)) {
        if($depth) {
            $icon = $el[1];
        }else {
            $icon = $el[0];
        }
    }

    return $icon;
}

function _themename_has_menu_item_add_class_link (
    $item = null,
    $class  = "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
)
{
    $class_add = "class = '";
    if(in_array('sub-menu', $item->classes)) {
        $class_add .= $class."'";
    }

    return $class_add;
}
