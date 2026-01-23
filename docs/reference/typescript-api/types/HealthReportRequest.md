# HealthReportRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `feature?` | `string | string[]` | A feature of the cluster, as returned by the top-level health report API. |
| `timeout?` | [`Duration`](Duration.md) | Explicit operation timeout. |
| `verbose?` | `boolean` | Opt-in for more information about the health of the system. |
| `size?` | [`integer`](integer.md) | Limit the number of affected resources the health report API returns. |
| `body?` | `string | { [key: string]: any } & { feature?: never, timeout?: never, verbose?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { feature?: never, timeout?: never, verbose?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
