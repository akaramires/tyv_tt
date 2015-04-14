/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/13/15 8:15 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    // Rating
    $('.rating.default').rating();

    $('.rating.yellow').rating({
        background: '#ffff00'
    });

    // Progress
    var progress_default = $('.progress-bar.default').progressBar();

    $('.progress-bar.with-value').progressBar({
        duration: 5000
    });

    $('.js-set-progress').on('click', function (e) {
        progress_default.refresh($(this).data('value'), 100);

    });

})(jQuery);