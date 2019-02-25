((function() {
    angular.module('appModule')
        .filter('bytes', function() {
            return function(bytes, precision) {
                if (bytes == 0) return '0 KB';
                if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
                if (typeof precision === 'undefined') precision = 1;
                var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
                    number = Math.floor(Math.log(bytes) / Math.log(1024));
                return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
            }
        })
        .filter('maskingName', function() {
            return function(name) {
                if (typeof(name) === 'string') {
                    var len = name.length;
                    var maskLen = Math.round(len / 3);
                    var newName = name.substring(0, (len - maskLen));
                    for (var i = 0; i < maskLen; i++) {
                        newName += '*';
                    }

                    return newName;
                } else {
                    return name;
                }
            };
        })
        .filter('maskingEmail', function() {
            return function(email) {
                if (typeof(email) === 'string') {
                    var splitEmail = email.split('@');
                    var domain = splitEmail.length === 2 ? splitEmail[1] : '';
                    var idLen = splitEmail[0].length;

                    return splitEmail.length === 1 ?
                        (splitEmail[0].substring(0, (idLen-3)) + '***') :
                        (splitEmail[0].substring(0, (idLen-3)) + '***@' + domain);

                } else {
                    return email;
                }
            };
        })
        .filter('colorMasking', function($rootScope) {
            return function(codeName) {
                console.log("codeName => ", codeName);
                return codeName;
            };
        });
})());