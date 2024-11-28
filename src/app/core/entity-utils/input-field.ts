import {ValidatorFn} from "@angular/forms";
import {AttributeFieldType} from "./search-field";

export class InputField {
  type: AttributeFieldType;
  _multiSelect: boolean;
  _required: boolean;
  _disabled: boolean;
  _maxLength: any;
  _minLength: any;
  _trim: boolean;
  _toLowerCase: boolean;
  _validators: ValidatorFn[] | undefined;
  _tooltip: Function | string | undefined;
  _placeholder: any;
  _mask: string | undefined;
  _formatFunction: Function | undefined;

  constructor(type: AttributeFieldType = AttributeFieldType.INPUT, multiSelect: boolean = false, required: boolean = false, disabled: boolean = false,
              maxLength: number | Date | null = null, minLength: number | Date | null = null, trim: boolean = false, toLowerCase: boolean = false) {
    this.type = type;
    this._multiSelect = multiSelect;
    this._required = required;
    this._disabled = disabled;
    this._maxLength = maxLength;
    this._minLength = minLength;
    this._trim = trim;
    this._toLowerCase = toLowerCase;
  }

  static INPUT(): InputField {
    return new InputField();
  }

  static TEXTAREA(): InputField {
    return new InputField(AttributeFieldType.TEXTAREA);
  }

  static DROPDOWN(): InputField {
    return new InputField(AttributeFieldType.DROPDOWN);
  }

  static PICK_LIST(): InputField {
    return new InputField(AttributeFieldType.PICK_LIST, true);
  }

  static TREE_SELECT(): InputField {
    return new InputField(AttributeFieldType.TREE_SELECT);
  }

  static CALENDAR(): InputField {
    return new InputField(AttributeFieldType.CALENDAR);
  }

  static CHECKBOX(): InputField {
    return new InputField(AttributeFieldType.CHECKBOX);
  }

  isPickList() {
    return this.type === AttributeFieldType.PICK_LIST;
  }

  isTreeSelect() {
    return this.type === AttributeFieldType.TREE_SELECT;
  }

  isDropdown() {
    return this.type === AttributeFieldType.DROPDOWN;
  }

  isCheckbox() {
    return this.type === AttributeFieldType.CHECKBOX;
  }

  isCalendar() {
    return this.type === AttributeFieldType.CALENDAR;
  }

  isInput() {
    return this.type === AttributeFieldType.INPUT;
  }

  isTextarea() {
    return this.type === AttributeFieldType.TEXTAREA;
  }

  maxLength(value: any) {
    this._maxLength = value;
    return this;
  }

  minLength(value: any) {
    this._minLength = value;
    return this;
  }

  multiSelect(value: boolean) {
    this._multiSelect = value;
    return this;
  }

  required(value: boolean) {
    this._required = value;
    return this;
  }

  disabled(value: boolean) {
    this._disabled = value;
    return this;
  }

  trim(value: boolean) {
    this._trim = value;
    return this;
  }

  toLowerCase(value: boolean) {
    this._toLowerCase = value;
    return this;
  }

  validators(validators: ValidatorFn[]) {
    this._validators = validators;
    return this;
  }

  tooltip(tooltip: string) {
    this._tooltip = tooltip;
  }

  mask(mask: string) {
    this._mask = mask;
    return this;
  }

  placeholder(placeholder: any) {
    this._placeholder = placeholder;
    return this;
  }

  formatFunction(formatFunction: (value: string) => string) {
    this._formatFunction = formatFunction;
    return this;
  }
}
