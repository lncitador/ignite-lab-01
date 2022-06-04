/**
 * Class Entity
 * @package src\shared\domain\base
 * @access  public
 * @abstract
 * @example
 * class User extends Entity {
 *    constructor(id: number, name: string) {
 *     super(id);
 *    this.name = name;
 *   }
 * }
 */
export abstract class Entity {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}
