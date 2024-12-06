import {entities} from "../../features/entities/entities";
import * as Enums from "../../features/entities/enums.model";
import {Attribute} from "../../core/entity-utils/attribute";
import {Structure} from "../../features/entities/structure";
import {DatePipe} from "@angular/common";

export class AppUtils {
  public static readonly DEFAULT_PAGE_SIZE: string = '10';

  /**
   * Converts the first letter of the given string to lowercase.
   * @param str - The string to convert.
   * @returns The string with the first letter in lowercase.
   */
  public static toFirstLetterLowercase(str: string | undefined): string {
    if (!str) return "";
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * Checks if a variable is a foreign key.
   * @param type - Type of the variable.
   * @returns true if it is a foreign key.
   */
  public static isForeignKey(type: string): boolean {
    return entities.filter(e => e.name === type).length > 0;
  }

  /**
   * Checks if a variable is a date.
   * @param value - Type of the variable.
   * @returns true if it is a date.
   */
  public static isDateInput(value: string): boolean {
    return value === 'date';
  }

  /**
   * Checks if a variable is a date.
   * @param value - Type of the variable.
   * @returns true if it is a string or date.
   */
  public static isDateTimeInput(value: string): boolean {
    return value === 'datetime-local';
  }

  /**
   * Checks if a variable is a boolean.
   * @param value - Type of the variable.
   * @returns true if it is a boolean.
   */
  public static isBoolean(value: string): boolean {
    return value === 'boolean';
  }

  /**
   * Checks if a variable is an enum.
   * @param value - Type of the variable.
   * @returns true if it is an enum.
   */
  public static isEnum(value: string): boolean {
    return value === 'enum';
  }

  public static getAttributeType(name: string, attributes: Attribute[]): string {
    return attributes.filter(e => e.attr_name === name)[0].type;
  }

  public static getFkAttributeStructure(name: string, attributes: Attribute[]): Structure {
    const type = attributes.filter(e => e.attr_name === name)[0].type;
    return entities.filter(e => e.name === type)[0].structure;
  }

  /**
   * @param type Entity for which we want to find search attribute.
   * @returns name of the attribute to be displayed instead of whole object.
   */
  public static getFkSearchAttribute(type: string): string[] {
    return entities.filter(e => e.name === type)[0].structure.fkSearchAttribute;
  }

  public static getDisplayValue(object: any, type: string) {
    if (!object) return null;
    let keys = AppUtils.getFkSearchAttribute(type);
    let displayValue: string | null = null;
    for (let key of keys) {
      if (!object[key] || object[key] === '') continue;
      if (!displayValue) displayValue = "";
      displayValue = displayValue + " " + object[key];
    }
    return displayValue?.trim();
  }

  public static getEntityViewValue(obj: any, type: string, delimiter: string = " "): string {
    if (!obj) return '';
    const formatEntity = (entity: any): string => {
      const keys = this.getFkSearchAttribute(type);
      return keys
        .map(key => {
          if (typeof entity[key] === 'string')
            return entity[key]?.trim()
          if (entity[key] instanceof Date)
            return new DatePipe('en-US').transform(entity[key], 'dd-MM-yyyy HH:mm:ss');
          return entity[key];
        })
        .filter(value => value)
        .join(delimiter);
    };

    if (Array.isArray(obj)) {
      return obj.map(item => formatEntity(item)).join(', '); // Use comma as delimiter for array
    } else {
      return formatEntity(obj); // Handle single object
    }
  }

  public static findEnumByName(enumName: string): any {
    return Enums[enumName as keyof typeof Enums];
  }

  public static capitalizeFirstLetter(input: string): string {
    if (!input) return input; // Return the input as is if it's an empty string or undefined/null
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  static getTagColor(attr: Attribute, value: any) {
    if (attr.attr_name === 'actionType') {
      switch (value) {
        case Enums.ActionType.CHECK_IN:
          return 'var(--green-200)'
        case Enums.ActionType.CHECK_OUT:
          return 'var(--red-200)'
        case Enums.ActionType.PAUSE_START:
          return 'var(--yellow-200)'
        case Enums.ActionType.PAUSE_END:
          return 'var(--orange-200)'
        case Enums.ActionType.BUSINESS_START:
          return 'var(--blue-200)'
        case Enums.ActionType.BUSINESS_END:
          return 'var(--indigo-200)'
      }
    } else if (attr.attr_name === 'cardType') {
      switch (value) {
        case Enums.CardType.PERSONAL:
          return 'var(--blue-200)'
        case Enums.CardType.TEMPORARY:
          return 'var(--orange-200)'
      }
    } else if (attr.attr_name === 'userType') {
      switch (value) {
        case Enums.UserType.ADMIN:
          return 'var(--blue-200)'
        case Enums.UserType.EMPLOYEE:
          return 'var(--orange-200)'
      }
    }
    return 'var(--primary-200)'
  }

  static getTagTextColor(attr: Attribute, value: any) {
    if (attr.attr_name === 'actionType') {
      switch (value) {
        case Enums.ActionType.CHECK_IN:
          return 'var(--green-800)'
        case Enums.ActionType.CHECK_OUT:
          return 'var(--red-800)'
        case Enums.ActionType.PAUSE_START:
          return 'var(--yellow-800)'
        case Enums.ActionType.PAUSE_END:
          return 'var(--orange-800)'
        case Enums.ActionType.BUSINESS_START:
          return 'var(--blue-800)'
        case Enums.ActionType.BUSINESS_END:
          return 'var(--indigo-800)'
      }
    } else if (attr.attr_name === 'cardType') {
      switch (value) {
        case Enums.CardType.PERSONAL:
          return 'var(--blue-800)'
        case Enums.CardType.TEMPORARY:
          return 'var(--orange-800)'
      }
    } else if (attr.attr_name === 'userType') {
      switch (value) {
        case Enums.UserType.ADMIN:
          return 'var(--blue-800)'
        case Enums.UserType.EMPLOYEE:
          return 'var(--orange-800)'
      }
    }


    return 'var(--primary-800)'
  }

  static readonly isISODate = (str: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?$/.test(str);
  };

  static isDaylightSavingTime(date: Date): boolean {
    // Get the standard timezone offset in minutes for the given date
    const january = new Date(date.getFullYear(), 0, 1); // January is in standard time
    const july = new Date(date.getFullYear(), 6, 1);    // July is in daylight saving time if applicable

    // Timezone offsets
    const stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());

    // If the date has a smaller timezone offset than the standard one, it's during DST
    return date.getTimezoneOffset() < stdTimezoneOffset;
  }
}
