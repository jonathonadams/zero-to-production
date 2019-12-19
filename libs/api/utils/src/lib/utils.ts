export function swapId<T>(object: any): T {
  if (object._id) {
    [object._id, object.id] = [object.id, object._id];
  }
  return object;
}
