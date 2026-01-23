# SearchApplicationSearchRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The name of the search application to be searched. |
| `typed_keys?` | `boolean` | Determines whether aggregation names are prefixed by their respective types in the response. |
| `params?` | `Record<string, any>` | Query parameters specific to this request, which will override any defaults specified in the template. |
| `body?` | `string | { [key: string]: any } & { name?: never, typed_keys?: never, params?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, typed_keys?: never, params?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
