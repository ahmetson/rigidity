import { AstContractHeaderInterface } from "../interfaces/ast-contract-header";


// Translate the AST into the Solidity code.
class Translator {
  private solidity: string;

  constructor() {
    this.solidity = 
      `// SPDX-License-Identifier: MIT\n` +
      `pragma solidity >=0.6.0 <0.9.0;\n\n`;
  }

  exec(header: AstContractHeaderInterface) : String {
    this.solidity += `contract ${header.name}\n`;

    // No body yet defined so we define ourselves
    this.solidity += `{\n\n`;

    if (header.precomputation === 'byAcceptingEth') {
      this.solidity += `\treceive() external payable {}`;
    }

    this.solidity += `\n}\n`;

    return this.solidity;
  }
}

// We only need a single interpreter instance because our interpreter has no state.
export const rigidityTranslator = Translator;