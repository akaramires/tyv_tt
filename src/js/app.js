/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/13/15 8:15 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var Rating = function (element, options) {
        var defaults = {
            background : 'transparent',
            showCurrent: false,
            verbose    : false
        };

        var $module = $(element),
            obj = this,

            settings = $.extend(true, {}, defaults, options),
            $percentLabel = null,
            stars_count = 0
            ;

        this.initialize = function () {
            verbose('Initializing rating', settings);

            $module.addClass('rating');
            stars_count = $module.find('> li:not(.current)').length;

            stylization();
            assignEvents();

            if (settings.showCurrent) {
                showPercentLabel();
            }
        };

        var hasPercentLabel = function () {
            return ($module.find('.current span').length > 0);
        };

        var hasActiveStar = function () {
            return ($module.find('.active').length > 0);
        };

        var createPercentLabel = function () {
            $module
                .prepend('<li class="current"><span></span></li>')
            ;

            $percentLabel = $module.find('li.current span');

            verbose('Creating label', $percentLabel);
        };

        var stylization = function () {
            verbose('Stylization rating', settings);

            console.log($module);
            $module
                .css({'background': settings.background})
            ;
        };

        var showPercentLabel = function () {
            if (!hasPercentLabel()) {
                createPercentLabel();
            }

            calcActivePercent();
        };

        var calcActivePercent = function () {
            if (hasActiveStar()) {
                calcCurrentPercent($module.find('.active').index());
            } else {
                calcCurrentPercent(stars_count);
            }
        };

        var calcCurrentPercent = function (index) {
            if ($percentLabel) {
                var percent = (stars_count - index + 1) * (100 / stars_count);
                $percentLabel.text(percent + '%');
            }
        };

        var assignEvents = function () {
            verbose('Assigning events', settings);

            $module.find('li:not(.current)').hover(function () {
                calcCurrentPercent($(this).index());
            });

            $module.mouseleave(function () {
                calcActivePercent();
            });
        };

        var verbose = function () {
            if (settings.verbose) {
                console.info(arguments);
            }
        };
    };

    $.fn.rating = function (options) {
        console.log($(this.selector));
        var $rating = new Rating(this, options);

        $rating.initialize();

        return $rating;
    };

    $('.js-rating').rating();

    $('.js-rating-gray').rating({
        background: 'lightgray'
    });

    $('.js-rating-current').rating({
        showCurrent: true
    });

})(jQuery);