import { ErrorEvent, ErrorService } from 'services';

import { Observable } from 'rxjs';

describe('ErrorService', () => {
  let errorService;
  jest.useFakeTimers();
  beforeEach(() => {
    errorService = new ErrorService();
  });


  it('notifes about a given error', (done) => {
    const mockFatalObserver = jest.fn();
    const mockTrivialObserver = jest.fn();
    const mockObserver = jest.fn();
    
    errorService.getErrorEvents("FATAL").subscribe(mockFatalObserver);
    errorService.getErrorEvents("TRIVIAL").subscribe(mockTrivialObserver);
    errorService.getErrorEvents().subscribe(mockObserver);
    
    const errors = [
      new ErrorEvent(null, "FATAL"),
      new ErrorEvent(null, "FATAL"),
      new ErrorEvent(null, "TRIVIAL"),
      new ErrorEvent(null, "TRIVIAL"),
      new ErrorEvent(null, "TRIVIAL"),
      new ErrorEvent(null, "OTHER")
    ];
    errors.forEach((e) => errorService.pushErrorEvent(e));
    

    Observable.of([1]).delay(100).map((a) => {
      expect(mockFatalObserver).toHaveBeenCalledTimes(2);
      expect(mockTrivialObserver).toHaveBeenCalledTimes(3);
      expect(mockObserver).toHaveBeenCalledTimes(errors.length);
      return a;
    }).subscribe(() => {
      done();
    }, (err) => {
      done.fail(err);
    });
    jest.runAllTimers();
  });
});