import { createToken, Lexer } from 'chevrotain';

/**
-----------------------------------------------------
SQL
-----------------------------------------------------
selectStatement
   : selectClause fromClause (whereClause)?

selectClause
   : "SELECT" Identifier ("," Identifier)*

fromClause
   : "FROM" Identifier

whereClause
   : "WHERE" expression

expression
   : atomicExpression relationalOperator atomicExpression

atomicExpression
   : Integer | Identifier

relationalOperator
   : ">" | "<"

-----------------------------------------------------
Rigidity
-----------------------------------------------------
entryPoint
  : contractStatement | interfaceStatement

contractStatement
  : (contractInclusion)? contractHeader contractBody

contractInclusion
  : "import" ContractName ("as" Identifier)?

ContractName
  : /[A-Z]?[a-zA-Z0-9_]/

Identifier
  : /[a-zA-Z0-9_]/

contractHeader
  : listComputions ContractName "contract" ("(" ContractName ")")?

listComputions
  : ComputionIdentifier (commaOperator computionIdentifier)?

ComputionIdentifier
  : /^by[a-zA-Z0-9]W/

commaOperator
  : ","

contractBody
  : storageDefinition | computionDefinition | functionDefinition | typeDefinition | typesetDefinition

storageDefinition
  : "storage." builtinType | Identifier ("[" (Integer)? "]")? ("(" builtinType ("=>" builtinType)? ")")?

builtinType
  : stringType | intType | boolType | addressType

stringType
  : "(" Integer | Identifier ":" "length" ")" "String"

intType
  : "(" Integer | Identifier ":" "bytes" ("unsigned")? ")" "Int"

boolType
  : "Bool"

addressType
  : "address"

Integer
  : /[0-9]/

computionDefinition
  : ComputionIdentifier ("(" Identifier (commaOperator Identifier)*? ")" )? ":" booleanExpressions | localExpressions

functionDefinition
  : "function" Identifier "(" Identifier ( commaOperator Identifier )? ")" ":" ( "(" builtinType | Identifier (commaOperator builtinType | Identifier)? ")" )? localExpressions

typeDefinition
  : "type" Identifier "is" builtinType | Identifier (booleanExpression)?

typesetDefinition
  : "typeset" Identifier "is" (Identifier)? "{"
    Identifier ":" builtinType | Identifier ("[" (Integer)? "]")?
  "}"

booleanExpressions
  : andExpression | orExpression

andExpression
  : "&" readExpression "==" readExpression

readExpression
  : Identifier | Integer | String | ArrayAccess | ArrayLength | StorageRead | MemoryRead | MapRead | functionCall

String
  : "\"" /[a-zA-Z0-9]_`'@#$%^&*()[]{}/?.,<>/ "\""

ArrayAccess
  : Identifier "[" Identifier | Integer "]"

ArrayLength
  : Identifier "." "length"

StorageRead
  : 
 */