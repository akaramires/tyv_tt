/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/14/15 12:10 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

(function ($) {

    "use strict";

    var success = {
        tab_selected: 'Выбран таб №%number% "%title%".',
        tab_swap    : 'Поменяли табы №%from_number% "%from_title%" и №%to_number% "%to_title%" местами.'
    };

    var errors = {
        common     : 'Что то пошло не так. Повторите пожалуйста попытку.',
        cmd_404    : 'Извините, но команда не найдена.',
        cmd_invalid: 'Неверный вызов команды.',
        cmd_tab_404: 'Не удалось выбрать таб №%query%. Доступны табы с 1 по %tabs_count%.'
    };

    var TabCommands = function () {

        var PAGE_STARTED_AT = new Date().getTime();

        var is_valid_index = function (index) {
            return index >= 0 && index < window.myTabs.items.length;
        };

        this.selectTab = function () {
            if (arguments.length !== 1) {
                return {
                    status: false,
                    msg   : errors.cmd_invalid
                };
            }

            var tabs = window.myTabs;
            var index = parseInt(arguments[0]);

            if (!is_valid_index(index)) {
                var error = errors.cmd_tab_404
                    .replace('%query%', index)
                    .replace('%tabs_count%', tabs.items.length);

                return {
                    status: false,
                    msg   : error
                };
            }

            var $active_tab = tabs.setActive(index);

            return {
                status: true,
                msg   : success.tab_selected
                    .replace('%number%', index)
                    .replace('%title%', $.trim($active_tab.text()))
            };
        };

        this.swapTabs = function () {
            if (arguments.length !== 2) {
                return {
                    status: false,
                    msg   : errors.cmd_invalid
                };
            }

            var tabs = window.myTabs;
            var from = parseInt(arguments[0]);
            var to = parseInt(arguments[1]);

            if (!is_valid_index(from) || !is_valid_index(to)) {
                return {
                    status: false,
                    msg   : errors.cmd_tab_404
                        .replace('%query%', from + ' и №' + to)
                        .replace('%tabs_count%', tabs.items.length)
                };
            }

            var $from = $(tabs.items[from]);
            var $to = $(tabs.items[to]);

            $to.insertBefore($from);

            tabs.refreshItems();

            return {
                status: true,
                msg   : success.tab_swap
                    .replace('%from_number%', from)
                    .replace('%from_title%', $.trim($from.text()))
                    .replace('%to_number%', to)
                    .replace('%to_title%', $.trim($to.text()))
            };
        };

        this.showStat = function () {
            var now = new Date().getTime();
            var page_age = Utils.time_difference(now - PAGE_STARTED_AT);
            var tabs = window.myTabs;

            var ages_html = [];

            for (var key in tabs.tabs_age) {
                var age = tabs.tabs_age[key].age;

                tabs.tabs_age[key].started && (age += (now - tabs.tabs_age[key].started));

                if (age > 0) {
                    ages_html.push('<li>');
                    ages_html.push((key.substr(4)) + ' "' + tabs.tabs_age[key].title + '": ');
                    ages_html.push(Utils.time_difference(age));
                    ages_html.push('</li>');
                }
            }

            if (ages_html.length > 0) {
                ages_html = '<br>Детализация времени просмотра табов: <ul>' + ages_html.join('') + '</ul>';
            }

            return {
                status: true,
                msg   : 'Общее время работы со страницей: ' + page_age + ages_html
            };
        };
    };

    var MyConsole = function ($console) {
        this.$console = null;
        this.$history = null;
        this.$input = null;

        this.HISTORY = [];
        this.HISTORY_INDEX = 0;

        this.tabCmds = new TabCommands();

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
            'autofocus': 'true'
        }).on('keyup', function (e) {
            var command;

            switch (e.keyCode) {
                case 13:
                    if (e.target.value.length === 0) {
                        return;
                    }

                    self.historyAdd(e.target.value);

                    if (self.cmdIsValid()) {
                        self.exec();
                    } else {
                        self.message(errors.cmd_404);
                    }

                    e.target.value = '';
                    self.HISTORY_INDEX = 0;

                    break;
                case 38:
                    if (self.HISTORY.length > 0) {
                        command = self.HISTORY[self.HISTORY.length - self.HISTORY_INDEX - 1];

                        if (command !== undefined) {
                            e.target.value = command;
                            self.HISTORY_INDEX++;
                        }
                    }
                    break;
                case 40:
                    if (self.HISTORY.length > 0) {
                        command = self.HISTORY[self.HISTORY.length - self.HISTORY_INDEX + 1];

                        if (command !== undefined) {
                            e.target.value = command;
                            self.HISTORY_INDEX--;
                        }
                    }
                    break;
            }
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
        return this.HISTORY[this.HISTORY.length - 1];
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
        var response = eval('this.tabCmds.' + this.normalizeCmd(cmd));

        this.message(response.msg, response.status ? 'success' : 'error');
    };

    MyConsole.prototype.cmdIsValid = function () {
        var cmd = this.currentCmd();

        var matches = /(\w+)\((.*)\)/.exec(cmd) || [];

        if (!matches.length) {
            return false;
        }

        return $.inArray(matches[1], Object.keys(this.tabCmds)) > -1;
    };

    MyConsole.prototype.historyAdd = function (cmd) {
        if (this.HISTORY.length == 10) {
            this.HISTORY.shift();
        }

        this.HISTORY.push(cmd);
    };

    $.fn.myConsole = function () {
        return this.each(function () {
            new MyConsole($(this));
        });
    };

})(jQuery);