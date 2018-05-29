import { ManagedService, ConfigServiceProvider, ConfigServiceInterface, ErrorService, ManagedServiceServiceProvider, IManagedService, ServiceManager, HttpServiceProvider } from 'services';

import { paths } from 'common/utils';


describe('MangedServiceServiceProvider', () => {
  let managedService;
  let serviceManager;
  beforeAll(() => {
    serviceManager = new ServiceManager();
    serviceManager.registerService(ConfigServiceProvider, null, new Storage());
    serviceManager.registerService(ErrorService);
    serviceManager.registerService(HttpServiceProvider);
    serviceManager.registerService(ManagedServiceServiceProvider);
    managedService = serviceManager.getService(IManagedService);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  const createService = () => {
    return ManagedService.fromData({
      isServiceEnabled: true,
      id: "1",
      name: "broadband",
      state: "active",
      startMode: 0,
      hasStarted: true,
      description: "Description",
      serviceRelationship: [
        {
          type: "contains",
          service: {
            href: "http://server:port/sims/44",
            id: "44"
          }
        }
      ],
      serviceSpecification: {
        href: "http://server:port/4",
        id: 4
      },
      relatedParty: [
        {
          href: "http://server:port/42",
          role: "parner",
          id: "42"
        }
      ],
      serviceCharacteristic: [
        {
          name: "speed",
          value: "16M"
        }
      ],
      category: "CFS",
      supportingService: [
        {
          href: "http://server:port/59",
          id: "59"
        }
      ],
      supportingResource: [],
      note: [],
      place: [],
    });
  }

  it('tries to fetch services', (done) => {
    let payload = createService();
    fetch.once(JSON.stringify([payload.toData()]));
    fetch.once(JSON.stringify([payload.toData()]));
    fetch.once(JSON.stringify(payload.toData()));
    
    
    managedService.getServices().merge(managedService.search("hello")).merge(managedService.getService(1).map((a) => [a]))
    .map((a) => a[0]).bufferCount(3)
    .map((services) => {
      expect(services).toHaveLength(3);
      for(let service of services){
        let paths1 = paths(service.toData());
        let paths2 = paths(payload.toData());
        expect(paths1.length).toBeGreaterThan(0);
        expect(paths1).toHaveLength(paths2.length);
        expect(service.toData()).toEqual(payload.toData());
      }
    }).subscribe(() => {
      done();
    }, (err) => {
      done.fail(err);
    })
  });
});