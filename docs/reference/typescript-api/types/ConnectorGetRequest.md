# ConnectorGetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_id` | [`Id`](Id.md) | The unique identifier of the connector |
| `include_deleted?` | `boolean` | A flag to indicate if the desired connector should be fetched, even if it was soft-deleted. |
| `body?` | `string | { [key: string]: any } & { connector_id?: never, include_deleted?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_id?: never, include_deleted?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
