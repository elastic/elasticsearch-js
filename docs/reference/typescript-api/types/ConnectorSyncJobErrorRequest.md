# ConnectorSyncJobErrorRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_sync_job_id` | [`Id`](Id.md) | The unique identifier for the connector sync job. |
| `error` | `string` | The error for the connector sync job error field. |
| `body?` | `string | { [key: string]: any } & { connector_sync_job_id?: never, error?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_sync_job_id?: never, error?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
