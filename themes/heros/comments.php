<?php

if(post_password_required()) {
    return;
}
?>

<div id="comments" class="jp-c-comments">
    <div class="jp-container">
        <?php if(have_comments()): ?>
            <h2 class="jp-c-comments__title text-2xl font-bold">
                <?php
                /* Translators: 1 is number of comments and 2 is post title */
                printf(
                    esc_html(_n(
                        '%1$s Reply to "%2$s"',
                        '%1$s Replies to "%2$s"',
                        get_comments_number(),
                        '_themename'
                    )),
                    number_format_i18n( get_comments_number()),
                    get_the_title()
                );
                ?>
            </h2>
            <ul class="jp-c-comments__list mt-10 [&>li:nth-child(odd)]:bg-slate-50">
                <?php
                wp_list_comments([
                    'short_ping' => false,
                    'reverse_top_level' => true,
                    'avatar_size' => 150,
                    'reply_text' => 'reply',
                    'callback' => 'themename_comment_callback',
                ]);
                ?>
            </ul>
            <?php
                the_comments_pagination([
                    'class'=> 'mb-5',
                    'prev_text' => '<span class="join-item btn btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
                    'next_text' => '<span class="join-item btn btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span>',
                ]);
            ?>
        <?php endif; ?>
        <?php
            if( !comments_open() && get_comments_number()): ?>
                <p class="jp-c-comments__closed mt-10">
                    <?php esc_html_e('Comments are closed for this post.', '_themename');  ?>
                </p>
            <?php endif; ?>
        <?php if(isset($_GET['comment_error'])) : ?>
            <div id="errors_comment" role="alert" class="alert alert-error jp-c-comment__error mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <ul>
                    <?php
                    $errors = explode('|', $_GET['comment_error']);
                    foreach ($errors as $error) {
                        echo '<li>' . esc_html($error) . '</li>';
                    }
                    ?>
                </ul>
            </div>
        <?php endif; ?>
        <?php if(isset($_GET['unapproved'])) :?>
            <div id="success_comment" role="alert" class="alert alert-success jp-c-comment__success mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <ul>
                    <?php
                        echo '<li>' . __('Your comment has been saved. But must be approved by the moderator!', '_themename') . '</li>';
                    ?>
                </ul>
            </div>
        <?php endif; ?>
        <?php if(isset($_GET['comment_status']) && $_GET['comment_status'] == 'success') :?>
            <div id="success_comment" role="alert" class="alert alert-success jp-c-comment__success mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <ul>
                    <?php
                    echo '<li>' . __('Thanks for your comment !', '_themename') . '</li>';
                    ?>
                </ul>
            </div>
        <?php endif; ?>
        <?php
            $commenter     = wp_get_current_commenter();
            $comments_args = [
                // Change the title of send button
                'label_submit' => __( 'Send', '_themename' ),
                'class_submit' => 'btn btn-primary',
                // Change the title of the reply section
                'title_reply' => __( 'Leave à reply', '_themename' ),
                // Remove "Text or HTML to be displayed after the set of comment fields".
                'comment_notes_after' => '',
                'class_form' => 'flex flex-col gap-5',
                // Redefine your own textarea (the comment body).
                'fields' => [
                        'author' => sprintf(
                            '<p class="comment-form-author">%s %s</p>',
                            sprintf(
                                '<label class="text-xl font-bold" for="author">%s*</label>',
                                __( 'Name', '_themename' )
                            ),
                            sprintf(
                                '<input class="input w-full" id="author" name="author" type="text" value="%s" size="30" maxlength="245" autocomplete="name" required/>',
                                esc_attr( $commenter['comment_author'] )
                            )
                        ),
                        'email'  => sprintf(
                            '<p class="comment-form-email">%s %s</p>',
                            sprintf(
                                '<label class="text-xl font-bold" for="email">%s*</label>',
                                __( 'Email', '_themename' )
                            ),
                            sprintf(
                                '<input class="input w-full" id="email" name="email" type="email" value="%s" size="30" maxlength="100" aria-describedby="email-notes" autocomplete="email" required/>',
                                esc_attr( $commenter['comment_author_email'] )
                            )
                        ),
                        'cookies' => '<p><input class="checkbox" id="privacy" name="privacy" type="checkbox" required>' . __(' By commenting you accept the ', '_themename') . '<a class="btn-link" href="' . get_privacy_policy_url() . '">' . __('Privacy Policy', '_themename') . '</a></p>'
	            ],
                'comment_field' => '<p class="comment-form-comment mt-5"><label class="text-xl font-bold" for="comment">' . __( 'Comment', '_themename' ) . '*</label><textarea class="textarea w-full h-[200px] resize-none" id="comment" name="comment" aria-required="true" required></textarea></p>',
            ];
            comment_form( $comments_args );
        ?>
    </div>
</div>
