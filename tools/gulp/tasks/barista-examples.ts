import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { strings } from '@angular-devkit/core';
import { sync as glob } from 'glob';
import { task } from 'gulp';
import { buildConfig } from '../build-config';

const { examplesDir } = buildConfig;

interface ExampleMetadata {
  component: string;
  sourcePath: string;
}

/** Parse the AST of the given source file and collect Angular component metadata. */
export function retrieveExampleClassNames(fileName: string, content: string): string[] {
  const sourceFile = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, false);
  const componentClassNames: string[] = [];
  // tslint:disable-next-line:no-any
  const visitNode = (node: any): void => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      if (node.decorators && node.decorators.length) {
        for (const decorator of node.decorators) {
          if (decorator.expression.expression.text === 'Component') {
            componentClassNames.push(node.name.text);
          }
        }
      }
    }

    ts.forEachChild(node, visitNode);
  };

  visitNode(sourceFile);
  return componentClassNames;
}

/** Build ES module import statements for the given example metadata. */
function buildImportsTemplate(data: ExampleMetadata): string {
  const relativeSrcPath = data.sourcePath.replace(/\\/g, '/').replace('.ts', '');

  return `import { ${data.component} } from './${relativeSrcPath}';`;
}

/** Inlines the example module template with the specified parsed data. */
function populateExampleModuleTemplate(parsedData: ExampleMetadata[]): string {
  const exampleImports = parsedData.map((m) => buildImportsTemplate(m)).join('\n');
  const exampleList = parsedData.map((m) => m.component);

  return fs.readFileSync(path.join(examplesDir, './examples.module.template'), 'utf8')
    .replace('${imports}', exampleImports)
    .replace('${examples}', `[\n  ${exampleList.join(',\n  ')},\n]`);
}

function getExampleMetadata(sourceFiles: string[]): ExampleMetadata[] {
  const parsedData: Set<ExampleMetadata> = new Set();
  sourceFiles.forEach((sourceFilePath) => {
    const content = fs.readFileSync(sourceFilePath, { encoding: 'utf-8' });
    const fileName = path.basename(sourceFilePath);
    const components = retrieveExampleClassNames(fileName, content);
    components.forEach((component) => {
      const metadata: ExampleMetadata = {
        component,
        sourcePath: path.relative(examplesDir, sourceFilePath),
      };
      parsedData.add(metadata);
    })
  });
  return [...parsedData];
}

/**
 * Generates the example module from the given source files and writes it to a specified output
 * file.
 */
function generateExampleModule(parsedData: ExampleMetadata[], outputFile: string, baseDir: string): void {
  const generatedModuleFile = populateExampleModuleTemplate([...parsedData]);
  const generatedFilePath = path.join(baseDir, outputFile);
  if (!fs.existsSync(path.dirname(generatedFilePath))) {
    fs.mkdirSync(path.dirname(generatedFilePath));
  }
  fs.writeFileSync(generatedFilePath, generatedModuleFile);
}

interface AppComponentRouteSetup {
  name: string;
  examples: Array<{ name: string; route: string; className: string }>;
}

function generateAppComponent(parsedData: ExampleMetadata[]): void {
  const routeSetup = parsedData.reduce((aggr: AppComponentRouteSetup[], val) => {
    const componentName = path.dirname(val.sourcePath);
    let index = aggr.findIndex((item) => item.name === componentName);
    if (index === -1) {
      index = aggr.push({ name: componentName, examples: [] }) - 1;
    }
    const dasherized = strings.dasherize(val.component);
    aggr[index].examples.push(
      {
        name: strings.dasherize(val.component),
        route: `/${componentName}/${dasherized}`,
        className: val.component,
      }
    );
    return aggr;
  }, [] as AppComponentRouteSetup[])
  const content = fs.readFileSync(path.join(examplesDir, 'app.component.template'), { encoding: 'utf8' })
    .replace('${routeSetup}', JSON.stringify(routeSetup, null, '\t'));


  // const routes = routeSetup.reduce((aggr: AppComponentRouteSetup) => {
  //   return data.examples
  // });
  fs.writeFileSync(path.join(examplesDir, 'app.component.ts'), content, { encoding: 'utf8' });
}

/**
 * Creates the examples module
 */
task('build-barista-example', () => {
  const metadata = getExampleMetadata(glob(path.join(examplesDir, '*/*.ts')));
  generateExampleModule(metadata, 'examples.module.ts', examplesDir);
  generateAppComponent(metadata);
});
