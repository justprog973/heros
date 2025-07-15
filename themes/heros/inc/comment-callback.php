<?php

function themename_comment_callback($comment, $args, $depth) {
    $tag = ('div' === $args['style']) ? 'div' : 'li';
    ?>
        <<?php echo $tag ?> id="comment-<?php comment_ID(); ?>" <?php comment_class(['jp-c-comment mb-5 last:mb-0 rounded-[5px]', $comment->comment_parent ? 'jp-c-comment--child' : '']) ?>>
            <article id="div-comment-<?php comment_ID(); ?>" class="jp-c-comment__body flex flex-row gap-5 relative  p-5">
                <?php if($args['avatar_size'] != 0) echo "<div class='avatar'><div class='w-14 h-min rounded-full'>". get_avatar($comment, $args['avatar_size'], false, false, ['class' => 'jp-c-comment__avatar']) . "</div></div>"; ?>
                <?php edit_comment_link(esc_html__('Edit Comment', '_themename'), '<span class="jp-c-comment__edit-link absolute right-5 top-2 btn btn-link p-0 no-underline">', '</span>'); ?>
                <div class="jp-c-comment__content w-full">
                    <div class="jp-c-comment__author font-bold">
                        <?php echo _themename_get_capitalize_on_link(get_comment_author_link($comment)); ?>
                    </div>
                    <a href="<?php echo  esc_url(get_comment_link($comment, $args))?>" class="jp-c-comment-time text-xs font-bold">
                        <time datetime="<?php comment_time('c') ?>">
                            <?php
                            printf(esc_html__('%s ago', '_themename'),human_time_diff(get_comment_time('U'), current_time('U')));
                            ?>
                        </time>
                    </a>
                    <?php if ($comment->comment_approved == '0') : ?>
                        <p class="c-comment__awaiting-moderation"><?php esc_html_e('Your comment is awaiting moderation', '_themename') ?></p>
                    <?php endif; ?>
                    <?php
                    if($comment->comment_type == 'comment' || (($comment->comment_type == 'pingback' ||
                            $comment->comment_type == 'trackback') && !$args['short_ping'])){
                        comment_text();
                    }
                    ?>
                    <div class="comment__reply flex justify-end">
                        <?php
                            comment_reply_link(array_merge($args,[
                                    'depth' => $depth,
                                    'add_below' => 'div-comment',
                                    'before'=> '<div class="comment__reply-link btn btn-neutral btn-xs">',
                                    'after' => '</div>',
                            ]));
                        ?>
                    </div>
                </div>
            </article>
        </>
    <?php
}


add_filter('wp_die_handler', function() {
    return 'themename_wp_die_handler';
});

function themename_wp_die_handler($message, $title = '', $args = array()) {
    if ( isset($_POST['comment_post_ID']) ) {
        $post_id = intval($_POST['comment_post_ID']);
        $redirect_url = get_permalink($post_id);

        // Vérifier quel champ est vide
        $errors = [];
        if(!is_user_logged_in()) {
            if (empty($_POST['author'])) {
                $errors[] = __('The field « Name » is required.', '_themename');
            }
            if (empty($_POST['email'])) {
                $errors[] = __('The field « Email » is required.', '_themename');
            }else if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
                $errors[] = __('The field « Email » is not valid.', '_themename');
            }
        }
        if (empty($_POST['comment'])) {
            $errors[] = __('The field « Comment » is required.', '_themename');
        }

        if(!is_user_logged_in() && empty($_POST['privacy'])) {
            $errors[] = __('The field « Privacy Policy » is required.', '_themename');
        }

        if ( empty($errors) ) {
            $errors[] = strip_tags($message);
        }

        if ( !empty($errors) ) {
            $redirect_url = add_query_arg('comment_error', urlencode(implode('|', $errors)), $redirect_url);
            $redirect_url .= '#errors_comment';

            wp_safe_redirect($redirect_url);
            exit;
        }
    }

    _default_wp_die_handler($message, $title, $args);
}

add_filter( 'comment_post_redirect', function( $location, $comment ) {
    if ( $comment->comment_approved != '0' ) {
        $location = add_query_arg( 'comment_status', 'success', $location );
    }

    return $location;
}, 10, 2 );