<form class="search-form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ) ?>">
    <div class="search-form__container join">
        <label for="search-form__label" class="input join-item">
            <svg aria-hidden="true" class="w-5 opacity-50 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                </path>
            </svg>
            <input type="search" name="s" id="search-form__label" placeholder="Article, Page..." required>
        </label>
        <button type="submit" class="btn btn-neutral join-item">Rechercher</button>
    </div>
</form>