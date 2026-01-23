# ConnectorSyncJobClaimRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_sync_job_id` | [`Id`](Id.md) | The unique identifier of the connector sync job. |
| `sync_cursor?` | `any` | The cursor object from the last incremental sync job.
This should reference the `sync_cursor` field in the connector state for which the job runs. |
| `worker_hostname` | `string` | The host name of the current system that will run the job. |
| `body?` | `string | { [key: string]: any } & { connector_sync_job_id?: never, sync_cursor?: never, worker_hostname?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_sync_job_id?: never, sync_cursor?: never, worker_hostname?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
