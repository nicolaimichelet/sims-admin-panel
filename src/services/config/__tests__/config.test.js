import { ConfigServiceProvider } from 'services';


class Storage {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};


describe('Config service', () => {
  let configService;
  let storage;
  beforeAll(() => {
    storage = new Storage();
    configService = new ConfigServiceProvider(null, storage);
    console.log(configService);
  });

  it('saves a value to the storage, then clears the storage', () => {
    configService.setItem("foo", "bar");
    expect(configService.getItem("foo")).toBe("bar");
    configService.clear();
    expect(configService.getItem("foo")).toBeFalsy();
  });

  it('saves an object to the storage, then removed it using removeItem', () => {
    const object = {
      name: "Hello",
      href: "World"
    };
    configService.setObject("object", object);
    let fetched = configService.getObject("object");
    expect(fetched).toBeTruthy();
    expect(fetched.name).toBe(object.name);
    expect(fetched.href).toBe(object.href);

    configService.removeItem("object");
    expect(configService.getObject("object")).toBeFalsy();
  });
});

