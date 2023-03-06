/**
 * @openapi
 *
 * /currency/:
 *  get:
 *    tags: [Currency]
 *    summary: Get all currencies
 *    description: Use to request all currencies
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: List of currencies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CurrencyResponse'
 *              example:
 *                - code: EUR
 *                  name: Euro
 *                  decimals: 2
 *                  unicode: "U+020AC"
 *                  hexCode: "&#x20AC;"
 *                  htmlCode: "&#8364;"
 *                  htmlEntity: "&euro;"
 *                - code: USD
 *                  name: United States dollar
 *                  decimals: 2
 *                  unicode: "U+00024"
 *                  hexCode: "&#x24;"
 *                  htmlCode: "&#36;"
 *                  htmlEntity: "&dollar;"
 *
 * /currency/{code}:
 *  get:
 *    tags: [Currency]
 *    summary: Get one currency
 *    description: Use to request one currency
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: code
 *        description: Code of currency
 *    responses:
 *      200:
 *        description: Currency by code (ISO 4217)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CurrencyResponse'
 *      400:
 *        description: Bad code
 *      404:
 *        description: Currency not found
 */
