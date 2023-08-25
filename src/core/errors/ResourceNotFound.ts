export class ResourceNotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`Resource ${resource} with id ${id} not found`);
  }
}
