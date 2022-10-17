export default class Pass<T> {
  private predicate: (value: T, testValue?: T) => boolean;
  private message: string;

  constructor(predicate: (value: T, testValue?: T) => boolean, message: string) {
    this.predicate = predicate;
    this.message = message;
  }

  public assert(value: T): { isValidEntry: boolean, invalidMessage: string } {
    return {
      isValidEntry: this.predicate(value),
      invalidMessage: this.message
    }
  }

  public test(value: T, testValue: T): { isValidEntry: boolean, invalidMessage: string } {
    return {
      isValidEntry: this.predicate(value, testValue),
      invalidMessage: this.message
    }
  }

  public static create<T>(predicate: (value: T) => boolean, message: string) {
    return new Pass<T>(predicate, message);
  }

  public static createAssert<T>(predicate: (value: T, testValue: T) => boolean, message: string) {
    return new Pass<T>(predicate, message);
  }
}

