/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/13/15 8:15 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var Rating = function ($rating, options) {
        var defaults = {
            background: 'transparent'
        };

        var itemClass = 'rating_item',
            itemActiveClass = 'rating_item_active',

            settings = $.extend(true, {}, defaults, options);

        var assignEvents = function () {
            $rating
                .find('.' + itemClass)
                .not('.rating_item_rating')
                .hover(hoverIn, hoverOut)
            ;
        };

        var hoverIn = function () {
            $(this)
                .addClass(itemActiveClass)
                .prevAll()
                .addClass(itemActiveClass);

            $rating
                .find('.rating_item_rating span')
                .text(parseInt($(this).text()));
        };

        var hoverOut = function () {
            $(this)
                .removeClass(itemActiveClass)
                .prevAll()
                .removeClass(itemActiveClass);

            $rating
                .find('.rating_item_rating span')
                .text(0);
        };

        this.initialize = function () {
            $rating.css({background: settings.background});

            assignEvents();
        };
    };

    $.fn.rating = function (options) {
        var $rating = new Rating(this, options);

        $rating.initialize();

        return $rating;
    };

    $('.rating').rating({
        background: '#ffff00'
    });

})(jQuery);