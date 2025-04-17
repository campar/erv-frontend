import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

function parseTimeToMinutes(time: string): number | null {
  if (!time) return null;
  const parts = time.split(':').map(p => parseInt(p, 10));
  if (parts.length !== 2 || parts.some(isNaN)) return null;
  const [hours, mins] = parts;
  return hours * 60 + mins;
}

export const timeRangeValidator = (group: AbstractControl): ValidationErrors | null => {
  if (!(group instanceof FormGroup)) return null;
  let startFrom = parseTimeToMinutes(group.get('startFrom')?.value);
  let endFrom = parseTimeToMinutes(group.get('endFrom')?.value);
  let startTo = parseTimeToMinutes(group.get('startTo')?.value);
  let endTo = parseTimeToMinutes(group.get('endTo')?.value);

  if ([startFrom, endFrom, startTo, endTo].every(v => v != null)) {
    // Handle overnight shift (end is next day)
    if (endFrom! < startFrom!) endFrom! += 24 * 60;
    if (startTo! < startFrom!) startTo! += 24 * 60;
    if (endTo! < startFrom!) endTo! += 24 * 60;

    if (!(startFrom! <= startTo! && startTo! <= endFrom! && endFrom! <= endTo!)) {
      return { invalidDates: true };
    }
  }
  return null;
};

export const durationValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  if (!(group instanceof FormGroup)) return null;

  let start = parseTimeToMinutes(group.get('startFrom')?.value);
  let end = parseTimeToMinutes(group.get('endFrom')?.value);
  const hrs = +group.get('durationHours')?.value || 0;
  const mins = +group.get('durationMinutes')?.value || 0;

  if (start != null && end != null) {
    // Overnight shift → add 24h to end
    if (end < start) end += 24 * 60;

    const diff = end - start;      // total available minutes
    const dur = hrs * 60 + mins;   // entered duration

    if (dur > diff) {
      return { durationTooLong: true };
    }
  }
  return null;
};
