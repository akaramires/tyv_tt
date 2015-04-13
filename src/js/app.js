/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/13/15 8:15 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    $.fn.rating = function (options) {

        var
            $allSelectors = $(this),
            defaults = {
                background : 'transparent',
                showCurrent: false,
                verbose    : false
            }
            ;

        $allSelectors
            .each(function () {
                var
                    settings = $.extend(true, {}, defaults, options),
                    $rating = $(this),
                    $percentLabel = null,
                    stars_count = 0,
                    module
                    ;

                module = {
                    initialize: function () {
                        module.verbose('Initializing rating', settings);

                        $rating.addClass('rating');
                        module.assignEvents();

                        stars_count = $rating.find('> li:not(.current)').length;
                    },

                    has: {
                        percentLabel: function () {
                            return ($rating.find('.current span').length > 0);
                        },
                        activeStar  : function () {
                            return ($rating.find('.active').length > 0);
                        }
                    },

                    create: {
                        percentLabel: function () {
                            $rating
                                .css('width', (parseFloat($rating.width()) + 16) + 'px')
                                .prepend('<li class="current"><span></span></li>')
                            ;

                            $percentLabel = $rating.find('li.current span');

                            module.verbose('Creating label', $percentLabel);
                        }
                    },

                    showPercentLabel: function () {
                        if (!module.has.percentLabel()) {
                            module.create.percentLabel();
                        }

                        module.calcActivePercent();
                    },

                    calcActivePercent: function () {
                        if (module.has.activeStar()) {
                            module.calcCurrentPercent($rating.find('.active').index());
                        } else {
                            module.calcCurrentPercent(stars_count);
                        }
                    },

                    calcCurrentPercent: function (index) {
                        if ($percentLabel) {
                            var percent = (stars_count - index + 1) * (100 / stars_count);
                            $percentLabel.text(percent + '%');
                        }
                    },

                    assignEvents: function () {
                        module.verbose('Assigning events', settings);

                        $rating.find('li:not(.current)').hover(function () {
                            module.calcCurrentPercent($(this).index());
                        });

                        $rating.mouseleave(function () {
                            module.calcActivePercent();
                        });
                    },

                    verbose: function () {
                        if (settings.verbose) {
                            console.info(arguments);
                        }
                    }
                };

                if (!$rating.hasClass('rating')) {
                    module.initialize();

                    if (settings.showCurrent) {
                        module.showPercentLabel();
                    }
                }
            });

        return this;
    };

    $('.js-rating').rating();

    $('.js-rating-red').rating({
        background: 'lightgray'
    });

    $('.js-rating-current').rating({
        showCurrent: true
    });

})(jQuery);