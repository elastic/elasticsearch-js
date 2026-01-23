# ClusterGetComponentTemplateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Name`](Name.md) | Name of component template to retrieve. Wildcard (`*`) expressions are supported. |
| `flat_settings?` | `boolean` | If `true`, returns settings in flat format. |
| `settings_filter?` | `string | string[]` | Filter out results, for example to filter out sensitive information. Supports wildcards or full settings keys |
| `include_defaults?` | `boolean` | Return all default configurations for the component template |
| `local?` | `boolean` | If `true`, the request retrieves information from the local node only.
If `false`, information is retrieved from the master node. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { name?: never, flat_settings?: never, settings_filter?: never, include_defaults?: never, local?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, flat_settings?: never, settings_filter?: never, include_defaults?: never, local?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
