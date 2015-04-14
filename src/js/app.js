/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/13/15 8:15 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    $('.rating.default').rating();
    $('.rating.yellow').rating({
        background: '#ffff00'
    });

    $('.progress-bar.default').progressBar();
    $('.progress-bar.with-value').progressBar({
        duration: 3000
    });

})(jQuery);