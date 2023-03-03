/**
 * @openapi
 *
 * components:
 *  schemas:
 *    CategoryResponse:
 *      properties:
 *        uuid:
 *          type: string
 *          description: The auto-generated uuid of the category
 *        name:
 *          type: string
 *          description: The name of category
 *        icon:
 *          type: string
 *          description: Two chars to identify category visually
 *        visible:
 *          type: boolean
 *          description: Category is visible or not
 *        enable:
 *          type: boolean
 *          description: Category is enable or disable
 *        parentUuid:
 *          type: string
 *          description: Uuid of parent category, if it has it
 *      example:
 *        uuid: 2cb532bb-0c29-4de5-a0d9-19ecd75a6bea
 *        name: Tools
 *        icon: TO
 *        visible: 1
 *        enable: 1
 *        parentUuid: 4911b72b-a448-4e2d-874b-ed91874d1061
 *
 *    CategoryCreate:
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: The name of category
 *        icon:
 *          type: string
 *          description: Two chars to identify category visually
 *        parentUuid:
 *          type: string
 *          description: The uuid of parent category
 *      example:
 *        name: Tools
 *        icon: TO
 *        parentUuid: 4911b72b-a448-4e2d-874b-ed91874d1061
 *
 *    CategoryUpdate:
 *      properties:
 *        name:
 *          type: string
 *          description: The name of category
 *        icon:
 *          type: string
 *          description: Two chars to identify category visually
 *        visible:
 *          type: boolean
 *          description: Category is visible or not
 *        parentUuid:
 *          type: string
 *          description: The uuid of parent category
 *      example:
 *        name: Tools
 *        icon: TO
 *        visible: false
 *        parentUuid: 4911b72b-a448-4e2d-874b-ed91874d1061
 */
