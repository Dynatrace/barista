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
 * Writes the version of the root package.json to the one of the build artifact
 * onto the provided placeholder.
 */
export function syncBaristaComponentsVersion(
  releaseJson: PackageJson,
  rootPackageJson: PackageJson,
  placeholder: string,
): PackageJson {
  const newPackageJson = { ...releaseJson };
  if (
    rootPackageJson.version &&
    (!newPackageJson.version || newPackageJson.version.trim() === placeholder)
  ) {
    newPackageJson.version = rootPackageJson.version;
  }
  return newPackageJson;
}

/**
 * Updates the placeholders in the angular peerDependencies of the release-json
 * to the versions found in the root package json
 */
export function syncNgVersion(
  releaseJson: PackageJson,
  rootPackageJson: PackageJson,
  placeholder: string,
): PackageJson {
  const updatedJson = { ...releaseJson };
  for (const [key, value] of Object.entries(releaseJson.peerDependencies!)) {
    if (value.includes(placeholder)) {
      updatedJson.peerDependencies![key] = rootPackageJson.dependencies![key];
    }
  }
  return updatedJson;
}
