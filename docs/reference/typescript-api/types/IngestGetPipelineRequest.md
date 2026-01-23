# IngestGetPipelineRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | Comma-separated list of pipeline IDs to retrieve.
Wildcard (`*`) expressions are supported.
To get all ingest pipelines, omit this parameter or use `*`. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `summary?` | `boolean` | Return pipelines without their definitions |
| `body?` | `string | { [key: string]: any } & { id?: never, master_timeout?: never, summary?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, master_timeout?: never, summary?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
