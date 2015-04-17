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
            current : 30,

            selector_progress: '.progress-bar-progress',
            selector_label   : '.progress-bar-label',

            data_attr_current: 'current',
            data_attr_total  : 'total'
        };

        this.$progressBar = $progressBar;
        this.$progress = null;
        this.$label = null;

        this.settings = $.extend(true, {}, defaults, options);
    };

    ProgressBar.prototype.getLabel = function (value) {
        return value + '%';
    };

    ProgressBar.prototype.draw = function (percent) {
        var self = this;

        return self.$progress
            .animate({
                width: self.getLabel(percent)
            }, self.settings.duration, function () {
                self.$label
                    .text(self.getLabel(percent))
                ;
            });
    };

    ProgressBar.prototype.parse = function () {
        var tmp_current = this.$progressBar.data(this.settings.data_attr_current);
        var tmp_total = this.$progressBar.data(this.settings.data_attr_total);

        return this.refresh(tmp_current, tmp_total);
    };

    ProgressBar.prototype.refresh = function (current, total) {
        var tmp_current = current || this.settings.current;
        var tmp_total = total || this.settings.total;

        return this.draw(100 * tmp_current / tmp_total);
    };

    ProgressBar.prototype.initialize = function () {
        this.$progress = this.$progressBar.find(this.settings.selector_progress);
        this.$label = this.$progressBar.find(this.settings.selector_label);

        return this.parse();
    };

    $.fn.progressBar = function (options) {
        var $pBar = new ProgressBar(this, options);

        $pBar.initialize();

        return $pBar;
    };

})(jQuery);