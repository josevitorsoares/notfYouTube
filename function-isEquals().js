//Function para comparar Strings
function isEquals(string_one, string_two) {
    if (string_one.length != string_two.length) {
        return false
    } else {
        var cont = 0
        var tamanho = string_one.length

        for (var i = 0; i < tamanho; i++) {
            if (string_one[i] == string_two[i]) {
                cont = cont + 1
            }
        }

        if (cont == tamanho) {
            return true
        } else {
            return false
        }
    }
}

var str1 = 'String 1'
var str2 = 'string 1'

if(isEquals(str1, str2) == true){
    console.log('Iguais')
} else {
    console.log('Diferentes')
}