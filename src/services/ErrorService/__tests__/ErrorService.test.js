import { ErrorEvent, ErrorService } from 'services';


describe('ErrorService', () => {
  let errorService;
  beforeEach(() => {
    errorService = new ErrorService();
    
  });

  it('notifes about a given error', () => {
    const mockFatalObserver = jest.fn();
    const mockTrivialObserver = jest.fn();
    const mockObserver = jest.fn();
    
    errorService.getErrorEvents("FATAL").subscribe(mockFatalObserver);
    errorService.getErrorEvents("TRIVIAL").subscribe(mockTrivialObserver);
    errorService.getErrorEvents().subscribe(mockObserver);
    
    const errors = [
      new ErrorEvent("FATAL"),
      new ErrorEvent("FATAL"),
      new ErrorEvent("TRIVIAL"),
      new ErrorEvent("TRIVIAL"),
      new ErrorEvent("TRIVIAL"),
      new ErrorEvent("OTHER")
    ];
    errors.forEach((e) => errorService.pushErrorEvent(e));
    
    setTimeout(() => {
      expect(mockFatalObserver).toHaveBeenCalledTimes(2);
      expect(mockTrivialObserver).toHaveBeenCalledTimes(3);
      expect(mockObserver).toHaveBeenCalledTimes(errors.length);
    }, 100);
  });

});