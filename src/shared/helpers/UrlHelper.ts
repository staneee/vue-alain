export class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static readonly initialUrl = location.href;

  static getQueryParameters(): any {
    return 'none';
  }
}
