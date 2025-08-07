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


function _themename_add_tag_on_submenu ($item = null , $depth = 0, $el = "", $cls = ''): string
{
    $el_add = "a class='block $cls'";
    if(in_array('menu-item-has-children', $item->classes)) {
            $el_add = $el;
    }
    return $el_add;
}

function _themename_has_menu_item_add_icon ($item=null, $depth = 0, $el =  [
    '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="currentColor" d="m25 32.4l-9.7-9.7l1.4-1.4l8.3 8.3l8.3-8.3l1.4 1.4z"/></svg>',
]): string
{
       $icon = "";

    if(in_array('menu-item-has-children', $item->classes)) {
            $icon = $el[0];
    }

    return $icon;
}
