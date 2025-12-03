class AgeBand {
  public readonly value: string;

  constructor(private _age: number) {
    this.value = this.getValue(this._age);
  }

  /**
   * Takes age and returns age band
   * @param age 
   * @returns 
   */
  private getValue(age: number) {
    if (age < 20) return "0-19";
    if (age < 30) return "20-29";
    if (age < 40) return "30-39";
    if (age < 50) return "40-49";
    return "50+";
  }
}

export default AgeBand;
