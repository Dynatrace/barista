import {strings} from '@angular-devkit/core';
import {
  Rule,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  template,
  url,
  SchematicsException,
} from '@angular-devkit/schematics';
import * as path from 'path';
import * as ts from 'typescript';
import {
  addImport,
  findNodes,
  getIndentation,
  getSourceFile,
} from '../utils/ast-utils';
import {InsertChange, commitChanges} from '../utils/change';
import {DtExampleOptions} from './schema';
import * as fs from 'fs';

/**
 * Adds a new exampleComponent inside file
 */
function addExampleInFile(
  options: DtExampleOptions,
  file: string,
  syntaxKind: ts.SyntaxKind.VariableDeclaration | ts.SyntaxKind.PropertyDeclaration): Rule {
  return (host: Tree) => {
    const modulePath = path.join('src', 'docs', 'components', options.component, `docs-${options.component}.${file}.ts`);
    const sourceFile = getSourceFile(host, modulePath);
    const importName = options.exampleComponentName;
    const dasherizeName = strings.dasherize(options.name);
    const dasherizeComponent = strings.dasherize(options.component);
    const importLocation = `'./examples/${dasherizeName}-${dasherizeComponent}-example.component';`;
    const importChange = addImport(modulePath, sourceFile, importName, importLocation);
    /**
     * find last example and add new example
     */
    let examplesDeclaration;
    let example;
    if (syntaxKind === ts.SyntaxKind.VariableDeclaration) {
      examplesDeclaration = findNodes(sourceFile, syntaxKind)
        .find((node: ts.VariableDeclaration) => node.name.getText() === 'EXAMPLES') as ts.VariableDeclaration;
      example = (examplesDeclaration.initializer as ts.ArrayLiteralExpression).elements;
    } else {
      examplesDeclaration = findNodes(sourceFile, syntaxKind)
        .find((node: ts.PropertyDeclaration) => node.name.getText() === 'examples') as ts.PropertyDeclaration;
      example = (examplesDeclaration.initializer as ts.ObjectLiteralExpression).properties;
    }
    const end = example[example.length - 1].getEnd() + 1;
    const indentation = getIndentation(example);
    const toInsert = (file === 'component') ?
      `${indentation}${strings.classify(options.name)}: ${importName},`
      : `${indentation}${importName},`;
    const examplesChange = new InsertChange(modulePath, end, toInsert);
    return commitChanges(host, [importChange, examplesChange], modulePath);
  };
}

/**
 * Adds a new exampleComponent in html file
 */
function addExampleInReadme(options: DtExampleOptions): Rule {
  return (tree: Tree) => {
    const filePath = path.join('src', 'lib', options.component, 'README.md');
    const content = tree.read(filePath);
    if (!content) {
      return;
    }
    tree.overwrite(filePath, content +
        `\n\n### ${strings.classify(options.name)}\n\n` +
        `<docs-source-example example="${options.exampleComponentName}"></docs-source-example>`);
    return tree;
  };
}
// tslint:disable-next-line:no-default-export
export default function(options: DtExampleOptions): Rule {
  if (!options.component) {
    throw new SchematicsException(`You need to specify a component using --component flag`);
  }
  options.component = strings.decamelize(options.component);
  options.name = strings.decamelize(options.name);
  options.exampleComponentName = `${strings.classify(options.name)}${strings.classify(options.component)}ExampleComponent`;
  const moduleFile = fs.existsSync(path.join(
    'src',
    'docs',
    'components',
    options.component,
    `docs-${options.component}.module.ts`));
  const mdFile = fs.existsSync(path.join(
    'src',
    'lib',
    options.component,
    'README.md'));
  if (!moduleFile || !mdFile) {
    throw new SchematicsException(`Some files needed do not exist or component is missing.`);
  }
  const templateSource = apply(url('./files'), [
    template({...strings, ...options}),
    move('src'),
  ]);

  return chain([
    mergeWith(templateSource),
    addExampleInFile(options, 'module', ts.SyntaxKind.VariableDeclaration),
    addExampleInReadme(options),
  ]);
}
