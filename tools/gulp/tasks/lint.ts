import {task} from 'gulp';
import {execNodeTask} from '../util/task-runner';
import {buildConfig} from '../build-config';
import {join} from 'path';
import {createWriteStream} from 'fs';
import {ensureDirSync} from 'fs-extra';

/** Glob that matches all SCSS or CSS files that should be linted. */
const stylesGlob = 'src/lib/**/!(*.bundle).+(css|scss)';

const tsGlob = 'src/lib/**/!(*.spec).ts';
const tsSpecsGlob = 'src/lib/**/*.spec.ts';
const tsDocs = 'src/docs/**/!(*.spec).ts';
const tsUiTestApp = 'src/ui-test-app/**/!(*.spec).ts';
const tsUniversalApp = 'src/universal-app/**/!(*.spec).ts';
const tsUiSpecsGlob = 'ui-tests/**/*.spec.ts';

const lintOutDir = join(buildConfig.outputDir, 'checkstyle');
const stylelintOutFile = join(lintOutDir, 'stylelint.xml');

const ciArgs = ['--format', 'checkstyle', '--out'];

const stylelintArgs = [stylesGlob, '--config', 'stylelint.config.js', '--syntax', 'scss'];
const ciStylelintArgs = [...stylelintArgs, '--custom-formatter', 'node_modules/stylelint-checkstyle-formatter/index.js', ];

const isCi = process.env.CI === 'true';

const outputToXML = (shouldOutToXML: boolean, lintArgs: string[], outFile: string): string[] =>
  (!shouldOutToXML) ? lintArgs : [...lintArgs, ...ciArgs, join(lintOutDir, outFile)];

task('lint', [
  'stylelint',
  'tslint',
  'tslint:specs',
  'tslint:docs',
  'tslint:ui-test-app',
  'tslint:universal-app',
  'tslint:ui-tests',
]);

task('ensureOutDirectory', () => {
  ensureDirSync(buildConfig.outputDir);
  ensureDirSync(lintOutDir);
});

task('stylelint', ['ensureOutDirectory'],
     isCi ? executeStylelintOnCI : execNodeTask('stylelint', stylelintArgs));

function executeStylelintOnCI(done: (err?: any) => void) {
  const file = createWriteStream(stylelintOutFile);
  execNodeTask(
    'stylelint', ciStylelintArgs, undefined, {
      silentStdout: true,
      stdoutListener: (data: string) => file.write(data),
    }
  )((err?: any) => {
      done(err);
      file.end();
    }
  );
}

task('tslint', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--project', 'tsconfig.json',
      tsGlob,
    ],
    'checkstyle.xml'
  )
));

task('tslint:specs', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--config', 'tslint.spec.json',
      '--project', 'tsconfig.json',
      tsSpecsGlob,
    ],
    'checkstyle-spec.xml'
  )
));

task('tslint:docs', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--config', 'src/docs/tslint.json',
      '--project', 'src/docs/tsconfig.json',
      tsDocs,
    ],
    'checkstyle-docs.xml'
  )
));

task('tslint:ui-test-app', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--config', 'src/ui-test-app/tslint.json',
      '--project', 'src/ui-test-app/tsconfig.json',
      tsUiTestApp,
    ],
    'checkstyle-ui-test-app.xml'
  )
));

task('tslint:universal-app', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--project', 'src/universal-app/tslint.json',
      '--project', 'src/universal-app/tsconfig.json',
      tsUniversalApp,
    ],
    'checkstyle-universal.xml'
  )
));

task('tslint:ui-tests', ['ensureOutDirectory'], execNodeTask(
  'tslint', outputToXML(
    isCi,
    [
      '--config', 'tslint.spec.json',
      '--project', 'ui-tests/tsconfig.json',
      tsUiSpecsGlob,
    ],
    'checkstyle-ui-test.xml'
  )
));
