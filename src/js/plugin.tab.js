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
        this.tabs_age = {};

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

            this.tab_add_age(index);

            return $item;
        };

        this.tab_add_age = function (index) {
            var now = new Date().getTime();

            for (var key in this.tabs_age) {
                if (this.tabs_age[key].started) {
                    this.tabs_age[key].age += (now - this.tabs_age[key].started);
                    this.tabs_age[key].started = false;
                } else {
                    if (key == 'tab_' + index) {
                        this.tabs_age[key].started = now;
                    }
                }
            }
        };

        this.assignEvents = function () {
            var self = this;

            $('.' + classes.link).on('click', function (e) {
                e.preventDefault();

                self.setActive($(this).parent().index());
            });
        };

        this.init = function () {
            var self = this;

            this.items = $('.' + classes.single);
            this.items.each(function () {
                self.tabs_age['tab_' + $(this).index()] = {
                    title  : $.trim($(this).text()),
                    age    : 0,
                    started: false
                };
            });

            this.assignEvents();
            this.setActive(Utils.get_hash() ? Utils.get_hash().substring(5) : 0);

            return this;
        };

        this.refreshItems = function () {
            this.items = $('.' + classes.single);
        };
    };

    $.fn.myTabs = function () {
        if (window.myTabs !== undefined) {
            return window.myTabs;
        }

        return window.myTabs = new MyTabs().init();
    };

    $.fn.myTabs();

})
(jQuery);