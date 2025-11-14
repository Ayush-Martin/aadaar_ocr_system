class DOB {
  public readonly value: string;

  constructor(private _dob: Date) {
    this.value = `${_dob.getDate()}/${_dob.getMonth()}/${_dob.getFullYear()}`;
  }
}

export default DOB;
