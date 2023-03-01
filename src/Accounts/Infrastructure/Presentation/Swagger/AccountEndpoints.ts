/**
 * @openapi
 *
 * /account/:
 *  get:
 *    tags: [Accounts]
 *    summary: Get all accounts
 *    description: Use to request all accounts
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: List of accounts
 *        type: json
 *
 *  post:
 *    tags: [Accounts]
 *    summary: Create a new account
 *    description: Use to create an account
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AccountCreate'
 *    responses:
 *      201:
 *        description: Account created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Name is required
 *      409:
 *        description: Name already exists
 *
 * /account/{uuid}:
 *  get:
 *    tags: [Accounts]
 *    summary: Get one account
 *    description: Use to request one account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    responses:
 *      200:
 *        description: Account by uuid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Bad uuid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Bad uuid
 *      404:
 *        description: Account not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Account not found
 *
 *  put:
 *    tags: [Accounts]
 *    summary: Update an account
 *    description: Use to update an account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AccountUpdate'
 *    responses:
 *      200:
 *        description: Account updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountResponse'
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Account not found
 *      409:
 *        description: Name already exists
 *
 *  delete:
 *    tags: [Accounts]
 *    summary: Delete an account
 *    description: Use to delete an account
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of account
 *    responses:
 *      200:
 *        description: Account deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: boolean
 *              example: true
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Account not found
 */
