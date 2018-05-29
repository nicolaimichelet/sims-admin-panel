import { HttpServiceProvider } from 'services';


describe('HttpServiceProvider', () => {
  let http;
  beforeAll(() => {
    jest.useRealTimers();
  });
  
  beforeEach(() => {
    fetch.resetMocks();
    http = new HttpServiceProvider();
  });

  it('fetches: OK', (done) => {
    
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

  it('fetches with credentials: OK', () => {
    const payload = {
      name: "Hello",
      text: "Everything ok"
    };

    const extra = {
      status: 200
    };

    fetch.mockResponse(JSON.stringify(payload), extra);

    const authenticator = (request) => {
      request.headers.set("Authorization",`LETMEIN`);
      return request;
    };
    
    http.setAuthMethod(authenticator);

    http.get("http://localhost/services")
      .map((data) => {
        expect(data).toHaveProperty("name");
        expect(data).toHaveProperty("text");
        expect(data.name).toBe(payload.name);
        expect(data.text).toBe(payload.text);
        expect(authenticator).toHaveBeenCalled();
      }).last().subscribe(() => {
        done();
      }, (err) => {
        done.fail(err);
      });
  });

  it('posts data: OK', () => {
    const payload = {
      name: "Hello",
      text: "Everything ok"
    };

    const extra = {
      status: 200
    };

    fetch.mockResponse(JSON.stringify(payload), extra);

  
    http.post("http://localhost/services")
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

  it('patch data: OK', () => {
    const payload = {
      name: "Hello",
      text: "Everything ok"
    };

    const extra = {
      status: 200
    };

    fetch.mockResponse(JSON.stringify(payload), extra);

    http.patch("http://localhost/services")
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
  
  it('delete data: OK', () => {
    const payload = {
      name: "Hello",
      text: "Everything ok"
    };

    const extra = {
      status: 200
    };

    fetch.mockResponse(JSON.stringify(payload), extra);

    http.patch("http://localhost/services")
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