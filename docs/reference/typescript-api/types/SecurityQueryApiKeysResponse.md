# SecurityQueryApiKeysResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total` | [`integer`](integer.md) | The total number of API keys found. |
| `count` | [`integer`](integer.md) | The number of API keys returned in the response. |
| `api_keys` | [`SecurityApiKey`](SecurityApiKey.md)[] | A list of API key information. |
| `aggregations?` | `Record<AggregateName, SecurityQueryApiKeysApiKeyAggregate>` | The aggregations result, if requested. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
