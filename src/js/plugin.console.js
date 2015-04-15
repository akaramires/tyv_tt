/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var allowed_cmds = [
        'selectTab',
        'swapTabs',
        'showStat'
    ];

    var errors = {
        cmd_404         : 'Извините, но команда не найдена.',
        cmd_tab_args_num: 'Неверный вызов команды.',
        cmd_tab_404     : 'Не удалось выбрать таб №%query%. Доступны табы с 1 по %tabs_count%.'
    };

    var MyConsole = function ($element) {
        this.$history = null;
        this.$input = null;
        this.$historyWrapper = null;
        this.$inputWrapper = null;

        this.cmd_name = false;
        this.cmd_args = [];

        this.CMD_HISTORY = [];

        this.init($element);
    };

    MyConsole.prototype.init = function ($element) {
        this.draw($element);
    };

    MyConsole.prototype.draw = function ($element) {
        if ($element.hasClass('console')) {
            return false;
        }

        this.$historyWrapper = $('<div class="console_history js-history"></div>');
        this.$historyWrapper.append('<ul></ul>');

        this.$inputWrapper = $('<div class="console_input js-input"></div>');
        this.$inputWrapper.append('<input type="text" autofocus=""/>');

        $element
            .addClass('console')
            .append(this.$historyWrapper)
            .append(this.$inputWrapper)
        ;

        this.$history = $element.find('.js-history > ul');
        this.$input = $element.find('.js-input > input');

        this.assingInputHandler();
    };

    MyConsole.prototype.assingInputHandler = function () {
        var self = this;

        self.$input.keyup(function (e) {
            var cmd = e.target.value;

            if (e.keyCode == 13) {
                e.target.value = '';

                if (self.cmdIsValid(cmd) > -1) {
                    self['cmd_' + self.cmd_name](cmd);

                    return true;
                } else {
                    self.handleError(cmd, 'cmd_404');
                }

                self.handleCmd(cmd);

                self.cmd_name = false;
                self.cmd_args = [];

                self.$history.scrollTop(10000000)
            }
        });
    };

    MyConsole.prototype.handleError = function (cmd, key) {
        var html = [];

        html.push('<li class="error">');
        html.push('   <span>' + encodeURI(cmd) + '</span>');
        html.push('   ' + errors[key]);
        html.push('</li>');

        this.$history.append(html.join('\n'));
    };

    MyConsole.prototype.cmdIsValid = function (cmd) {
        var matches = /(\w+)\((.*)\)/.exec(cmd) || [];

        if (!matches.length) {
            return -1;
        }

        var exists = $.inArray(matches[1], allowed_cmds);

        if (exists > -1) {
            this.cmd_name = matches[1];
            this.cmd_args = matches[2]
                .split(/\s*,\s*/)
                .filter(function (arg) {
                    return arg !== '';
                });
        }

        return exists;
    };

    MyConsole.prototype.handleCmd = function (cmd) {
        if (this.CMD_HISTORY.length == 10) {
            this.CMD_HISTORY.shift();
        }

        this.CMD_HISTORY.push(cmd);
    };

    MyConsole.prototype.cmd_selectTab = function (cmd) {
        if (this.cmd_args.length !== 2) {
            this.handleError(cmd, 'cmd_tab_args_num')
        }
    };

    MyConsole.prototype.cmd_swapTabs = function (cmd) {
        console.log(this.cmd_args);
    };

    MyConsole.prototype.cmd_showStat = function (cmd) {
        console.log(this.cmd_args);
    };

    $.fn.myConsole = function () {
        return this.each(function () {
            new MyConsole($(this));
        });
    };

})(jQuery);