/**
 * Created by Elmar <a.k.a. Ramires> Abdurayimov on 4/16/15 10:18 PM
 * @copyright (C)Copyright 2015 e.abdurayimov@gmail.com
 */

var Utils = {
    declension: function (num, expressions) {
        var result;
        var count = num % 100;

        if (count >= 5 && count <= 20) {
            result = expressions['2'];
        } else {
            count = count % 10;
            if (count == 1) {
                result = expressions['0'];
            } else if (count >= 2 && count <= 4) {
                result = expressions['1'];
            } else {
                result = expressions['2'];
            }
        }
        return result;
    },

    time_difference: function (difference) {
        var days = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= days * 1000 * 60 * 60 * 24;

        var hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;

        var minutes = Math.floor(difference / 1000 / 60);
        difference -= minutes * 1000 * 60;

        var seconds = Math.floor(difference / 1000);

        var output = [];

        output.push(days    ? days    + ' ' + Utils.declension(days,    ['день',    'дня',     'дней']  ) : '');
        output.push(hours   ? hours   + ' ' + Utils.declension(hours,   ['час',     'часа',    'часов'] ) : '');
        output.push(minutes ? minutes + ' ' + Utils.declension(minutes, ['минута',  'минуты',  'минут'] ) : '');
        output.push(seconds ? seconds + ' ' + Utils.declension(seconds, ['секунда', 'секунды', 'секунд']) : '');

        output = output.filter(Boolean);

        return output.length > 0
            ? output.join(' ')
            : '0 секунд';
    },

    get_hash: function () {
        var url = window.location.href;

        if (url.indexOf("#") < 0) {
            return false;
        }

        return url.substring(url.indexOf("#"));
    }
};