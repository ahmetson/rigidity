import { CstParser } from "chevrotain"
import { rigidityTokenArray, rigidityTokenList } from "./lexer";

class RigidityParserTypeScript extends CstParser {
  constructor() {
    super(rigidityTokenArray)
    this.performSelfAnalysis()
  }

  // In TypeScript the parsing rules are explicitly defined as class instance properties
  // This allows for using access control (public/private/protected) and more importantly "informs" the TypeScript compiler
  // about the API of our Parser, so referencing an invalid rule name (this.SUBRULE(this.oopsType);)
  // is now a TypeScript compilation error.
  
  // selectStatement
  //    : selectClause fromClause (whereClause)?;
  public contractHeader = this.RULE("contractHeader", () => {
    this.MANY_SEP1({
      SEP: rigidityTokenList.Comma,
      DEF: () => {
        this.CONSUME(rigidityTokenList.Precomputation)
      }
    })
    this.CONSUME(rigidityTokenList.Identifier)
    this.CONSUME(rigidityTokenList.Contract)
  })
  
}

// reuse the same parser instance.
export const rigidityParser = RigidityParserTypeScript