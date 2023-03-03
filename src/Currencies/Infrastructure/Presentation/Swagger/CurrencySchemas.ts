/**
 * @openapi
 *
 * components:
 *  schemas:
 *    CurrencyResponse:
 *      properties:
 *        code:
 *          type: string
 *          description: Currency code (ISO 4217)
 *        name:
 *          type: string
 *          description: The name of currency
 *        decimals:
 *          type: number
 *          description: The number of digits after the decimal separator
 *        unicode:
 *          type: string
 *          description: Currency unicode
 *        hexCode:
 *          type: string
 *          description: Currency hexadecimal code
 *        htmlCode:
 *          type: string
 *          description: Currency HTML code
 *        htmlEntity:
 *          type: string
 *          description: Currency HTML entity code
 *      example:
 *        code: EUR
 *        name: Euro
 *        decimals: 2
 *        unicode: U+020AC
 *        hexCode: &#x20AC;
 *        htmlCode: &#8364;
 *        htmlEntity: &euro;
 */
