import { createToken, Lexer } from 'chevrotain';

// List of tokens
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ })

// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
const Contract = createToken({ 
  name: "Contract", 
  pattern: /contract/,
  label: "Contract Keyword",
  longer_alt: Identifier
})

const Precomputation = createToken({
  name: "Precomputation",
  pattern: /by[A-Z]+\w*/,
  label: "Precomputation with 'by' prefix",
  longer_alt: Identifier
})

const Comma = createToken({ name: "Comma", pattern: /,/ })

const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })

const GreaterThan = createToken({ name: "GreaterThan", pattern: />/ })

const LessThan = createToken({ name: "LessThan", pattern: /</ })

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
})

export let rigidityTokenList = {
  Identifier,
  Contract,
  Precomputation,
  Comma,
  Integer,
  GreaterThan,
  LessThan,
  WhiteSpace
}

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
export let rigidityTokenArray = [
    WhiteSpace,
    // "keywords" appear before the Identifier
    Contract,
    Precomputation,
    Comma,
    // The Identifier must appear after the keywords because all keywords are valid identifiers.
    Identifier,
    Integer,
    GreaterThan,
    LessThan
  ]

export let rigidityLexer = new Lexer(rigidityTokenArray, { ensureOptimizations: true })