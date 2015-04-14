/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var ProgressBar = function ($progressBar, options) {
        var defaults = {
            duration: 1000,
            percent : 30
        };

        var $progress = null;
        var $label = null;

        var settings = $.extend(true, {}, defaults, options);

        var draw = function (percent) {
            $progress
                .animate({
                    width: percent + '%'
                }, settings.duration)
            ;

            $label
                .text(percent + '%')
            ;
        };

        var calc = function () {
            if ($progressBar.attr('data-current') &&
                $progressBar.attr('data-total')) {

                var current = $progressBar.data('current');
                var total = $progressBar.data('total');
                var percent = 100 * current / total;

                draw(percent);

                return;
            }

            draw(settings.percent);
        };

        this.initialize = function () {
            $progress = $progressBar.find('.progress-bar-progress');
            $label = $progressBar.find('.progress-bar-label');

            calc();
        };
    };

    $.fn.progressBar = function (options) {
        var $progressBar = new ProgressBar(this, options);

        $progressBar.initialize();

        return $progressBar;
    };

})(jQuery);