<?php
    $site_info = get_theme_mod('_themename_site_info', '');
?>
<?php if($site_info): ?>
<div class="jp-site-info bg-gray-100 dark:bg-gray-700">
    <div class="jp-container !p-2 jp-site-info__container">
        <p class="jp-site-info__text text-center text-sm text-slate-500 dark:text-gray-300">
            <?php
                    $allowed = ['a' => [
                        'href' => [],
                        'title' => []
                    ]];

                    echo wp_kses($site_info, $allowed);
            ?>
        </p>
    </div>
</div>
<?php endif; ?>
