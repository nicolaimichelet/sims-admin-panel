import { HttpServiceProvider } from 'services';


describe('HttpServiceProvider', () => {
  let http;
  beforeAll(() => {
    jest.useRealTimers();
    //jest.useFakeTimers();
    http = new HttpServiceProvider();
  });
  
  
  it('fetches', (done) => {
    
    const payload = {
      name: "Hello",
      text: "Everything ok"
    };

    const extra = {
      status: 200
    };

    fetch.mockResponse(JSON.stringify(payload), extra);

    http.get("http://localhost/services")
      .merge(http.get("http://localhost/services"))
      .merge(http.get("http://localhost/services"))
      .merge(http.get("http://localhost/services"))
      .map((data) => {
        expect(data).toHaveProperty("name");
        expect(data).toHaveProperty("text");
        expect(data.name).toBe(payload.name);
        expect(data.text).toBe(payload.text);
      }).last().subscribe(() => {
        done();
      }, (err) => {
        done.fail(err);
      });
  });
});