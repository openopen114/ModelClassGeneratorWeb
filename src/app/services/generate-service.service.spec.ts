import { TestBed, inject } from '@angular/core/testing';

import { GenerateServiceService } from './generate-service.service';

describe('GenerateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateServiceService]
    });
  });

  it('should be created', inject([GenerateServiceService], (service: GenerateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
