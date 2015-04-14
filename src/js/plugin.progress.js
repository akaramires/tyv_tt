/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var ProgressBar = function ($progressBar, options) {
        var defaults = {
            duration: 1000,
            total   : 100,
            current : 30
        };

        var $progress = null;
        var $label = null;

        var settings = $.extend(true, {}, defaults, options);

        var __draw = function (percent) {
            $progress
                .animate({
                    width: percent + '%'
                }, settings.duration, function () {
                    $label
                        .text(percent + '%')
                    ;
                })
            ;
        };

        var __parse = function () {
            var total = settings.total;
            var current = settings.current;

            if ($progressBar.attr('data-current') &&
                $progressBar.attr('data-total')) {

                total = $progressBar.data('total');
                current = $progressBar.data('current');
            }

            __refresh(current, total);
        };

        var __refresh = function (current, total) {
            settings.current = current;
            settings.total = total;

            return __draw(100 * current / total);
        };

        this.getTotal = function () {
            return settings.total;
        };

        this.getCurrent = function () {
            return settings.current;
        };

        this.refresh = function (current, total) {
            __refresh(current, total || settings.total);
        };

        this.initialize = function () {
            $progress = $progressBar.find('.progress-bar-progress');
            $label = $progressBar.find('.progress-bar-label');

            __parse();
        };
    };

    $.fn.progressBar = function (options) {
        var $progressBar = new ProgressBar(this, options);

        $progressBar.initialize();

        return $progressBar;
    };

})(jQuery);