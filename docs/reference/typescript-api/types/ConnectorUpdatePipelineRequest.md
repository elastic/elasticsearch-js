# ConnectorUpdatePipelineRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_id` | [`Id`](Id.md) | The unique identifier of the connector to be updated |
| `pipeline` | [`ConnectorIngestPipelineParams`](ConnectorIngestPipelineParams.md) | - |
| `body?` | `string | { [key: string]: any } & { connector_id?: never, pipeline?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_id?: never, pipeline?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
