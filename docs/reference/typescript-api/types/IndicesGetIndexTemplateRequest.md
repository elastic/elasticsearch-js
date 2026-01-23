# IndicesGetIndexTemplateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Name`](Name.md) | Name of index template to retrieve. Wildcard (*) expressions are supported. |
| `local?` | `boolean` | If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node. |
| `flat_settings?` | `boolean` | If true, returns settings in flat format. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `include_defaults?` | `boolean` | If true, returns all relevant default configurations for the index template. |
| `body?` | `string | { [key: string]: any } & { name?: never, local?: never, flat_settings?: never, master_timeout?: never, include_defaults?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, local?: never, flat_settings?: never, master_timeout?: never, include_defaults?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
