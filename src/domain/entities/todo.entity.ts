interface Object {
  id: number;
  text: string;
  completedAt?: Date | null;
}

export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: Object): TodoEntity {
    const { id, text, completedAt } = object;

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw 'CompletedAt is not a valid date';
      }
    }

    return new TodoEntity(id, text, completedAt);
  }
}
