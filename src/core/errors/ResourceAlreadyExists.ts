export class ResourceAlreadyExists extends Error {
  constructor(resource: string, id: string) {
    super(`Resource ${resource} with ${id} already exists`);
  }
}
