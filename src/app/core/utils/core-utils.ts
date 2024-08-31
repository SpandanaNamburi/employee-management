export class CoreUtils {
  constructor() { }

  public toLowerCase = (value: string): string => {
    return value ? value.toLowerCase() : "";
  }
}