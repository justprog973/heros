<?php if (is_active_sidebar('primary-sidebar')): ?>
    <div class="jp-sidebar wp-content bg-slate-50 p-4 rounded lg:col-span-3 md:col-span-12 <?php if (is_search()): echo "col-span-full"; endif; ?>">
        <?php dynamic_sidebar('primary-sidebar'); ?>
    </div>
<?php endif; ?>