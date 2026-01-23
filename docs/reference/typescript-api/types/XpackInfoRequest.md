# XpackInfoRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `categories?` | [`XpackInfoXPackCategory`](XpackInfoXPackCategory.md)[] | A comma-separated list of the information categories to include in the response.
For example, `build,license,features`. |
| `accept_enterprise?` | `boolean` | If used, this otherwise ignored parameter must be set to true |
| `human?` | `boolean` | Defines whether additional human-readable information is included in the response.
In particular, it adds descriptions and a tag line. |
| `body?` | `string | { [key: string]: any } & { categories?: never, accept_enterprise?: never, human?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { categories?: never, accept_enterprise?: never, human?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
