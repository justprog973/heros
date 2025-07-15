<?php

require_once 'inc/customize.php';
require_once 'inc/enqueue-assets.php';
require_once 'inc/helpers.php';
require_once 'inc/sidebar.php';
require_once 'inc/theme-support.php';
require_once 'inc/navigation.php';
require_once 'inc/include-plugins.php';
require_once 'inc/comment-callback.php';
//require_once 'inc/metaboxes.php';

function _themename_handle_delete_post()
{
    if (isset($_GET['action']) && $_GET['action'] === '_themename_delete_post') {
        if(!isset($_GET['nonce']) || wp_verify_nonce($_GET['nonce'], 'themename_delete_post_'. $_GET['post'])) {
            return;
        }
        $post_id = isset($_GET['post']) ? $_GET['post'] : null;
        $post = get_post((int)$post_id);
        if (empty($post)) {
            return;
        }
        if (!current_user_can('delete_post', $post_id)) {
            return;
        }

        wp_trash_post($post_id);
        wp_safe_redirect(home_url());

        die;
    }
}

add_action('init', '_themename_handle_delete_post');
