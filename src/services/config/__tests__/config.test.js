import { ConfigServiceProvider } from 'services';



describe('Config service', () => {
  let configService;
  let storage;
  beforeEach(() => {
    storage = new Storage();
    configService = new ConfigServiceProvider(null, storage);
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

