function addSeparator(num) {
    return num.toString().replace(/(\d{1,2})?((\d{3})+)(?=\.|$)/, (match, $1, $2) => {
        const temp = $2.replace(/\d{3}/g, ',$&')
        return $1 ? $1 + temp : temp.replace(/^,/, '')
    })
}