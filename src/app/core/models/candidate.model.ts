enum CONTACT_TYPES {phone = 'phone', email = 'email', skype = 'skype'}

export class Contact {
  constructor(
    public type: CONTACT_TYPES,
    public value: string,
    public preferred: boolean
  ) {}
}

export class Candidate {
  constructor(
    public name: string,
    public surname?: string,
    public photo?: string,
    public contacts?: Contact[],
    public id?: number
  ) {
  }
}
