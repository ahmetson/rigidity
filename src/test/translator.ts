import { rigidityLexer } from "../lexer"
import { rigidityParser } from "../parser"
import { rigidityVisitor } from "../abstract"
import { rigidityTranslator } from "../translator"

// ONLY ONCE
const parser = new rigidityParser()
const visitor = new rigidityVisitor();
const translator = new rigidityTranslator();

function toAst(text: string) {
    const lexingResult = rigidityLexer.tokenize(text)
    // "input" is a setter which will reset the parser's state.
    parser.input = lexingResult.tokens
    let cst = parser.contractHeader();

    if (parser.errors.length > 0) {
        console.error(parser.errors);
        throw new Error("sad sad panda, Parsing errors detected")
    } else {
        const ast = visitor.visit(cst);
        return ast;
    }
}

// const inputText = "byNonAcceptingEth , byMessenger Greeter contract"
const inputText = "byNonAcceptingEth Greeter contract"
// const inputText = "Greeter contract"
// const inputText = "byAnyOne Greeter contract"
// const inputText = "byAnyOne _Greeter contract"   // should throw an error
let ast = toAst(inputText);
if (ast.errors.length === 0) {
    let sourceCode = translator.exec(ast);
    console.log(`The source code:`);
    console.log(sourceCode);
} else {
    console.log(ast);
}