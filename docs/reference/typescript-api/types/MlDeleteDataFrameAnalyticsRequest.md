# MlDeleteDataFrameAnalyticsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Identifier for the data frame analytics job. |
| `force?` | `boolean` | If `true`, it deletes a job that is not stopped; this method is quicker than stopping and deleting the job. |
| `timeout?` | [`Duration`](Duration.md) | The time to wait for the job to be deleted. |
| `body?` | `string | { [key: string]: any } & { id?: never, force?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, force?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
