# ConnectorSyncJobListRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `from?` | [`integer`](integer.md) | Starting offset |
| `size?` | [`integer`](integer.md) | Specifies a max number of results to get |
| `status?` | [`ConnectorSyncStatus`](ConnectorSyncStatus.md) | A sync job status to fetch connector sync jobs for |
| `connector_id?` | [`Id`](Id.md) | A connector id to fetch connector sync jobs for |
| `job_type?` | `ConnectorSyncJobType | ConnectorSyncJobType`[] | A comma-separated list of job types to fetch the sync jobs for |
| `body?` | `string | { [key: string]: any } & { from?: never, size?: never, status?: never, connector_id?: never, job_type?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { from?: never, size?: never, status?: never, connector_id?: never, job_type?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
