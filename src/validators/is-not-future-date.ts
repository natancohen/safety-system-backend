import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDate implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const inputDate = new Date(date);
    const now = new Date();
    return inputDate <= now;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date must not be in the future';
  }
}