/**
 * @license
 * Copyright 2022 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { getProjects } from '@nrwl/devkit';
import { FsTree } from '@nrwl/tao/src/shared/tree';
import {
  BuilderContext,
  BuilderOutput,
  Target,
} from '@angular-devkit/architect';
import { writeFileSync, promises as fs } from 'fs';
import { join, dirname, resolve } from 'path';
import { green } from 'chalk';

import { copyAssets, copyStyles } from './copy-assets';
import { PackagerOptions } from './schema';
import { syncNgVersion, syncBaristaComponentsVersion } from './sync-version';

interface NgPackagerJson {
  dest: string;
}

async function tryJsonParse<T>(path: string): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path, { encoding: 'utf-8' })) as T;
  } catch (err) {
    throw new Error(`Error while parsing json file at ${path}`);
  }
}

interface PackageJson {
  version?: string;
  peerDependencies?: {
    [key: string]: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  license?: string;
  author?: string;
  main?: string;
  module?: string;
  typings?: string;
}

/**
 * This runs all necessary steps to create a bundle for the library
 * First it runs the build target for the project given replaces
 * dependencies in the release package.json file that have a
 * placeholder with package version from the root. It also copies the
 * assets and style folders to the dist folder
 */
export async function packager(
  options: PackagerOptions,
  context: BuilderContext,
): Promise<BuilderOutput> {
  const project = context.target !== undefined ? context.target!.project : '';
  context.logger.info(`Packaging ${project}...`);
  const target: Target = {
    target: options.buildTarget,
    project,
  };
  let ngPackagrBuilderOptions;
  try {
    // Read the options of the build target options set up with the ng-packagr builder
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ngPackagrBuilderOptions = (await context.getTargetOptions(target)) as any;

    if (ngPackagrBuilderOptions.project === undefined) {
      throw new Error(
        'Error: Build target does not have a project set for the ng-packagr in angular.json',
      );
    }
  } catch (err) {
    // If we cannot find the project set for the ng-packagr we cannot continue
    context.logger.error(err);
    return { success: false };
  }

  try {
    // get the package json
    context.logger.info('Reading package.json file...');
    const packageJson = await tryJsonParse<PackageJson>(
      join(context.workspaceRoot, 'package.json'),
    );

    const tree = new FsTree(process.cwd(), false);
    const nxProjects = getProjects(tree);

    // Check whether a project root could be found
    const nxProject = nxProjects.get(project);
    const projectRoot = nxProject?.root;

    if (!projectRoot) {
      context.logger.error(
        `Error: Could not find a root folder for the project ${project} in your angular.json file`,
      );
      return { success: false };
    }

    const ngPackagrConfigPath = join(
      context.workspaceRoot,
      ngPackagrBuilderOptions.project,
    );
    // try to parse the ng-package.json file
    const ngPackagrConfig = await tryJsonParse<NgPackagerJson>(
      ngPackagrConfigPath,
    );

    // Determine the library destination
    const libraryDestination = resolve(
      dirname(ngPackagrConfigPath),
      ngPackagrConfig.dest,
    );

    // Now we have everything ready and we can start the build
    // We need to run the build first because the ng-packagr clears the output directory

    // Schedule ng-packagr build
    const build = await context.scheduleTarget(target);

    const buildResult = await build.result;

    if (buildResult.error) {
      console.error(buildResult.error);
    }

    // Path to the package json file that we are going to ship with the library
    const releasePackageJsonPath = join(libraryDestination, 'package.json');
    let releasePackageJson = await tryJsonParse<PackageJson>(
      releasePackageJsonPath,
    );

    context.logger.info('Syncing barista-components version for releasing...');
    // replace placeholder for the barista components version with value from root package.json
    releasePackageJson = syncBaristaComponentsVersion(
      releasePackageJson,
      packageJson,
      options.versionPlaceholder,
    );

    context.logger.info('Syncing angular dependency versions for releasing...');
    // replace ng placeholder with angular version from root package.json
    releasePackageJson = syncNgVersion(
      releasePackageJson,
      packageJson,
      options.ngVersionPlaceholder,
    );

    writeFileSync(
      join(libraryDestination, 'package.json'),
      JSON.stringify(releasePackageJson, null, 2),
      { encoding: 'utf-8' },
    );
    context.logger.info(
      green('Replaced all version placeholders in package.json file!'),
    );

    // copy styles
    context.logger.info('Copying styles...');
    await copyStyles(options, context);
    context.logger.info(green('Copied styles!'));
    // copy assets
    context.logger.info('Copying assets...');
    await copyAssets(options, context);
    context.logger.info(green('Copied assets!'));

    // running additional targets
    for (const additionalTargetName of options.additionalTargets) {
      context.logger.info(`Running additional target: ${additionalTargetName}`);
      const additionalTargetBuild = await context.scheduleTarget(
        parseAdditionalTargets(additionalTargetName),
      );
      const additionalTargetBuildResult = await additionalTargetBuild.result;
      if (!additionalTargetBuildResult.success) {
        throw new Error(`Running target '${additionalTargetName}' failed!`);
      }
    }

    context.logger.info(
      green(
        '------------------------------------------------------------------------------',
      ),
    );
    context.logger.info(green('Packaging done!'));
    context.logger.info(
      green(
        '------------------------------------------------------------------------------',
      ),
    );
    return { success: buildResult.success };
  } catch (err) {
    context.logger.error(err);
  }
  return { success: false };
}

function parseAdditionalTargets(targetRef: string): {
  target: string;
  project: string;
} {
  const [project, target] = targetRef.split(':');
  return { project, target };
}
