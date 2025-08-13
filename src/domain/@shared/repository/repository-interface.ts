export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>; /* Não faz sentido retornar ao criar, Salve exceções. */
    update(entity: T): Promise<void>;
    find(id: string): Promise<T | null>;
    findAll(): Promise<T[]>; /* Dica: pode ser retornado um "metadado" que traga informações sobre os resultados Ex: Quantidade, tempo  */
}