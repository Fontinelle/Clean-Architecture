import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import AddressValidatorFactory from '../factory/address.validator.factory';

export default class Address extends Entity {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;
  private _state: string;

  constructor(
    street: string,
    number: number,
    city: string,
    state: string,
    zip: string,
  ) {
    super();
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zip = zip;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  validate() {
    AddressValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city}, ${this._state}, ${this._zip}`;
  }
}
