<?php get_header(); ?>
    <div class="jp-container gap-10 my-10 grid grid-flow-row lg:grid-cols-12 sm:grid-cols-1 p-4">
        <div class="max-w-7xl w-full mx-auto <?php if (is_active_sidebar('primary-sidebar')): echo "lg:col-span-9 md:col-span-12"; else: echo "col-span-12"; endif; ?>">
            <div class="grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-5 gap-x-5 gap-y-10 md:grid-cols-2 grid-cols-2">
                <h2>Author Infos</h2>
            </div>
        </div>
        <?php if (is_active_sidebar('primary-sidebar')): ?>
            <div class="jp-sidebar lg:col-span-3 md:col-span-12 <?php if (is_search()): echo "col-span-full"; endif; ?>">
                <?php dynamic_sidebar('primary-sidebar'); ?>
            </div>
        <?php endif; ?>
    </div>
<?php get_footer(); ?>