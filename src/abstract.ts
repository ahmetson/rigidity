import { CstChildrenDictionary, CstElement, CstNode, CstParser, IToken } from "chevrotain"
import { rigidityTokenArray, rigidityTokenList } from "./lexer";
import { rigidityParser } from "./parser";

let parser = new rigidityParser();

// reuse the same parser instance.
const BaseCstVisitor = parser.getBaseCstVisitorConstructor()

// All our semantics go into the visitor, completly separated from the grammar.
class RigidityVisitor extends BaseCstVisitor {
  constructor() {
    super()
    // This helper will detect any missing or redundant methods on this visitor
    this.validateVisitor()
  }

  contractHeader(ctx: CstChildrenDictionary) {
    let contractPrecomputations = [
      "byNonAcceptingEth",
      "byAcceptingEth",
    ]

    // let precomputations = this.visit(ctx.precomputations);
    // let name = this.visit(ctx.contractName);

    let precomputation = "";

    let errors = [];
    if (ctx.Precomputation === undefined || ctx.Precomputation.length === 0) {
      errors.push("'contractHeader' should have atleast 1 precomputation");
    } else if (ctx.Precomputation.length > 1) {
      errors.push("Too many precomputations in 'contractHeader'. Required to have only 1")
    } else {
      precomputation = (ctx.Precomputation[0] as IToken).image;
      if (contractPrecomputations.indexOf(precomputation) === -1) {
        errors.push(`'contractHeader' only supports ${contractPrecomputations.join(" precomputation or ")} precomputations`);
      }
    }

    let identifier = (ctx.Identifier[0] as IToken).image;

    return {
      type: "CONTRACT_HEADER",
      precomputation: precomputation,
      name: identifier,
      errors: errors
    }
  }
}

// We only need a single interpreter instance because our interpreter has no state.
export const rigidityVisitor = RigidityVisitor;