import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch dollar rate', () => {
    const mockResponse = {
      rates: {
        BRL: 5.40 
      },
      base: 'USD',
      date: '2024-01-01'
    };

    service.getDollarRate().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.rates.BRL).toBe(5.40); 
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockResponse); 
  });
});
