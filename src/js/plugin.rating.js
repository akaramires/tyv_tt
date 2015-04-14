/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var Rating = function ($rating, options) {
        var defaults = {
            background: 'transparent'
        };

        var itemClass = 'rating_item';
        var itemCurrentClass = 'rating_item_current';
        var itemActiveClass = 'rating_item_active';

        var $current = null;
        var $label = null;

        var settings = $.extend(true, {}, defaults, options);

        var assignEvents = function () {
            $rating
                .find('.' + itemClass)
                .not('.rating_item_rating')
                .hover(hoverIn, hoverOut)
                .click(click)
            ;
        };

        var hoverIn = function () {
            $(this)
                .addClass(itemActiveClass)
                .prevAll()
                .not('.rating_item_rating')
                .addClass(itemActiveClass)
            ;

            $label
                .text(parseInt($(this).text()))
            ;
        };

        var hoverOut = function () {
            $(this)
                .removeClass(itemActiveClass)
                .prevAll()
                .removeClass(itemActiveClass)
            ;

            $label
                .text(0)
            ;

            checkCurrent();
        };

        var click = function (e) {
            e.preventDefault();

            $(this)
                .addClass(itemCurrentClass)
                .siblings()
                .removeClass(itemCurrentClass)
            ;
        };

        var checkCurrent = function () {
            $current = $rating.find('.' + itemCurrentClass).last();
            if ($current.length) {
                $current
                    .prevAll()
                    .not('.rating_item_rating')
                    .addClass(itemCurrentClass)
                ;

                $label
                    .text(parseInt($current.text()))
                ;
            }
        };

        this.initialize = function () {
            $rating
                .css({background: settings.background})
            ;

            $label = $rating.find('.rating_item_rating span');

            checkCurrent();
            assignEvents();
        };
    };

    $.fn.rating = function (options) {
        var $rating = new Rating(this, options);

        $rating.initialize();

        return $rating;
    };

})(jQuery);