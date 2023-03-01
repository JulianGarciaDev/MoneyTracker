/**
 * @openapi
 *
 * components:
 *  schemas:
 *    AccountResponse:
 *      properties:
 *        uuid:
 *          type: string
 *          description: The auto-generated uuid of the account
 *        name:
 *          type: string
 *          description: The name of account
 *        icon:
 *          type: string
 *          description: Two chars to identify account visually
 *        type:
 *          type: string
 *          description: Type of account (General, Cash, Saving...)
 *        currency:
 *          type: string
 *          description: Code of currency (EUR, USD, GBP...)
 *        visible:
 *          type: boolean
 *          description: Account is visible or not
 *        enable:
 *          type: boolean
 *          description: Account is enable or disable
 *      example:
 *        uuid: 4911b72b-a448-4e2d-874b-ed91874d1061
 *        name: CaixaBank
 *        icon: CA
 *        type: General
 *        currency: EUR
 *        visible: 1
 *        enable: 1
 *
 *    AccountCreate:
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: The name of account
 *        icon:
 *          type: string
 *          description: Two chars to identify account visually
 *        type:
 *          type: string
 *          description: Type of account (General, Cash, Saving...)
 *        currency:
 *          type: string
 *          description: Code of currency (EUR, USD, GBP...)
 *      example:
 *        name: CaixaBank
 *        icon: CA
 *        type: General
 *        currency: EUR
 *
 *    AccountUpdate:
 *      properties:
 *        name:
 *          type: string
 *          description: The name of account
 *        icon:
 *          type: string
 *          description: Two chars to identify account visually
 *        type:
 *          type: string
 *          description: Type of account (General, Cash, Saving...)
 *        currency:
 *          type: string
 *          description: Code of currency (EUR, USD, GBP...)
 *        visible:
 *          type: boolean
 *          description: Account is visible or not
 *      example:
 *        name: CaixaBank
 *        icon: CA
 *        type: General
 *        currency: EUR
 *        visible: false
 */
