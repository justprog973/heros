<?php get_header(); ?>
<?php
$layout = _themename_meta(get_the_ID(), '_themename_post_layout', 'full');
$sidebar = is_active_sidebar('primary-sidebar');
if ($layout === 'sidebar' && !$sidebar) {
    $layout = 'full';
}
?>
<main class="<?php if ($layout === 'sidebar'): echo "gap-10 my-10 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1 p-4";
else:
    echo "jp-section"; endif; ?>">
    <?php if ($layout === 'sidebar'): echo "<div class='lg:col-span-9 md:col-span-12'>"; endif; ?>
        <?php get_template_part('loop', 'single'); ?>
    <?php if ($layout === 'sidebar'): echo "</div>"; endif; ?>
    <?php if ($layout === 'sidebar'): ?>
        <div class="jp-sidebar lg:col-span-3 md:col-span-12 <?php if (is_search()): echo "col-span-full"; endif; ?>">
            <?php dynamic_sidebar('primary-sidebar'); ?>
        </div>
    <?php endif; ?>
</main>
<?php get_footer(); ?>

