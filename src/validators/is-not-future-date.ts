import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDate implements ValidatorConstraintInterface {
  validate(date: string, _args: ValidationArguments): boolean {
    const inputDate = new Date(date);
    const now = new Date();
    return inputDate <= now;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Date must not be in the future';
  }
}
