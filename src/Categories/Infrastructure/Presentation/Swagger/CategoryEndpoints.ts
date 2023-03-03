/**
 * @openapi
 *
 * /category/:
 *  get:
 *    tags: [Category]
 *    summary: Get all categories
 *    description: Use to request all categories
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: List of categories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CategoryResponse'
 *              example:
 *                - uuid: 4911b72b-a448-4e2d-874b-ed91874d1061
 *                  name: Home
 *                  icon: HO
 *                  visible: 1
 *                  enable: 1
 *                  parentUuid: ""
 *                - uuid: 858e8322-991c-47ae-97a1-845665d7d010
 *                  name: Health
 *                  icon: HE
 *                  visible: 1
 *                  enable: 1
 *                  parentUuid: ""
 *
 *
 *  post:
 *    tags: [Category]
 *    summary: Create a new category
 *    description: Use to create an category
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CategoryCreate'
 *    responses:
 *      201:
 *        description: Category created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Name is required
 *      409:
 *        description: Name already exists
 *
 * /category/{uuid}:
 *  get:
 *    tags: [Category]
 *    summary: Get one category
 *    description: Use to request one category
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of category
 *    responses:
 *      200:
 *        description: Category by uuid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Category not found
 *
 *  put:
 *    tags: [Category]
 *    summary: Update an category
 *    description: Use to update an category
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CategoryUpdate'
 *    responses:
 *      200:
 *        description: Category updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Category or parent category not found
 *      409:
 *        description: Name already exists
 *
 *  delete:
 *    tags: [Category]
 *    summary: Delete an category
 *    description: Use to delete an category
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: uuid
 *        description: Uuid of category
 *    responses:
 *      200:
 *        description: Category deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: boolean
 *              example: true
 *      400:
 *        description: Bad uuid
 *      404:
 *        description: Category not found
 */
