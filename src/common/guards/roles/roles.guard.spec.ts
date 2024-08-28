import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';  // Ensure Reflector is imported
import { Test, TestingModule } from '@nestjs/testing';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;  // Declare Reflector instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        Reflector,
      ],
    }).compile();

    reflector = module.get<Reflector>(Reflector);
    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });
});