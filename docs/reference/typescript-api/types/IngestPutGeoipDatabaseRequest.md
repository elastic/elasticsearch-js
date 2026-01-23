# IngestPutGeoipDatabaseRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | ID of the database configuration to create or update. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [`Name`](Name.md) | The provider-assigned name of the IP geolocation database to download. |
| `maxmind` | [`IngestMaxmind`](IngestMaxmind.md) | The configuration necessary to identify which IP geolocation provider to use to download the database, as well as any provider-specific configuration necessary for such downloading.
At present, the only supported provider is maxmind, and the maxmind provider requires that an account_id (string) is configured. |
| `body?` | `string | { [key: string]: any } & { id?: never, master_timeout?: never, timeout?: never, name?: never, maxmind?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, master_timeout?: never, timeout?: never, name?: never, maxmind?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
