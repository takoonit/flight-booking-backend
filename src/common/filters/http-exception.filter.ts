import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

/**
 * Represents an interface for exception filters in a software system.
 * @typeparam {ExceptionType} - The type of exception to catch.
 */
export interface IExceptionFilter<ExceptionType> {
  catch(exception: ExceptionType, host: ArgumentsHost): void;
}

/**
 * HttpExceptionFilter class is an implementation of the ExceptionFilter and IExceptionFilter interfaces.
 * It is responsible for catching HttpExceptions and returning a formatted response.
 *
 * @public
 * @class
 * @template ExceptionType - The type of HttpException to be caught.
 * @implements {ExceptionFilter<ExceptionType>}
 * @implements {IExceptionFilter<ExceptionType>}
 */
@Catch()
export class HttpExceptionFilter<ExceptionType extends HttpException> implements ExceptionFilter<ExceptionType>, IExceptionFilter<ExceptionType> {
  catch(exception: ExceptionType, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message,
    });
  }
}