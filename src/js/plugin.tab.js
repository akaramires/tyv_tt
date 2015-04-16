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

    var MyTabs = function () {
        this.items = [];

        this.parse_url = function () {
            var url = window.location.href;

            if (url.indexOf("#") < 0) {
                return 0;
            }

            var hash = url.substring(url.indexOf("#"));

            return parseInt(hash.substring(5));
        };

        this.setActive = function (index) {
            var $item = $('.' + classes.wrapper).find('.' + classes.titles + ' .' + classes.single + ':eq(' + index + ')');
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

            if (index !== undefined) {
                window.location = '#tab-' + index;
            }

            return $item;
        };

        this.assignEvents = function () {
            var self = this;

            $('.' + classes.link).on('click', function (e) {
                e.preventDefault();

                self.setActive($(this).parent().index());
            });
        };

        this.init = function () {
            this.setActive(this.parse_url());

            this.assignEvents();

            this.items = $('.' + classes.single);

            return this;
        };
    };

    $.fn.myTabs = function () {
        if (window.myTabs !== undefined) {
            return window.myTabs;
        }

        return window.myTabs = new MyTabs().init();
    };

    $.fn.myTabs();

})(jQuery);