<div class="j-post-author-container bg-slate-50">
    <div class="j-post-author jp-container">
        <h2 class="text-xl mt-2 font-bold"><?php esc_attr_e('Author', '_themename'); ?></h2>
        <h2 class="absolute invisible"><?php esc_attr_e('A propos', '_themename'); ?></h2>
        <?php
        $author_id = get_the_author_meta('ID');
        $author_posts = get_the_author_posts();
        $author_display = get_the_author();
        $author_posts_url = get_author_posts_url($author_id);
        $author_description = get_the_author_meta('user_description');
        $author_website = get_the_author_meta('user_url');
        ?>
        <div class="j-post-avatar__infos my-5 flex flex-row gap-x-5">
            <div class="j-post-author__avatar">
                <div class="avatar">
                    <div class="w-14 rounded-full">
                        <?php echo get_avatar($author_id, 265) ?>
                    </div>
                </div>
            </div>
            <div class="j-post-author__content">
                <div class="j-post-author__title font-bold text-primary flex-inline">
                    <?php if ($author_website): echo '<a href=' . esc_url($author_website) . '" target="_blank">'; endif; ?>
                    <?php echo esc_html(ucwords(strtolower($author_display))); ?>
                    <?php if ($author_website): echo '</a>'; endif; ?>
                </div>
                <div class="j-post-author__posts text-gray-500 font-medium text-sm">
                    <a href="<?php echo esc_url($author_posts_url) ?>">
                        <?php
                        printf(esc_html(_n('%s Post', '%s Posts', $author_posts, '_themename')),
                            number_format_i18n($author_posts));
                        ?>
                    </a>
                </div>
                <div class="j-post-author__desc text-sm">
                    <?php echo esc_html($author_description); ?>
                </div>
        </div>
        </div>
    </div>
</div>

