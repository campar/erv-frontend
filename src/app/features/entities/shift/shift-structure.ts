import {Attribute} from "../../../core/entity-utils/attribute";
import {Structure} from "../structure";
import {SearchField} from "../../../core/entity-utils/search-field";
import {InputField} from "../../../core/entity-utils/input-field";
import {Validators} from "@angular/forms";

export class ShiftStructure implements Structure {

  static #instance: ShiftStructure;

  entityName: string = 'Shift';
  title: string = 'shifts';
  fkSearchAttribute: string[] = ['startFrom', 'endFrom'];
  attributes: Attribute[] = [
    new Attribute(
      'startFrom',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).validators([Validators.pattern(/^(?:[01]?\d|2[0-3]):[0-5]?\d$/)]).formatFunction(this.formatTime).placeholder("HH:mm").trim(true),
    ),
    new Attribute(
      'startTo',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).validators([Validators.pattern(/^(?:[01]?\d|2[0-3]):[0-5]?\d$/)]).formatFunction(this.formatTime).placeholder("HH:mm").trim(true),
    ),
    new Attribute(
      'endFrom',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).validators([Validators.pattern(/^(?:[01]?\d|2[0-3]):[0-5]?\d$/)]).formatFunction(this.formatTime).placeholder("HH:mm").trim(true),
    ),
    new Attribute(
      'endTo',
      'string',
      SearchField.INPUT(),
      InputField.INPUT().required(true).validators([Validators.pattern(/^(?:[01]?\d|2[0-3]):[0-5]?\d$/)]).formatFunction(this.formatTime).placeholder("HH:mm").trim(true),
    ),
    new Attribute(
      'durationHours',
      'number',
      SearchField.INPUT().minLength(0),
      InputField.INPUT().required(true).minLength(0).validators([Validators.pattern(/^(?:[1-9]|1[0-9]|2[0-4])$/)]).placeholder("HH"),
    ),
    new Attribute(
      'durationMinutes',
      'number',
      SearchField.INPUT().minLength(0),
      InputField.INPUT().required(true).minLength(0).validators([Validators.pattern(/^(?:[0-9]|[1-5][0-9])$/)]).placeholder("mm")
    )
  ];

  formatTime(input: string): string {
    let [hours, minutes] = input.split(':').map(Number);
    // Ensure both hours and minutes are two digits
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }


  private constructor() {
  }

  public static get instance(): ShiftStructure {
    if (!ShiftStructure.#instance) {
      ShiftStructure.#instance = new ShiftStructure();
    }
    return ShiftStructure.#instance;
  }
}
