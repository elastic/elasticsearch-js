# ConnectorPostRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `description?` | `string` | - |
| `index_name?` | [`IndexName`](IndexName.md) | - |
| `is_native?` | `boolean` | - |
| `language?` | `string` | - |
| `name?` | `string` | - |
| `service_type?` | `string` | - |
| `body?` | `string | { [key: string]: any } & { description?: never, index_name?: never, is_native?: never, language?: never, name?: never, service_type?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { description?: never, index_name?: never, is_native?: never, language?: never, name?: never, service_type?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
