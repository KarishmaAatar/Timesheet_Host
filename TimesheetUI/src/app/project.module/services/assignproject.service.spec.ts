import { TestBed } from '@angular/core/testing';

import { AssignprojectService } from './assignproject.service';

describe('AssignprojectService', () => {
  let service: AssignprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
