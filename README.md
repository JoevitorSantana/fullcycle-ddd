DTO -> DATA TRANSFER OBJECT

ENTIDADE ANÊMICA

ORM

ENTIDADE 
    - ID ÚNICO
    - VALORES QUE SE ALTERAM COM O TEMPO
    - COMPORTAMENTO
    - REGRAS DE NEGÓCIO

 - Entidade deve sempre deve representar o estado correto e atual do elemento
 - ou seja, os objetos não podem estar incompletos, ou seja os atributos devem ter seus valores populados
 - Mas tudo depende da regra de négocio

 - Uma entidade por padrão deve se autovalidar

# Entidade x ORM

 - Essa entidade que estamos fazendo é focada em negócio

 - Deverá ter outra entidade para persistência de dados

 Ex:

 Domain
  - Entity
    - customer.ts (negocio)
 
 Infra (Complexidade acidental)
  - Entity/Model
    - customer.ts (get, set)

# Value Objetcs

"Quando você se preocupa apenas com os atributos de um elemento de um model, 
classifique isso como um Value Object"

"Trate o Value Object como imutável"

Exemplo um endereço que é constituído de:
- Street
- City
- State
- Zip Code

É um conjunto de propriedades, não tem id
É imutável


# Agregados

"Um conjunto de objetos associados que tratamos como uma unidade para propósito de mudança de dados"
Eric Evans