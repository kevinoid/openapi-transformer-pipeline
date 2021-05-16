/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 * @module openapi-transformer-pipeline
 */

/** An OpenAPI Transformer object.
 *
 * May be implemented using openapi-transformer-base, but need not be.
 *
 * @typedef {{
 *   transformOpenApi: function(!object): (!object|!Promise<!object>)
 * }} OpenApiTransformer
 */

/** OpenAPI Transformer which applies a given list of transformers
 * sequentially.
 */
export default class OpenApiTransformerPipeline {
  /** Constructs an OpenApiTransformerPipeline for a given list of transformers.
   *
   * @param {!DataView<!OpenApiTransformer>} transformers Transformers to
   * apply, in order of application.
   */
  constructor([...transformers]) {
    /** Applies transformers to a given OpenAPI Object.
     *
     * @param {!object} openApi OpenAPI Object.
     * @returns {!object|!Promise<!object>} Transformed OpenAPI Object.  Wrapped
     * in a Promise if any of the transformers return a Promise.
     */
    this.transformOpenApi = (openApi) => {
      let result = openApi;
      for (const transformer of transformers) {
        if (typeof result.then === 'function') {
          result = result.then((r) => transformer.transformOpenApi(r));
        } else {
          result = transformer.transformOpenApi(result);
        }
      }
      return result;
    };
  }
}
