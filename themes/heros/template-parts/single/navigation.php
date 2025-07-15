<?php

$prev = get_previous_post();
$next = get_next_post();
?>

<?php if ($prev || $next) { ?>
    <nav class="j-post-navigation" role="navigation">
        <div class="jp-container p-4">
            <h2 class="absolute invisible"><?php esc_attr_e('A propos', '_themename'); ?></h2>
            <div class="j-post-navigation__links flex md:flex-row flex-col justify-between items-center gap-5">
                <?php if ($next) { ?>
                    <div class="j-post-navigation__post j-post-navigation__post--next bg-gray-100 hover:bg-gray-200 duration-200 mr-auto md:mr-0 transition-colors rounded-4xl md:pl-5 pl-0 pr-5 md:pr-0 border border-gray-200 <?php if ($prev): echo 'prev'; else: echo ''; endif; ?>">
                        <a href="<?php the_permalink($next->ID); ?>" class="j-post-navigation__link flex md:flex-row-reverse flex-row items-center gap-5">
                            <?php if (has_post_thumbnail($next->ID)) { ?>
                                <div class="j-post-navigation__thumbnail avatar">
                                    <div class="w-14 rounded-full">
                                        <?php echo get_the_post_thumbnail($next->ID, 'thumbnail'); ?>
                                    </div>
                                </div>
                            <?php } ?>
                            <div class="j-post-navigation__content flex flex-col" dir="rtl">
                            <span class="j-post-navigation__subtitle">
                                <?php echo esc_html__('Next Post', '_themename') ?>
                            </span>
                                <span class="j-post-navigation__title">
                                <?php echo esc_html(get_the_title($next->ID)) ?>
                            </span>
                            </div>
                        </a>
                    </div>
                <?php } ?>
                <?php if ($prev) { ?>
                    <div class="j-post-navigation__post j-post-navigation__post--prev bg-gray-100 hover:bg-gray-200 duration-200 transition-colors ml-auto md:ml-0 rounded-4xl md:pr-5 pr-0 pl-5 md:pl-0 border border-gray-200">
                        <a href="<?php the_permalink($prev->ID); ?>" class="j-post-navigation__link flex md:flex-row flex-row-reverse items-center gap-5">
                            <?php if (has_post_thumbnail($prev->ID)) { ?>
                                <div class="j-post-navigation__thumbnail avatar">
                                   <div class="w-14 rounded-full">
                                       <?php echo get_the_post_thumbnail($prev->ID, 'thumbnail'); ?>
                                   </div>
                                </div>
                            <?php } ?>
                            <div class="j-post-navigation__content flex flex-col" dir="ltr">
                            <span class="j-post-navigation__subtitle">
                                <?php echo esc_html__('Prev Post', '_themename') ?>
                            </span>
                                <span class="j-post-navigation__title">
                                <?php echo esc_html(get_the_title($prev->ID)) ?>
                            </span>
                            </div>
                        </a>
                    </div>
                <?php } ?>
            </div>
        </div>
    </nav>
<?php } ?>