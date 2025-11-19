import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDate implements ValidatorConstraintInterface {
  validate(date: string, _args: ValidationArguments): boolean {
    // Added guards: format + parse + future check
    if (typeof date !== 'string') {
      return false;
    }
    const isoLike = /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(date);
    if (!isoLike) {
      return false;
    }
    const ts = Date.parse(date);
    if (Number.isNaN(ts)) {
      return false;
    }
    const parsed = new Date(ts);
    if (Number.isNaN(parsed.getTime())) {
      return false;
    }

    const inputDate = new Date(date);
    const now = new Date();
    return inputDate <= now;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Date must not be in the future';
  }
}
