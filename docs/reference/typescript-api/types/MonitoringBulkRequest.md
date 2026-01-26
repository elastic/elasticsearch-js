# MonitoringBulkRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `system_id` | `string` | Identifier of the monitored system |
| `system_api_version` | `string` | - |
| `interval` | [`Duration`](Duration.md) | Collection interval (e.g., '10s' or '10000ms') of the payload |
| `operations?` | `(BulkOperationContainer | BulkUpdateAction<TDocument, TPartialDocument> | TDocument)`[] | - |
| `body?` | `string | { [key: string]: any } & { system_id?: never, system_api_version?: never, interval?: never, operations?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { system_id?: never, system_api_version?: never, interval?: never, operations?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
