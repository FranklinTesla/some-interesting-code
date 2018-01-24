
function addSeparator(value) {
    function _reverseStr(str) {
        return str.split('').reverse().join('');
    }

    value = _reverseStr(value.toString())
                .replace(/(\d+\.)?(\d{3})/g, '$1$2,').replace(/,$/, '');
    return _reverseStr(value);
}