function addSeparator(value) {
    function _addSeparator() {
        var rule = /(\d+)(\d{3},)/;
        if (!rule.test(value)) {
            return;
        }
        value = value.replace(rule, '$1,$2');
        _addSeparator(value);
    }

    value = value.toString().replace(/(\d+)(\d{3}$)/, '$1,$2');

    _addSeparator(value);

    return value;
}