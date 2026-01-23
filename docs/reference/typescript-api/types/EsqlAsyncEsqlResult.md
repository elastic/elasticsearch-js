# EsqlAsyncEsqlResult

## Interface

### Extends

- [`EsqlEsqlResult`](EsqlEsqlResult.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | `string` | The ID of the async query, to be used in subsequent requests to check the status or retrieve results.

Also available in the `X-Elasticsearch-Async-Id` HTTP header. |
| `is_running` | `boolean` | Indicates whether the async query is still running or has completed.

Also available in the `X-Elasticsearch-Async-Is-Running` HTTP header. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
