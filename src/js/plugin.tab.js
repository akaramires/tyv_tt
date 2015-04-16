/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var classes = {
        wrapper: 'tabs',
        titles : 'tabs_titles',
        single : 'tabs_titles_single',
        link   : 'tabs_titles_single_link',
        active : 'tabs_titles_single_active'
    };

    var Tabs = function () {
        var parse_url = function () {
            var url = window.location.href;

            if (url.indexOf("#") < 0) {
                return 0;
            }

            var hash = url.substring(url.indexOf("#"));

            return parseInt(hash.substring(5));
        };

        var setActive = function (index) {
            var $item = $('.' + classes.wrapper).find('.' + classes.titles + ' .' + classes.single + ':eq(' + (index ? index - 1 : index) + ')');
            var target = $item.find('.' + classes.link).attr('href');

            $item
                .addClass(classes.active)
                .siblings()
                .removeClass(classes.active)
            ;

            $(target)
                .show()
                .siblings()
                .hide()
            ;

            if (index) {
                window.location = '#tab-' + index;
            }

            return this;
        };

        var assignEvents = function () {
            var self = this;

            $('.' + classes.link).on('click', function (e) {
                e.preventDefault();

                setActive($(this).parent().index() + 1);
            });
        };

        this.publicMethods = function () {
            this.init = function () {
                this.setActive(parse_url());

                assignEvents();

                return this;
            };

            this.setActive = setActive;

            return this;
        };
    };

    $.fn.tabs = function () {
        if ($('.' + classes.wrapper).length < 1) {
            return false;
        }

        var $tabs = new Tabs();

        new $tabs.publicMethods()
            .init()
        ;

        return $tabs;
    };

    $.fn.tabs();

})(jQuery);