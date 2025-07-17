<?php
/*$inline_styles_selectors = [
    '.app-layout .jp-card a.card-button,.app-layout .button-search' => [
        'background-color' => '_themename_accent_colour',
        'border-color' => '_themename_accent_colour'
    ],
    '.app-layout .card-title:hover' => [
        'color' => '_themename_accent_colour'
    ],
    ':focus' => [
        'outline-color' => '_themename_accent_colour'
    ],
    '.app-layout input#default-search:focus' => [
        '--tw-ring-color' => '_themename_accent_colour/4D',//4D
        'border-color' => '_themename_accent_colour'
    ],
    '.app-layout .navigation.pagination .nav-links span.page-numbers.current' => [
        'color' => '_themename_accent_colour',
        'background-color' => '_themename_accent_colour/0D'//0D
    ],
    '.app-layout .menu-item a:hover' => [
        'color' => '_themename_accent_colour'
    ],
    '.app-layout .jp-card a.card-link' => [
        'color' => '_themename_accent_colour'
    ],
    '.app-layout .jp-card a.card-button:focus,.app-layout .button-search' => [
        '--tw-ring-color' => '_themename_accent_colour/4D'//4D
    ],
    '.app-layout #footer a' => [
        'color' => '_themename_accent_colour'
    ],
    '.app-layout #footer a::after' => [
        'background-color' => '_themename_accent_colour'
    ],
    '.menu-item.current-menu-item' => [
        'color' => '_themename_accent_colour'
    ]
];

$inline_styles = "";

foreach ($inline_styles_selectors as $selector => $props) {
    $inline_styles .= "{$selector} {";
    foreach ($props as $prop => $value) {
        $values = explode('/', $value);
        $alpha = "";
        if (count($values) == 2) {
            $alpha = $values[1];
        }
        $inline_styles .= "{$prop}: " . sanitize_hex_color(get_theme_mod($values[0], '#1d4ed8')) . $alpha . ";";
    }
    $inline_styles .= "} ";
}
*/

if (!function_exists('hex_to_rgb') && !function_exists('_themename_get_accent_color') && !function_exists('rgb_to_hex') &&  !function_exists('darken_color')) {
    function hex_to_rgb($hex)
    {
        // Supprimez le caractère '#' s'il est présent
        $hex = str_replace('#', '', $hex);

        // Si la couleur est au format court (3 caractères), la convertir en format long (6 caractères)
        if (strlen($hex) === 3) {
            $hex = str_repeat($hex[0], 2) . str_repeat($hex[1], 2) . str_repeat($hex[2], 2);
        }

        // Convertir les valeurs hexadécimales en valeurs RGB
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));

        return array($r, $g, $b);
    }
    function rgb_to_hex($r, $g, $b)
    {
        // Convertir les valeurs RGB en hexadécimal avec deux chiffres pour chaque composante
        return sprintf("#%02x%02x%02x", $r, $g, $b);
    }
    function darken_color($hex, $percent)
    {
        // Convertir la couleur hexadécimale en RGB
        list($r, $g, $b) = hex_to_rgb($hex);

        // Réduire chaque composante RGB en fonction du pourcentage
        $r = max(0, min(255, (int) round($r - ($r * $percent / 100))));
        $g = max(0, min(255, (int) round($g - ($g * $percent / 100))));
        $b = max(0, min(255, (int) round($b - ($b * $percent / 100))));


        // Convertir les nouvelles valeurs RGB en hexadécimal
        return rgb_to_hex($r, $g, $b);
    }

    function _themename_get_accent_color ($key, $default_color = '#1d4ed8') {
        return sanitize_hex_color(get_theme_mod($key, $default_color));
    }
}
//$accent_color = sanitize_hex_color(get_theme_mod('_themename_accent_colour', '#1d4ed8'));

$inline_styles_selectors = [
      "*" => [
          "--color-primary" => "_themename_accent_colour",
          "--accent-color" => "_themename_accent_colour",
          "--tw-ring-color" => "_themename_accent_colour",
          "--outline-color" => "_themename_accent_colour",
      ],
      "a.card-link" => [
          "color" => "_themename_text_link_colour",
      ],
      "a.card-link:hover" => [
          "color" => "_themename_text_link_colour",
      ],
    ".logged-in-as a" => [
        "color" => "_themename_text_link_colour",
    ],
    ".logged-in-as a:hover" => [
        "color" => "_themename_text_link_colour",
    ],
    ".header-archive" => [
        "background-color" => "_themename_header_coulour",
    ],
    ".header-author" => [
        "background-color" => "_themename_header_coulour",
    ],
    "a.btn-link" => [
        "color" => "_themename_text_link_colour",
    ],
    "a.btn-link:hover" => [
        "color" => "_themename_text_link_colour",
    ]
];

$inline_styles = "";

foreach ($inline_styles_selectors as $selector => $props) {
    $inline_styles .= "$selector {";
    foreach ($props as $prop => $value) {
        if($selector) {
            $inline_styles .= "$prop: "._themename_get_accent_color($value, "#c3c3c3").";";
        }
        if($selector == "a.card-link:hover" || $selector == "a.btn-link:hover" || $selector == ".logged-in-as a:hover") {
            $inline_styles .= "$prop: ". darken_color(_themename_get_accent_color($value), 30).";";
            break;
        }

        if($prop == '--tw-ring-color') {
            $inline_styles .= "$prop: ". _themename_get_accent_color($value)."4D;";
            break;
        }else {
            $inline_styles .= "$prop: "._themename_get_accent_color($value).";";
        }

    }
    $inline_styles .= "}";
}

/*
 * $accent_color = sanitize_hex_color(get_theme_mod('_themename_accent_colour', '#1d4ed8'));

$inline_styles = "
    .app-layout .jp-card a.card-button,
     .app-layout .button-search{
            background-color: {$accent_color};
            border: 1px solid {$accent_color};
    }

    .app-layout .card-title:hover {
        color: {$accent_color};
    }

    :focus {
        outline-color: {$accent_color};
    }

    .app-layout input#default-search:focus {
        --tw-ring-color: {$accent_color}4D;
        border-color: {$accent_color};
    }

    .app-layout .navigation.pagination .nav-links span.page-numbers.current {
        color: {$accent_color};
        background-color: {$accent_color}0D;
    }

    .app-layout .menu-item a:hover {
        color: {$accent_color};
    }

    .app-layout .jp-card a.card-link {
        color: {$accent_color};
    }

    .app-layout .jp-card a.card-button:focus,
     .app-layout .button-search{
        --tw-ring-color: {$accent_color}4D;
    }

    .app-layout #footer a{
        color: {$accent_color};
    }

    .app-layout #footer a::after{
        background-color: {$accent_color};
    }

";
 */
