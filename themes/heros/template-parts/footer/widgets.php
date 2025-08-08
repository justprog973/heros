<?php
$footer_layout = sanitize_text_field(get_theme_mod('_themename_footer_layout', '3,3,3,3'));
$footer_layout = preg_replace('/\s+/','', $footer_layout);
$columns= explode(',', $footer_layout);
$addClassCol = preg_filter('/^/', 'col-span-full  md:col-span-', $columns);
$widgets_active = false;
foreach ($columns as $i => $column){
    if(is_active_sidebar('footer-sidebar-'.($i + 1))) {
        $widgets_active = true;
    }
}
?>
<?php if($widgets_active) : ?>
    <div class="bg-slate-50">
        <div class="max-w-7xl w-full mx-auto py-6 px-4">
            <div class="grid grid-cols-1 md:grid-cols-12 grid-flow-col auto-cols-fr gap-5  wp-content">
                <?php foreach ($columns as $i => $column):?>
                    <div class="<?php echo $addClassCol[$i] ?>">
                        <?php if(is_active_sidebar('footer-sidebar-'.($i + 1))): ?>
                            <?php dynamic_sidebar('footer-sidebar-'.($i + 1)) ?>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
<?php endif; ?>
