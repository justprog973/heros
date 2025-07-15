<?php

require_once get_template_directory() . "/inc/class-tgm-plugin-activation.php";

add_action("tgmpa_register", "_themename_register_required_plugins");

function _themename_register_required_plugins()
{
    $plugins = [
        [
            "name" => "_themename metaboxes",
            "slug" => "_themename-metaboxes",
            "source" => get_template_directory_uri() . "/inc/plugins/_themename-metaboxes.zip",
            "required" => true,
            "version" => "1.0.0",
            "force_activation" => false,
            "force_deactivation" => false,
        ]
    ];
    $config = [];
    tgmpa($plugins, $config);
}