import { rigidityLexer } from '../lexer'

let printLexResult = (inputText: string, comment: string) => {
    console.log(`\n\Input:   ${inputText}`);
    console.log(`Comment: ${comment}`);
    console.log(`Parsed:`);
    let lexingResult = rigidityLexer.tokenize(inputText)
    for (var result of lexingResult.tokens) {
        console.log("\t", result.image, result.tokenType.name);
    } 

    if (lexingResult.errors.length > 0) {
        console.log(`Found ${lexingResult.errors.length} errors:`);
        for (var error of lexingResult.errors) {
            console.log(`\t${error.message}`);
        }
    }
}

printLexResult("SELECT column1 FROM table2", "ONLY IDENTIFIERS");

printLexResult("0xcz column1 FROM _table2", "Some undentified identifiers");

printLexResult("byNonAcceptingEth Greeting contract", "Contract Definition Header");
