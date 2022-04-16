# Programação Orientada a Objetos

***
## Conteúdo
- [Visão geral](#visão-geral)
- [Fundamentação](#fundamentação)

***
## Visão Geral

**Paradigma** - Conjunto de regras, modelos, padrões, métodos, teorias que servem como modelo, que determinam um padrão de como fazer a organização de um certo grupo de conhecimento.

O paradigma da programação estruturada PE baseia-se na organização do código de computador em sub-rotinas, no uso de escopo de variáveis e na passagem de parâmetros, além de usar o código escrito no formato de blocos de texto. A Programação Orientada a Objetos POO, faz uso de todos esses conceitos e alia a estes os conceitos de classe e objeto.

A POO pode ser considerada uma extensão do paradigma de progamação estruturada PE. De forma mais ampla, a POO é a PE em um nível de abstração mais alto, pois com essa técnica conseguimos abstrair dados e procedimentos \(Métodos\) em uma mesma estrutura de dados denominada objeto. 

Um objeto é o encapsulamento de uma representação de dados de um tipo específico juntamento com os procedimentos que fornecem as operações para esses dados.

O tipo de dado abstrato de uma linguagem POO chama-se classe.

Quando lidamos com registro na programação estruturada, \(Structs na linguagem C, que são um conjunto de dados heteregêneos e que possuem uma certa coesão entre eles\) especificamos este registro antes de associálo a uma variável, que possui um tipo de dado derivado daquele registro. Na POO também é necessário especificar uma classe antes de associá-la a um objeto, essa operação de associação chama-se instância.

Instância é entendida como a qualidade daquilo que está para acontecer. Preparação inicial da estrutura que será utilizada pelo programador.

***
## Fundamentação

Os 4 pilares da POO Classe, Objeto, Atributo e Método

***
### Classe

Classe segundo o Aurélio:
  Coesão, grupo, conjunto de coisas afins.

Classe programação:
  É uma categoria descritiva geral, que abrange o conjunto de objetos que compartilham uma ou mais caracteristicas quanto a seus itens de dados e procedimentos associados. É um modelo usado para formatar a estrutura de um objeto, um conjunto de campos e de funcionalidades.

O conjunto de atributos e procedimentos agregados à classe e que serão instanciados a certo objeto chama-se encapsulamento, e esse conjunto pode ser público ou privado. Isso nos permite concentrar apenas no que o objeto é e no que ele faz, sem se preocupar em como ele faz.

Herança - Uma classe pode ser deriavada de outra classe existente, chamada de *Classe filho*, enquanto a classe existente pode ser chamada de *Classe pai*. A classe filho automaticamente herda os atributos e as funcionalidades da classe pai, sendo definido assim a **Herança** entre classes.
Quando acrescentamos atributos a uma classe filho, os chamamos de especificação.

Classe abstrata - Quando um determinado membro ou funcionalidadeé passado a um objeto por meio de herança.

Classe concreta - Membro ou funcionalidade passada de forma direta.

Em alguns casos as classes precisam interagir, sendo necessário estabelecer **Colaboração** entre elas, de forma que as classes envolvidas possam trabalhar em conjunto, a fim de tornar a funcionalidade mais expressiva, ou seja, efetua-se a **Agregação**. Com a colaboração e a Agregação de classes surge o efeito denominado **Acoplamento**.

***
Exemplo de classe em JavaScript.

ES5

```js
function Person(firstName, lastName) {
  //Atributos da classe Person
  this.firstName = firstName;
  this.lastName = lastName;
}
// Método da classe Person externo a classe
Person.prototype.greeting = function() {
  return `Hello ${this.firstName} ${this.lastName}`
}

//Herança (Custumer não tem acesso aos métodos da classe Person)
function Custumer(firstName, lastName, phone, membership) {
  Person.call(this, firstName, LastName);
  this.phone = phone;
  this.membership = membership;
}

//Herança Person prototype métodos
Custumer.prototype = Object.create(Person.prototype);

//Fazer com que o constructor volte a ser atrubuído a classe costumer após termos herdado os métodos da classe Person
Custumer.prototype.constructor = Custumer;
```

ES6

```js
//Declarar uma classe
class Person {
  constructor(firstName, lastName) {
    //Atributos da classe Person
    this.firstName = firstName;
    this.lastName = lastName;
  }
  // Método da classe Person interno a classe
  greeting () {
    return `Hello ${this.firstName} ${this.lastName}`
  }
}
//Declarar uma classe Custumer e herdar as propriedades da classe Person. ES6 herdamos também os métodos da classe pai
class Custumer extends Person {
  constructor(firstName, lastName, phone, membership) {
    //Atributos da classe pai
    super(fisrtName, lastName);
    this.phone = phone;
    this.membership = membership;
  }
}
```
***
### Objeto

Objeto segundo Aurélio:
  Tudo aquilo que é apreendido pelo conhecimento, que não é o sujeito do conhecimento, sendo manpulável e perceptível por qualquer dos sentidos.

Objeto programação: 
  É qualquer módulo que contém rotinas e estruturas de dados e é capaz de interagir com outros módulos similares, trocando mensagens \(Passagem de parâmetros por referência\).

Um objeto pode ser uma pessoa, local, veículo, entre outros elementos do mundo real que possam pertencer a uma classe de categorização. Em outras palavras, um objeto pode ser qualquer coisa instanciada a partir de uma classe.

Um objeto  possui um *estado* de ocorrência significativa imputado a ele em alguma momento para refletir uma condição do mudo real, ou seja, atribuir a ele um determinado *evento*.

Um objeto pode assumir dois papéis em um programa.
  **Objeto persistente** - Gravado como um registro de dados \(Memória secundária\).
  **Objeto transitório** - Acomoda uma estrutura de dados virtual, válido somente naquele momento específico.

Todo objeto pode interagir com outros objetos por meio de uso e definição de métodos. Quando isso ocorre, os objetos utilizam um mecanismo de comunicação denominado transmissão de **mensagem**, que é a execução de um pedido de informação ou a requisição para efetuar alguma ação por meio da passagem de parâmetros.

***
Exemplo de objeto em JavaScript.

Objeto literal \(Sem o uso de uma função construtora\)

```js
const meuCarro = {
  marca: 'Fiat',
  modelo: 'Palio',
  ano: '20120'
}

//Podemos acessar a propriedade marca
meuCarro.marca
```

Instanciando um Objeto a partir de uma classe

```js
class Carro {
  constructor(marca, modelo, ano) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }
}

const carro1 = new Carro('Fiat','Palio','2010');
```
Criando um objeto a partir do método Object.create\(\).
\(Esse método permite que você escolha o objeto protóripo para o objeto que você quer criar, sem a necessidade de se definir uma função construtora\).

```js
const person1 = {
  firstName: 'Pedro',
  lastName: 'Souza',
  greeting: function() {
    console.log(`Hello ${this.firstName} ${this.lastName}`)
  }
}

const person2 = Object.create(person1);
person2.firstName = 'Camila';
person2.lastName = 'Crizanto';
person2.greeting(). //Saída Hello Camila Crizanto.

//Obs.: se instanciarmos um objeto a partir de outro sem a utilização do método Object.create, por exemplo, const person2 = person1, estaremos apontando o objeto criado para o mesmo endereço do objeto que ele foi instanciado, sendo que qualquer alteração no objeto criado refletirá no objeto no qual ele foi instanciado.  
```
***
### Atributo

Atributo segundo Aurélio:
  O que é próprio de um ser, caráter essencial de uma substância.

Atributo programação:
  Cade uma das propriedades que definem um objeto.

A visibilidade do conteúdo de um atributo pode ser pública, privada ou protegida. Quando privada e protegida ocorre o efeito de ocultamento de informações do atributo de uma Classe.

### Método

Método segundo aurélio:
  Caminho pelo qual se atinge um objetivo. 

Método programação:
  O conceito de método está associado à forma como determinado atributo será alterado. **Método** é uma forma de efetuar o controle lógico que refletirá uma ação \(Designar um comportamento\) no objeto e, por conseguinte, em sua classe. É o que estabelece o que realmente um objeto faz.

O método deve ser coeso com a estrutura de classe utilizada. Ele deve representar uma funcionalidade condizente com a estrutura da classe em uso **Coesão**.