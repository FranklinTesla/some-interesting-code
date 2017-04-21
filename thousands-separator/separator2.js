
function addSeparator(value) {
    function _reverseStr(str) {
        return str.split('').reverse().join('');
    }

    value = _reverseStr(value.toString())
                .replace(/\d{3}/g, '$&,').replace(/,$/, '');
    return _reverseStr(value);
}