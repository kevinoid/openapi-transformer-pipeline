/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

import assert from 'node:assert';

import OpenApiTransformerPipeline from '../index.js';
import AsyncTransformer from '../test-lib/async-transformer.js';
import SyncTransformer from '../test-lib/sync-transformer.js';

function* toGenerator(iterable) {
  for (const value of iterable) {
    yield value;
  }
}

describe('OpenApiTransformerPipeline', () => {
  it('throws TypeError when called without new', () => {
    assert.throws(
      // eslint-disable-next-line new-cap
      () => OpenApiTransformerPipeline([new SyncTransformer(1)]),
      TypeError,
    );
  });

  it('throws TypeError when called without arguments', () => {
    assert.throws(
      () => new OpenApiTransformerPipeline(),
      TypeError,
    );
  });

  it('throws TypeError when called with null', () => {
    assert.throws(
      () => new OpenApiTransformerPipeline(null),
      TypeError,
    );
  });

  it('throws TypeError when called with non-iterable argument', () => {
    assert.throws(
      () => new OpenApiTransformerPipeline(new SyncTransformer(1)),
      TypeError,
    );
  });

  it('applies empty Array by returning input unchanged', () => {
    const pipeline = new OpenApiTransformerPipeline([]);
    const input = {};
    const result = pipeline.transformOpenApi(input);
    assert.strictEqual(result, input);
    assert.deepStrictEqual(result, {});
  });

  it('applies SyncTransformer Array with non-Promise result', () => {
    const pipeline = new OpenApiTransformerPipeline([new SyncTransformer(1)]);
    const result = pipeline.transformOpenApi({});
    assert.deepStrictEqual(result, { 'x-test': [1] });
  });

  it('applies AsyncTransformer Array with Promise result', () => {
    const pipeline = new OpenApiTransformerPipeline([new AsyncTransformer(1)]);
    return pipeline.transformOpenApi({})
      .then((result) => assert.deepStrictEqual(result, { 'x-test': [1] }));
  });

  it('applies SyncTransformer Generator with non-Promise result', () => {
    const pipeline = new OpenApiTransformerPipeline(toGenerator([
      new SyncTransformer(1),
    ]));
    const result = pipeline.transformOpenApi({});
    assert.deepStrictEqual(result, { 'x-test': [1] });
  });

  it('changing Array after constructor has no effect', () => {
    const transformers = [];
    const pipeline = new OpenApiTransformerPipeline(transformers);
    transformers.push(new SyncTransformer(1));
    const result = pipeline.transformOpenApi({});
    assert.deepStrictEqual(result, {});
  });

  it('applies Sync after Async with Promise result', () => {
    const pipeline = new OpenApiTransformerPipeline([
      new AsyncTransformer(1),
      new SyncTransformer(2),
    ]);
    return pipeline.transformOpenApi({})
      .then((result) => assert.deepStrictEqual(result, { 'x-test': [1, 2] }));
  });

  it('applies Async after Sync with Promise result', () => {
    const pipeline = new OpenApiTransformerPipeline([
      new SyncTransformer(1),
      new AsyncTransformer(2),
    ]);
    return pipeline.transformOpenApi({})
      .then((result) => assert.deepStrictEqual(result, { 'x-test': [1, 2] }));
  });
});
