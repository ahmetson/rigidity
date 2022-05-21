# Rigidity
A programming language that translates to `Solidity`.

Check the tests.

```bash
npx ts-node src/test/abstract.ts
```

Translator completion:
* Lexer
* Parser
* Abstract Syntax Tree

TODO:
* Translator

Added parts:
* Contract Header

```Rigidity
byNonAcceptingEth Greeter contract
```

should translate to

```solidity
contract Greeter {

}
```