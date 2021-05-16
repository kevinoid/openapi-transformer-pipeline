/**
 * @copyright Copyright 2021 Kevin Locke <kevin@kevinlocke.name>
 * @license MIT
 */

export default class AsyncTransformer {
  constructor(value) {
    this.value = value;
  }

  async transformOpenApi(openApi) {
    return {
      ...openApi,
      'x-test': [...openApi['x-test'] || [], this.value],
    };
  }
}
