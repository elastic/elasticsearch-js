# ConnectorSyncJobDeleteRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_sync_job_id` | [`Id`](Id.md) | The unique identifier of the connector sync job to be deleted |
| `body?` | `string | { [key: string]: any } & { connector_sync_job_id?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_sync_job_id?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
