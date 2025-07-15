</main>
<?php $footer_theme = _themename_sanitize_footer_bg(get_theme_mod('_themename_footer_bg', 'dark')) ?>
<footer id="footer" role="contentinfo" class="jp-footer">
    <div class="footer__theme <?= $footer_theme ?>">
        <?php get_template_part('template-parts/footer/widgets'); ?>
        <?php get_template_part('template-parts/footer/info'); ?>
    </div>
</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
