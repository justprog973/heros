
 <article <?php post_class("card bg-base-100 shadow-sm"); ?>>
    <?php if (get_the_post_thumbnail() !== ""): ?>
        <figure class="card-thumbnail h-[150px]">
            <?php the_post_thumbnail('large', ["class" => "object-cover w-full"]); ?>
        </figure>
    <?php endif; ?>
    <div class="mx-2 md:mx-5">
        <h2 class="card-title">
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute() ?>">
                        <?php the_title(); ?>
            </a>
        </h2>
    </div>
    <div class="card-body px-2 md:px-5">
        <p class="text-slate-600 italic"><?php _themename_post_meta(); ?></p>
        <div class="card-excerpt"><?php the_excerpt(); ?></div>
    </div>
    <div class="card-actions justify-end mx-2 md:mx-5">
        <?php _themename_read_more_link(); ?>
        <div class="w-full mb-2">
                <?php echo _themename_delete_post(); ?>
        </div>
   </div>
</article>

