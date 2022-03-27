# Notas - Uma visão de como o JS funciona por baixo dos panos

## Conteúdo

- [Overview](#overview) -[Engine e Runtime](#engine-e-runtime)
- [Contexto de Execução](#contexto-de-execução)
- [Scope e scope chain](#scope-e-scope-chain)
- [Hoisting](#hoisting)
- [This keyword](#this-keyword)

### Overview

- Linguagem de alto nível- Não precisamos gerenciar memoria

- Garbage-collected - Um recurso da linguagem que limpa a memoria de objetos que não estão sendo usados e são desnecessários
  ao funcionamento do programa.

- Base-Prototype objeto orietada- Tudo em JavaScript é um Objeto, inclusive arrays, o que nos permite usar metódos como push, devido a herença prototype.

- multi-paradigma - Várias formas de possibilidade de estruturação do código e uso de técnicas diferentes como imperativa, funcional e orientação ao objeto.

- Interpretada ou compilada just-in-time: acontece dentro do mecanismo do javaScript. Não gera um arquivo executável.

- first-class functions - funções são tratadas como variáveis. Podemos passar funções para outras funções e retorna-las de funções;

- Linguagem dinâmica - Os tipos das variáveis não são definidos em tempo de compilação e sim em tempo de execução. Por isso não precisamos definir o tipo das variáveis enquanto estamos escrevendo o código;

- Single thread - JavaScript só consegue executar uma instrução por vez. Se tivermos uma tarefa que leve algum tempo para ser executada, isso bloquearia a thread por este tempo (non-blocking-behavior and loop event) - Executa tarefas de longo tempo de execução no background e depois devolvem elas para a thread princiapal.

- JS engine - Programa que executa JS code. Ex.: V8 engine e node JS.

- Call stack - Onde o código é executado, contexto de execução são criados. Heap - Onde ficam alocados os obejetos que precisamos acessar para cumprir as instruções.

  - Nota sobre a diferença entre compilação e interpretação

  - compilação - Todo o código é convertido em linguagem de máquina de uma só vez, depois ele é convertido em um arquivo executável que começa a execução do programa a qualquer tempo depois da compilação.
  - interpretação - O código é executado linha por linha. É lido
    e executado ao mesmo tempo.

- Moderno JS engine usa uma mistura entre compilação e execução para resolver o problema de linguagens interpretadas serem
  muito lentas. Compilação just in time. Compila todo código fonte e o executa imediatamente. Não gera um arquivo executável que pode ser transferido.

### Engine e Runtime

Etapas:
Parsing - Leitura do código

- AST - Árvore de sintaxe abstrata - separa todas as partes fundamentais para execução do programa, como palavras chaves const e tal e colocam tudo isso de maneira estruturada na árvore. Verifica erros de sintaxe. Será usada posteriormente.

- Compilação - Transforma o código fonte em código de máquina

- Execução - Acontece imediatamente após a compilação. Acontece na call stack.

- Otimização - Na compilação é gerado apenas um rascunho do código de máquina, para que o nosso código comece a ser executado de maneira rápida, após isso, enquanto nosso programa é executado, o código passa por frequentes otimizações e é retornado para execução.

- Tempo de execução (Runtime) - É uma união de todas as coisas que precisamos para usar JS
  (No coração de todo JS runtime é um JS engine - um não existe sem o outro.)

- JS Engine HEAP - Onde acessamos informações
- Call stack - Onde ficam as instruções (Contextos de execução são criados)

- Web API'S - DOM, timers, Fetch API.

- Callback queue - contêm todas funções de retorno que estão prontas para serem executadas. Funções que de alguma forma bloquariam a thread, que existe a dependência de um evento ou de tempo. Ex.: addEventListener e setTimeOut.

  Quando o evento acontece a função é colocada na callback queue (função pronta para ser executada) e depois que a
  callStack esta vazia a função vai para la para ser executada event loop.

### Contexto de execução

- Contexto de execução - Um ambiente em que um pedaço do js é executado. armazena toda informação para que algum
  código seja executado.

- Contexto de execução global - Após a compilação é criado um contexto de execução global para top-level-code (código que não está dentro de nenhuma função). No começo somente os códigos fora das funções serão executados e as funções são apenas declaradas. criado para o código que não pertence a nehuma função. (Funções só são executadas quando chamadas.)

Após a execução do top-level-code começa-se a execução das funções e a espera de callbacks. Para cada chamada de função é criado um contexto de execução por função.
obs.: Métodos são funções anexadas a objetos.

- Contexto de execução - fase de criação:
  Ambiente de variavel: Possui todas declarações de variáveis, funções e argumentos de objeto.
  Scope chain: Acessa variáveis globais, fora do escopo da função.
  This keyword - (Tratado posteriormente)

  - Contexto de execução de arrows functions não acessam argumetos de obejo e this keyword. Ele não os possui.
    Podem acessar do seu parente function regular mais próximo. (Dentro de obejtos não é ideal usar Arrow function)

  - Variáveis em que o conteúdo é o resultado de uma função são geradas na fase de criação como <unknown>. Seu resultado é gerado na fase de execução.

  Dentro do contexto de execução é gerado um array com os argumentos passados. Acontece em todas as fuções regulares. Não acontece em arrow functions.

- O engine JS controla a ordem em que as funções são chamadas e onde ele se encontra atualmente na fase de execução pela callback stack.

- Todos os contextos de execução juntos formam a callStack. A stack começa sempre pelo contexto de execução global e vai criando os contextos de execução das funções a partir do momento em que elas são chamadas. Quando todas as instruções da callStack são executadas ela começa a aguardar pelas callback functions, que serão fornecidas pelo event loop. callback functions são funções que demandam algum tipo de espera e como JS é single thread isto funciona como um non-block-behavior.

- A callStack garante que a ordem de execução nunca seja perdida.

### Scope e Scope Chain

- SCOPING - Controla como as variáveis são organizadas e acessadas pelo JS Engine.
  (Onde a variável vive?) (Onde podemos acessa-la e onde não podemos)

- LEXICAL SCOPING - Scopo é controlado pela colocação (posicionamento) de funções e de blocos de código. Blocos de código são trechos de código localizados dentro de chaves, podem ser após condicional if ou for loop, por exemplo. Funções escritas dentro de outra função podem ter acesso às variaveis da função externa, ou função pai. O escopo é influenciado pelo local onde escrevemos nossas funções ou blocos de código.

- ESCOPO - Local ou ambiente onde declaramos nossas variáveis. Podem ser Global scope, Function scope, Block scope.

- ESCOPO DE UMA VARIÁVEL - Região do nosso código onde podemos acessar uma variável.

- GLOBAL SCOPE - Declarada fora de qualquer function ou block scope. Variaveis acessiveis em qualquer lugar do nosso código.

- LOCAL SCOPE - Variáveis declaradas dentro de funções ou dentro de blocos. São acessíveis apenas dentro da função.

- BLOCK SCOPE - Tudo que está dentro de chaves. Variáveis só são acessiveis dentro do escopo em que foram declaradas. Block Scope só é válido para Let e Const. Var é acessível fora do block scope.
  ES5 - Existia apenas local e global scope.
  ES6 - Functions declaradas dentro de block scope só são acessiveis no scopo em que foram declaradas. (strict mode).

- VARIABLE LOOK UP SCOPE CHAIN - Um scopo interno a outro, ou child scope, terá acesso às variáveis do scopo externo, ou parent scope. Escopo externo não tem acesso às variáveis declaradas no scopo interno.

(Var é sempre function scope.)

Obs.: Se um block scope e um function scope são siblins (irmãos), então eles não possuem acesso às variáveis declaradas em cada um dos scopos. Variáveis só são acessiveis de escopos externos para internos. Lexical SCOPING.
Scope chain só funciona para cima.

Obs.: Scope chain - É relacionado com a ordem em que as funções são escritas.
Call stack - Ordem em que as funções são chamadas no código.

### Hoisting

- De uma maneira superficial, Hoisting é o içamento de variáveis paro o topo de seu escopo, ou seja, faz com que alguns tipos de variáveis e ou funções sejam acessíveis no código antes de serem declaradas.

- Behind the scenes: Durante a etapa de parsing, antes da execução da execução, o código é lido a procura de declaração de variáveis e para cada variável declarada uma nova propriedade é criada no ambiente de variável no contexto de execução (Fase de criação).

-Funções e variáveis:

- Function delarations- Hoisted, atual function e bolck scope: Podemos chama-la no código antes que seja declarada.

```js
console.log(add(3, 5)); // return 8

function add(a, b) {
  return a + b;
}
```

- Var Variables - Hoisted, Undefined value e function scope: Não obtemos o valor definido quando a usamos antes de declara-la.

```js
console.log(getUndefined); //return undefined

var getUndefined = true;
```

- Let e Const - Not Hoisted, Uninitialized, TDZ e Block scope: Variáveis são colocadas na zona morta temporal TDZ, o que significa que não podemos acessá-las do começo do escopo até o local onde são declaradas, se tentarmos fazer isso obtemos erro.

-Function express e Arrow functions- Depende de como são declaradas, se usamos Var, Let ou Const, já que no fundo são variáveis e obedecem o comportamento da variável declarada.

Obs.: TDZ evita erros no programa, já que é uma prática ruim usar variáveis antes que sejam declaradas.
Obs.: Undefined é um false value, podemos causar bugs no programa devido ao içamento de variáveis var antes que sejam declaradas.

### This Keyword

-Variável especial que é criada em todo contexto de execução. Sempre terá o valor do dono da função na qual a palavra this é usada. (Aponta para o dono da função).

-This não possui um valor estático, depende de como a função é chamada e o seu valor só é atribuido quando a função realmente é chamada.

-Maneiras de se usar This keyword

```js
console.log(this); // Retorna The window Object - contexto global

const pedro = {
  firstName: "Pedro",
  year: 1992,
  calcAge: function () {
    return 2022 - this.year;
  },
};
console.log(pedro.calcAge()); //this tem o valor do obeto que chama o método e this.year retorna 1992

function calcAge(birthyear) {
  const age = 2037 - birthyear;
  console.log(this); // strict mode retorna undefined, fora do strict mode retorna the window object
  return age;
}
calcAge(1992);

const pedro = {
  firstName: "Pedro",
  year: 1992,
  calcAge: () => {
    return 2022 - this.year;
  },
};
console.log(pedro.calcAge()); // Retorna NaN
```

Arrow functions não obtêm seu próprio this keyword, por isso não é aconselhavel usalas como método.

### Primitives vs. Objects (Tipos primitivos vs. Tipos por referência)

- Primitives Types
  Number
  String
  Boolean
  Undefined
  Null
  Symbol
  BingInt

- Objects (Reference types)
  Object Literal
  Arrays
  Functions

- Armazenamento: **Objetos** são armazenados na memória HEAP, enquanto **Primitive Types** são armazenados na CallStack. (Contexto de execução em que elas são declaradas);

- Sempre que declaramos uma variável em JS o identificador aponta para um endereço de memória e atribui um valor para aquele endereço. Este valor é imutável, sempre que reatribuimos um valor para a variável ela começa a apontar para outro endereço de memória.

- Sempre que declaramos um Objeto é atrubuído um endereço na memória HEAP com o valor do ojeto, é alocado na callStack o identificador do endereço que aquele objeto está alocoda na memória HEAP. Isso acontece, pois objetos ocupam um maior espaço na memória e a memória HEAP é maior (POOL MEMORY). Quando copiamos um objeto estamos apenas criando uma nova variável que aponta para o mesmo Objeto. Podemos ver este comporatamento executando o código abaixo.

  ```js
  const person1 = {
    firstName: "Pedro",
    age: 29,
    city: "Belo Horizonte",
  };

  const person2 = person1;
  person2.firstName = "Camila";

  console.log(person1); //Retorna firstName = 'Camila'
  console.log(person2); //Retorna firstName = 'Camila

  //Se tentarmos reatribuir o objeto anterior a um objeto totalmente diferente teremos um erro de 'Assignment to const variable'.
  person2 = {}; //Permitido apenas se o objeto for declarado usando let
  ```

- Quando usamos const para declararmos um objeto, não encontramos problemas para mudar os valores de dentro do obejeto, isso acontece pois o que é alocado na stack é apenas o endereço de memória de onde o objeto está alocado na HEAP e este valor não altera quando alteramos uma propriedade do objeto.

- Podemos copiar um objeto em um endereço de memória deferente para que possamos alterar os valores de um sem alterar as propriedades do outro.

```js
  const person1 = {
    firstName: "Pedro",
    age: 29,
    city: "Belo Horizonte",
  };

  const person2 = Object.assign({}, person1;)
  person2.firstName = "Camila";

  console.log(person1); //Retorna firstName = 'Camila'
  console.log(person2); //Retorna firstName = 'Pedro'.
```
