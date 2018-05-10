import * as ts from 'typescript';
import {
  Tree,
  SchematicsException,
} from '@angular-devkit/schematics';
import { InsertChange } from './change';
import { strings } from '@angular-devkit/core';

export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`File ${path} does not exist.`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

  return source;
}

/**
 * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
 */
export function findNodes(node: ts.Node, kind: ts.SyntaxKind, max = Infinity): ts.Node[] {
  if (!node || max == 0) {
    return [];
  }

  const arr: ts.Node[] = [];
  if (node.kind === kind) {
    arr.push(node);
    max--;
  }
  if (max > 0) {
    for (const child of node.getChildren()) {
      findNodes(child, kind, max).forEach(node => {
        if (max > 0) {
          arr.push(node);
        }
        max--;
      });

      if (max <= 0) {
        break;
      }
    }
  }

  return arr;
}

/**
 * Get all the nodes from a source.
 */
export function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[] {
  const nodes: ts.Node[] = [sourceFile];
  const result = [];

  while (nodes.length > 0) {
    const node = nodes.shift();

    if (node) {
      result.push(node);
      if (node.getChildCount(sourceFile) >= 0) {
        nodes.unshift(...node.getChildren());
      }
    }
  }

  return result;
}

/**
 * Adds an import to the existing @dynatrace/angular-components import declaration
 */
export function addDynatraceAngularComponentsImport(source: ts.SourceFile, path: string, symbolName: string): InsertChange {
  const importNodes = findNodes(source, ts.SyntaxKind.ImportDeclaration)
    .filter((node: ts.ImportDeclaration) =>
    node.moduleSpecifier && node.moduleSpecifier.getText() === '\'@dynatrace/angular-components\'');

  if (importNodes.length === 0) {
    throw new SchematicsException(`No @dynatrace/angular-components import found in ${path}`);
  }
  /**
   * add it to the last @dynatrace/angular-components import
   */
  const lastImport = importNodes[importNodes.length - 1];
  const namedImports = findNodes(lastImport, ts.SyntaxKind.NamedImports) as ts.NamedImports[];

  if (namedImports.length === 0) {
    throw new SchematicsException(`No named imports found from @dynatrace/angular-components in ${path}`);
  }
  const lastNamedImport = namedImports[namedImports.length - 1];
  const end = lastNamedImport.elements.end;
  // Get the indentation of the last element, if any.
  const indentation = getIndentation(lastNamedImport.elements);
  const toInsert = `${indentation}${symbolName},`;
  return new InsertChange(path, end, toInsert);
}

/**
 * Gets the indentation string for the last entry in NodeArray
 */
export function getIndentation(elements: ts.NodeArray<any> | ts.Node[]): string {
  let indentation = '\n';
  if (elements.length > 0) {
    const text = elements[elements.length - 1].getFullText();
    const matches = text.match(/^\r?\n\s*/);
    if (matches && matches.length > 0) {
      indentation = matches[0];
    }
  }
  return indentation;
}

export function addImport(
  sourcePath: string,
  sourceFile: ts.SourceFile,
  importName: string,
  importLocation: string
): InsertChange {
  /**
   * get all importnodes if there are any and insert a new one at the end
   */
  const importNodes = findNodes(sourceFile, ts.SyntaxKind.ImportDeclaration);
  let pos = 0;
  if (importNodes.length > 0) {
    pos = importNodes[importNodes.length - 1].getEnd();
  }
  const toInsert = `\nimport { ${importName} } from ${importLocation}`;
  return new InsertChange(sourcePath, pos, toInsert);
}
