[![picture](***REMOVED***
[![picture](***REMOVED***
[![picture](***REMOVED***
[![picture](***REMOVED***
[![picture](***REMOVED***
[![picture](***REMOVED***
[![picture](***REMOVED***

# Angular components library

Angular module containing common, reusable UI components and helpers.

## Usage

Install library using yarn
```
yarn add @dynatrace/angular-components
```
Or if you are using npm
```
npm install @dynatrace/angular-components
```

## Documentation

Documentation is available by starting a local server at <http://localhost:4200>

##### Using Yarn
   1. Meet NodeJS prerequisites (see `Development -> Prerequisites` section)
   1. Install dependencies - `yarn install`
   1. Start documentation server - `yarn docs` 

##### Using gradle
   1. Install JDK
   1. Run gradle task - `./gradlew startDocs`

## Development

### Prerequisites

1. NodeJS 7.10.0+
1. Yarn
   ```
   npm install -g yarn
   ```
Alternatively, you can use gradle (see instructions below), which automatically sets up local NodeJS environment,
but on the other hand, requires JVM. 

### Building
1. Install NPM dependencies
   ```
   yarn install
   ```
1. Building the library
   ```
   yarn build
   ```

### Developing
Developing with the docs app
```
yarn docs
```

### Running tests and style lint
Unit tests:
```
yarn test
```

Unit tests with watcher for local testing:
```
yarn test:watch
```

UI Tests
```
yarn ui-tests
```

Universal build
```
yarn universal
```

Stylelint
```
yarn lint
```

Pre-commit sanity check (runs all tests + linting)
```
./gradlew completeBuild
```

### Using local version for development

1. Build development version
1. Create an NPM link
   1. In the library output directory `dist/lib`:
      ```
      yarn link
      ```
   1. In the other project directory:
      ```
      yarn link @dynatrace/angular-components
      ```
1. Any further build will be automatically updated in the project referencing the link.

To unlink development version:
```
yarn unlink @dynatrace/angular-components
yarn install
```

### Using Gradle build

Gradle build is meant for CI servers and does not require NodeJS installed upfront. 
Instead, it downloads NodeJS binaries locally from Arifactory and runs any yarn task with that node version.

Gradle tasks look very similar to the NPM ones, e.g.:
```
./gradlew yarn_install
./gradlew test
./gradlew lint
./gradlew compile
``` 
To see complete list of gradlew builds, run:
```
./gradlew tasks
```

### Versioning

#### Git repository version

Version in package.json is hardcoded to match x.x.0-dev pattern. 
Specific patch versions are bumped by CI but not commited to the repository.

#### Master branch versions

Each CI build from master branch bumps patch version (e.g. `0.1.4 -> 0.1.5`)

#### Incrementing major/minor version

Angular components are stil in 0.x version and major part should not be increased for now.
Minor version should be bumped if breaking changes are introduced and it has to be done manually. 
To do it, open `package.json` and increase minor number by one.
Remember to leave patch and suffix section unchanged (e.g. `0.5.0-dev -> 0.6.0-dev`, `1.6.0-dev -> 2.0.0-dev`)
