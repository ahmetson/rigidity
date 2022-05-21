import { rigidityLexer } from "../lexer"
import { rigidityParser } from "../parser"

// ONLY ONCE
const parser = new rigidityParser()

function parseInput(text: string) {
    const lexingResult = rigidityLexer.tokenize(text)
    // "input" is a setter which will reset the parser's state.
    parser.input = lexingResult.tokens
    let cst = parser.contractHeader();

    if (parser.errors.length > 0) {
        console.error(parser.errors);
        throw new Error("sad sad panda, Parsing errors detected")
    } else {
        console.log(cst);
    }
}

const inputText = "byNonAcceptingEth,byMessenger Greeter contract"
// const inputText = "byNonAcceptingEth Greeter contract"
// const inputText = "Greeter contract"
parseInput(inputText)