# MigrationDeprecationsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | Comma-separate list of data streams or indices to check. Wildcard (*) expressions are supported. |
| `body?` | `string | { [key: string]: any } & { index?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
