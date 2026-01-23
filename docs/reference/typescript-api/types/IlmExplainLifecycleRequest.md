# IlmExplainLifecycleRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | Comma-separated list of data streams, indices, and aliases to target. Supports wildcards (`*`).
To target all data streams and indices, use `*` or `_all`. |
| `only_errors?` | `boolean` | Filters the returned indices to only indices that are managed by ILM and are in an error state, either due to an encountering an error while executing the policy, or attempting to use a policy that does not exist. |
| `only_managed?` | `boolean` | Filters the returned indices to only indices that are managed by ILM. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { index?: never, only_errors?: never, only_managed?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, only_errors?: never, only_managed?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
