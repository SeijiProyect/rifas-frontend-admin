import { TestBed } from '@angular/core/testing';

import { IpClientService } from './ip-client.service';

describe('IpClientService', () => {
  let service: IpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
