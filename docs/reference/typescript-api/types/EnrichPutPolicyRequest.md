# EnrichPutPolicyRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | Name of the enrich policy to create or update. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `geo_match?` | [`EnrichPolicy`](EnrichPolicy.md) | Matches enrich data to incoming documents based on a `geo_shape` query. |
| `match?` | [`EnrichPolicy`](EnrichPolicy.md) | Matches enrich data to incoming documents based on a `term` query. |
| `range?` | [`EnrichPolicy`](EnrichPolicy.md) | Matches a number, date, or IP address in incoming documents to a range in the enrich index based on a `term` query. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never, geo_match?: never, match?: never, range?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never, geo_match?: never, match?: never, range?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
