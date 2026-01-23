# IndicesDownsampleRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | Name of the time series index to downsample. |
| `target_index` | [`IndexName`](IndexName.md) | Name of the index to create. |
| `config?` | [`IndicesDownsampleConfig`](IndicesDownsampleConfig.md) | - |
| `body?` | `string | { [key: string]: any } & { index?: never, target_index?: never, config?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, target_index?: never, config?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
