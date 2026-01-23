# CatSnapshotsRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `repository?` | [`Names`](Names.md) | A comma-separated list of snapshot repositories used to limit the request.
Accepts wildcard expressions.
`_all` returns all repositories.
If any repository fails during the request, Elasticsearch returns an error. |
| `ignore_unavailable?` | `boolean` | If `true`, the response does not include information from unavailable snapshots. |
| `h?` | [`CatCatSnapshotsColumns`](CatCatSnapshotsColumns.md) | A comma-separated list of columns names to display.
It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `body?` | `string | { [key: string]: any } & { repository?: never, ignore_unavailable?: never, h?: never, s?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { repository?: never, ignore_unavailable?: never, h?: never, s?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
