# vscode-aws-cloudformation-auto-template-generator
VS Code extension for automatically generating AWS CloudFormation resource templates.

[![Build Status](https://travis-ci.org/john-goldsmith/vscode-aws-cloudformation-auto-template-generator.svg?branch=master)](https://travis-ci.org/john-goldsmith/vscode-aws-cloudformation-auto-template-generator)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d7a491e37274f2241996/test_coverage)](https://codeclimate.com/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d7a491e37274f2241996/maintainability)](https://codeclimate.com/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator/badge.svg?branch=master)](https://coveralls.io/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator?branch=master)
[![David DM](https://david-dm.org/john-goldsmith/vscode-aws-cloudformation-auto-template-generator.svg)](https://david-dm.org)
[![Known Vulnerabilities](https://snyk.io/test/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator?targetFile=package.json)
[![Greenkeeper badge](https://badges.greenkeeper.io/john-goldsmith/vscode-aws-cloudformation-auto-template-generator.svg)](https://greenkeeper.io/)

## Features

### Feature A

## Running Locally & Debugging

1. Clone this repo
1. Run `npm install`
1. In the Debug panel, choose the "Extension" configuration, and click "Start Debugging" (shortcut: `F5`)

See [vsc-extension-quickstart.md](./vsc-extension-quickstart.md) for additional details.

## Tests
See [test/unit](./test/unit) for test suite, and [Travis CI](https://travis-ci.org/john-goldsmith/vscode-aws-cloudformation-auto-template-generator) and [Code Climate](https://codeclimate.com/github/john-goldsmith/vscode-aws-cloudformation-auto-template-generator) for coverage.

1. Run `npm run test:unit`

```
Test Suites: 32 passed, 32 total
Tests:       133 passed, 133 total
```

## Linting

1. Run `npm run lint`

## To Do

* i18n / l10n
* DRY up tests
* Account for `VersionId` when fetching a resource type
* Implement STS

## Release Notes

### 1.0.0 - March 1, 2020

Initial release. Features include:

* Added ability to...
