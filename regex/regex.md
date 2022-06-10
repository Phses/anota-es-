# Notas sobre Expressões regulares - REGEX

## Overview

Expressões regulares podem ser definidas como uma sequência de caracteres que dedefinem um padrão de busca. 

É muito útil para manipularmos strings e validar formato de dados, como por exemplo CPF, data, números de telefone etc.

Podemos escrever regex com dois tipos de caracteres

- Caracter Literal: O padrão de pesquisa é literalmente o caractere desejado. 

- Meta caracteres: Um caractere que indica um tipo de padrão generalizado. É algo mais abrangente do que quando usamos o caracter literal. 

  > Quantificadores indicam o número de determidado caracter em um padrão de busca.

  > Posição define onde queremos que esteja o caracter ou um conjunto de caracteres em nosso padrão de busca.

###  Meta Caracteres

| Meta Chars  | Descrição                  |
|    :----:   | :---                       |
| \d          | Numeros 0-9                |
| .           | Qualquer Caractere         |
| \w          | conjuntos de A-Z, a-z, 0-9 |
| \s          | Espaço em branco           |


- Quando usamos traço e a letra maiúscla para representar um meta caractere é como se fosse um símbolo de negação dos caracteres descritos acima.

> Ex: \D indica que nosso padrão busca por tudo aquilo que não é um número de 0-9

### Quantificadores 

| Quantificadores | Descrição                        |
|   :----:        | :---                             |
| *               | 0 ou mais ocorrências            |
| +               | 1 ou mais ocorrências            |
| ?               | 0 ou 1 ocorrência                |
| {N}             | busca uma sequência de N carac = | 

> Eu gosto de dizer que o quantificador *?* define o meta caractere como opcional

um padrão de busca por um número de telefone no formato *99923-2134* 

```js

  /\d{5}-\d{4}/

  ```
### Indicadores de posição

| Indicador | Posição  |
| :----:    | :---     |
| ^         | Ínicio   |
| $         | Final    |
| \b        | Limite de palavras |

> O indicador \b define que deve haver um espaço entre outro caractere no começo ou final de uma palavra

- Alguns exemplos com o que definimos até agora

  - Busca por uma palavra com 4 letras no seguinte texto:
  
  > Estes sao alguns numeros de telefone (31)99344-2345. Voce tambem pode me ligar no 31-98234-5432 e claro, pode sempre me encontrar no 37 98544 2345. Tambem no email pedro123@gmail.com.

  ![Pesquisa usando regex](/3.png)


### Classe de caracteres 

Definimos uma classe de caracteres colocado-os entre colchetes **[]**, com isso queremos dizer que qualqer caracter dentro dos colchetes é um caracter válido para o nosso padrão de busca.

- Dentro da classe de carecteres existe dois que são especiais.

  > **-** : Define um intervalo. Ex: \[0-5] Qualquer caractere no intervalo de 0 a 5 é válido.

  > **^** : Negação de um intervalo. Ex: \[^0-5] Qualquer caractere que não esteja no intervalo de 0 a 5 é válido.

### Capturar grupos

Em regex quando separamos um determidado padrão com parenteses nós estamos referenciando aquele padrão como um grupo diferente, tornando possível o acesso a este grupo

### Métodos que podemos utilizar usando regex

r - regex
s - string
d - delimitador
ns - nova string

- **r.test(s)** : Recebe uma string como parâmetro e se a string bate com a expressão regular retorna true.

- **s.match(r)** : Retorna a parte da string que bate com a expressão regular informada. 

  > Por default é retornado apenas um array com o primeiro match, o index do match, a string completa e os grupos capturados.

  > Se informada a flag **g** um array com todos os matchs é retornado.

- **Flags** : São uma maneira de modificar o comportamento de uma expressão regular.

  > **g - Global** : Faz com que a pesquisa seja em toda a string, mesmo que haja um match o js continua procurando por outros e não apenas retorna o primeiro match.

  > **i - Case Incensitive** : Por dafault as funções de test e match são sensitivas a letras maiúsculas, a flag i muda esse comportamento fazendo com que letras maiúsculas tenham o mesmo significado que minúscula.

- **r.exec(s)** : Executa a busca por um padrão regx em uma determinada string. O método irá retornar um array com o primeiro match e todos os grupos capturados, se houver mais de um match é necessário executar o método novamente. O método irá retornar um match a cada execução até retornar null, que é quando todos os matches já foram retornados.

  > Obs: Para o comportamento citado acima é preciso informar a flag g no final da regex.

- **r.split(d)** : O método split recebe um delimitador e retorna um array com cada item da string que é separado pelo delimitador informado.

  > Obs: Quando uso parêntesis no delimitador, dentro da regex, os delimitadores também são salvos no array que é retornado.

- **s.replace(r,ns)** : O método recebe como primeiro parâmetro uma regex e como segundo parâmetro uma string. Toda vez que um item da string que está sendo pesquisada da match com a regex, o item é substituido pela string passada no segundo parâmetro da função.

  > Obs: A string original não é modificada.






