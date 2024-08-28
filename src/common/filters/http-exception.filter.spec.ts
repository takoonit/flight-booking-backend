import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    const httpExceptionFilter = new HttpExceptionFilter();
    expect(httpExceptionFilter).toBeDefined();
  });
});