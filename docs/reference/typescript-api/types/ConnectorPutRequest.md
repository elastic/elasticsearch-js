# ConnectorPutRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `connector_id?` | [`Id`](Id.md) | The unique identifier of the connector to be created or updated. ID is auto-generated if not provided. |
| `description?` | `string` | - |
| `index_name?` | [`IndexName`](IndexName.md) | - |
| `is_native?` | `boolean` | - |
| `language?` | `string` | - |
| `name?` | `string` | - |
| `service_type?` | `string` | - |
| `body?` | `string | { [key: string]: any } & { connector_id?: never, description?: never, index_name?: never, is_native?: never, language?: never, name?: never, service_type?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { connector_id?: never, description?: never, index_name?: never, is_native?: never, language?: never, name?: never, service_type?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
