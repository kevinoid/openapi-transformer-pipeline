OpenApiTransformerPipeline
==========================

[![Build Status](https://img.shields.io/github/actions/workflow/status/kevinoid/openapi-transformer-pipeline/node.js.yml?branch=main&style=flat&label=build)](https://github.com/kevinoid/openapi-transformer-pipeline/actions?query=branch%3Amain)
[![Coverage](https://img.shields.io/codecov/c/github/kevinoid/openapi-transformer-pipeline/main.svg?style=flat)](https://app.codecov.io/gh/kevinoid/openapi-transformer-pipeline/branch/main)
[![Dependency Status](https://img.shields.io/david/kevinoid/openapi-transformer-pipeline.svg?style=flat)](https://david-dm.org/kevinoid/openapi-transformer-pipeline)
[![Supported Node Version](https://img.shields.io/node/v/@kevinoid/openapi-transformer-pipeline.svg?style=flat)](https://www.npmjs.com/package/@kevinoid/openapi-transformer-pipeline)
[![Version on NPM](https://img.shields.io/npm/v/@kevinoid/openapi-transformer-pipeline.svg?style=flat)](https://www.npmjs.com/package/@kevinoid/openapi-transformer-pipeline)

Class for traversing or transforming
[OpenAPI](https://github.com/OAI/OpenAPI-Specification/) documents by applying
transformers with a `transformOpenApi` method which takes an input OpenAPI
document and returns the output document, optionally in a `Promise`.
Transformers may be implemented using
[`OpenApiTransformerBase`](https://github.com/kevinoid/openapi-transformer-base),
but it is not required.


## Introductory Example

To create a transformer which removes response headers, then converts
`patternProperties` to `additionalProperties`:

```js
import OpenApiTransformerPipeline
  from '@kevinoid/openapi-transformer-pipeline';
import RemoveResponseHeadersTransformer
  from '@kevinoid/openapi-transformers/remove-response-headers.js';
import PatternPropertiesToAdditionalPropertiesTransformer
  from '@kevinoid/openapi-transformers/pattern-properties-to-additional-properties.js';

export default class MyTransformer extends OpenApiTransformerPipeline {
    constructor() {
        super([
            new RemoveResponseHeadersTransformer(),
            new PatternPropertiesToAdditionalPropertiesTransformer(),
        ]);
    }
}
```


## Installation

[This package](https://www.npmjs.com/package/@kevinoid/openapi-transformer-pipeline) can be
installed using [npm](https://www.npmjs.com/), either globally or locally, by
running:

```sh
npm install @kevinoid/openapi-transformer-pipeline
```


## API Docs

To use this module as a library, see the [API
Documentation](https://kevinoid.github.io/openapi-transformer-pipeline/api).


## Contributing

Contributions are appreciated.  Contributors agree to abide by the [Contributor
Covenant Code of
Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).
If this is your first time contributing to a Free and Open Source Software
project, consider reading [How to Contribute to Open
Source](https://opensource.guide/how-to-contribute/)
in the Open Source Guides.

If the desired change is large, complex, backwards-incompatible, can have
significantly differing implementations, or may not be in scope for this
project, opening an issue before writing the code can avoid frustration and
save a lot of time and effort.


## License

This project is available under the terms of the [MIT License](LICENSE.txt).
See the [summary at TLDRLegal](https://tldrlegal.com/license/mit-license).
