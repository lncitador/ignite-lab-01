import { Entity } from './entity';

/**
 * Class Repository
 * @package src\shared\domain\base
 * @access  public
 * @abstract
 * @example
 * class UserRepository extends Repository<User> {}
 */
export abstract class Repository<T extends Entity> {
  /**
   * Get one entity by id
   * @param id String
   * @access public
   * @return Promise<T>
   */
  public abstract findById(id: string): Promise<T>;

  /**
   * Get all entities
   * @access public
   * @return Promise<T[]>
   */
  public abstract findAll(): Promise<T[]>;

  /**
   * Create a new entity
   * @param entity T
   * @access public
   * @return Promise<T>
   */
  public abstract create(
    entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<T>;

  /**
   * Update an entity by id
   * @param id String
   * @param entity T
   */
  public abstract update(id: string, entity: Partial<T>): Promise<T>;

  /**
   * Delete an entity by id
   * @param id String
   */
  public abstract delete(id: string): Promise<T>;
}
