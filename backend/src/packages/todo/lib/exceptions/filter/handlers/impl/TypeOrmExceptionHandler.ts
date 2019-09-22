import { QueryFailedError } from 'typeorm';

import { IExceptionHandler } from '../interfaces';

import { BaseException } from '../../../impl/BaseException';
import { InvalidArgumentException } from '../../../impl/InvalidArgumentException';
import { InternalException } from '../../../impl/InternalException';
import { AlreadyExistsException } from '../../../impl/AlreadyExistsException';

import { Logger } from '../../../../logger';

// see: https://postgrespro.ru/docs/postgrespro/9.5/errcodes-appendix
const PG_INVALID_ARGUMENT_ERROR_CODES = [
    // Class 22 — Data Exception
    '22000', // data_exception
    '2202E', // array_subscript_error
    '22021', // character_not_in_repertoire
    '22008', // datetime_field_overflow
    '22005', // error_in_assignment
    '22022', // indicator_overflow
    '22015', // interval_field_overflow
    '22018', // invalid_character_value_for_cast
    '22007', // invalid_datetime_format
    '22010', // invalid_indicator_parameter_value
    '22023', // invalid_parameter_value
    '2201B', // invalid_regular_expression
    '2201W', // invalid_row_count_in_limit_clause
    '2201X', // invalid_row_count_in_result_offset_clause
    '22009', // invalid_time_zone_displacement_value
    '22004', // null_value_not_allowed
    '22002', // null_value_no_indicator_parameter
    '22003', // numeric_value_out_of_range
    '22026', // string_data_length_mismatch
    '22001', // string_data_right_truncation
    '2200F', // zero_length_character_string
    '22P01', // floating_point_exception
    '22P02', // invalid_text_representation
    '22P05', // untranslatable_character

    // Class 23 — Integrity Constraint Violation
    '23502', // not_null_violation
    '23503', // foreign_key_violation
    '23514' // check_violation
];

// Class 23 — Integrity Constraint Violation, "unique_violation"
const PG_UNIQUE_ERROR_CODE = '23505';

export class TypeOrmExceptionHandler implements IExceptionHandler {
    private readonly logger = new Logger('TypeOrmExceptionHandler');

    constructor(private readonly exception: QueryFailedError, private readonly label: string) {}

    public wrapError(): BaseException {
        const { code: pgErrorCode }: any = this.exception;

        if (PG_INVALID_ARGUMENT_ERROR_CODES.includes(pgErrorCode)) {
            return new InvalidArgumentException();
        }

        if (PG_UNIQUE_ERROR_CODE === pgErrorCode) {
            return new AlreadyExistsException();
        }

        return new InternalException();
    }

    public warnAboutError(): void {
        const { message, name, query, parameters, stack }: any = this.exception;
        this.logger.error(`${this.label} :: TypeOrm error "${message || name}",\nStack: ${stack},\nQuery: ${query},\nParams: ${parameters}`);
    }
}
