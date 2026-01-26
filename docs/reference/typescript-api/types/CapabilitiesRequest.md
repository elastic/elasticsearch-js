# CapabilitiesRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `method?` | [`CapabilitiesRestMethod`](CapabilitiesRestMethod.md) | REST method to check |
| `path?` | `string` | API path to check |
| `parameters?` | `string | string`[] | Comma-separated list of API parameters to check |
| `capabilities?` | `string | string`[] | Comma-separated list of arbitrary API capabilities to check |
| `local_only?` | `boolean` | True if only the node being called should be considered |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { method?: never, path?: never, parameters?: never, capabilities?: never, local_only?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { method?: never, path?: never, parameters?: never, capabilities?: never, local_only?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
