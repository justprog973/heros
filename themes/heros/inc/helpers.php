<?php
function _themename_post_meta(): void
{
    /* translators %s: Post Date */
    printf(
        esc_html__('Posted on %s', '_themename'),
        '<a class="card-link text-teal-400 btn-link p-0" href="' . esc_url(get_permalink()) . '"' .
        '<time  datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date("l  j F Y")) . '</time>' .
        '</a>'
    );
    /* translators %s: Post Author */
    printf(
        esc_html__(' By %s', '_themename'),
        '<a class="card-link" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' .
        esc_html(get_the_author()) . '</a>'
    );
}

function _themename_read_more_link(): void
{
    echo '<a class="btn btn-primary icon w-full md:w-fit" href="' . esc_url(get_permalink()) . '" title="' . the_title_attribute(['echo' => false]) . '">';
    /* translators %s: Post Title */
    printf(
        wp_kses(
            __('Read More <span class="absolute invisible">About %s</span>', '_themename'),
            [
                'span' => [
                    'class' => []
                ]
            ]
        ),
        get_the_title()
    );
    echo '</a>';
}

function _themename_custom_excerpt_length($length)
{
    return 10;
}

add_filter('excerpt_length', '_themename_custom_excerpt_length', 999);

function _themename_delete_post()
{
    $url = add_query_arg([
        'action' => '_themename_delete_post',
        'post' => get_the_ID(),
        'nonce' => wp_create_nonce('_themename_delete_post_' . get_the_ID())
    ], home_url());
    if (current_user_can('delete_post', get_the_ID())) {
        return '<a onclick="return confirm(\'' . esc_js(__('Are you sure?', '_themename')) . '\')" class="btn btn-link text-error no-underline p-0" href="' . esc_url($url) . '">' . esc_html__('Delete Post', '_themename') . '</a>';;
    }
}

function _themename_meta($id, $key, $default)
{
    $value = get_post_meta($id, $key, true);
    if (!$value && $default) {
        return $default;
    }
    return $value;
}


function _themename_get_capitalize_on_link ($link) {
    return preg_replace_callback(
        '/>(.*?)</',
        function ($matches) {
            $name = ucwords(strtolower($matches[1])); // capitalise chaque mot
            return '>' . $name . '<';
        },
        $link
    );
}
