/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var success = {};

    var errors = {
        common          : 'Что то пошло не так. Повторите пожалуйста попытку.',
        cmd_404         : 'Извините, но команда не найдена.',
        cmd_tab_args_num: 'Неверный вызов команды.',
        cmd_tab_404     : 'Не удалось выбрать таб №%query%. Доступны табы с 1 по %tabs_count%.'
    };

    var TabCommands = {
        selectTab: function () {
            if (arguments.length !== 1) {
                return {
                    status: false,
                    msg   : errors.cmd_tab_args_num
                };
            }

            var tabs = window.myTabs;
            var index = parseInt(arguments[0]);

            if (index < 0 || index >= tabs.items.length) {
                var error = errors.cmd_tab_404
                    .replace('%query%', index)
                    .replace('%tabs_count%', tabs.items.length);

                return {
                    status: false,
                    msg   : error
                };
            } else {
                var $active_tab = tabs.setActive(index - 1);

                return {
                    status: true,
                    msg   : 'Выбран таб №' + index + ' "' + $.trim($active_tab.text()) + '".'
                };
            }
        },

        swapTabs: function () {

        },

        showStat: function () {

        }
    };

    var MyConsole = function ($console) {
        this.$console = null;
        this.$history = null;
        this.$input = null;

        this.CMD_HISTORY = [];

        this.init($console);
    };

    MyConsole.prototype.init = function ($console) {
        this.$console = $console;

        if (!this.$console.hasClass('console-initialized')) {
            this.build();
        }
    };

    MyConsole.prototype.build = function () {
        var self = this;

        this.$history = $('<ul>', {
            'class': 'js_history'
        });

        this.$input = $('<input>', {
            'type'     : 'text',
            'class'    : 'js_input',
            'autofocus': 'true',
            'value'    : 'selectTab(1)'
        }).on('keyup', function (e) {
            if (e.keyCode != 13) {
                return false;
            }

            self.historyAdd(e.target.value);

            if (self.cmdIsValid()) {
                self.exec();
            } else {
                self.message(errors.cmd_404);
            }

            e.target.value = '';
        });

        this.$console
            .addClass('console console-initialized')
        ;

        $('<div/>', {
            'class': 'console_history',
            'html' : this.$history
        }).appendTo(this.$console);

        $('<div/>', {
            'class': 'console_input',
            'html' : this.$input
        }).appendTo(this.$console);
    };

    MyConsole.prototype.currentCmd = function () {
        return this.CMD_HISTORY[this.CMD_HISTORY.length - 1];
    };

    MyConsole.prototype.normalizeCmd = function (cmd) {
        return cmd === undefined
            ? this.currentCmd()
            : cmd;
    };

    MyConsole.prototype.message = function (message, type, cmd) {
        type = type === undefined || $.inArray(type, ['success', 'error']) < 0
            ? 'error'
            : type;
        cmd = this.normalizeCmd(cmd);

        $('<li/>', {
            'class': type,
            'html' : '<span>' + encodeURI(cmd) + '</span>' + message
        }).appendTo(this.$history);

        this.$history.scrollTop(10000000)
    };

    MyConsole.prototype.exec = function (cmd) {
        var response = eval('TabCommands.' + this.normalizeCmd(cmd));

        this.message(response.msg, response.status ? 'success' : 'error');
    };

    MyConsole.prototype.cmdIsValid = function () {
        var cmd = this.currentCmd();

        var matches = /(\w+)\((.*)\)/.exec(cmd) || [];

        if (!matches.length) {
            return false;
        }

        return $.inArray(matches[1], Object.keys(TabCommands)) > -1;
    };

    MyConsole.prototype.historyAdd = function (cmd) {
        if (this.CMD_HISTORY.length == 10) {
            this.CMD_HISTORY.shift();
        }

        this.CMD_HISTORY.push(cmd);
    };

    $.fn.myConsole = function () {
        return this.each(function () {
            new MyConsole($(this));
        });
    };

})(jQuery);