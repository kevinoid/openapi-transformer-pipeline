/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

export default class SyncTransformer {
  constructor(value) {
    this.value = value;
  }

  transformOpenApi(openApi) {
    return {
      ...openApi,
      'x-test': [...openApi['x-test'] || [], this.value],
    };
  }
}
