# ConnectorSyncJobPostRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The id of the associated connector |
| `job_type?` | [`ConnectorSyncJobType`](ConnectorSyncJobType.md) | - |
| `trigger_method?` | [`ConnectorSyncJobTriggerMethod`](ConnectorSyncJobTriggerMethod.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, job_type?: never, trigger_method?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, job_type?: never, trigger_method?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
