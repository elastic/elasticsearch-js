# SecurityQueryApiKeysResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total` | `integer` | The total number of API keys found. |
| `count` | `integer` | The number of API keys returned in the response. |
| `api_keys` | `SecurityApiKey[]` | A list of API key information. |
| `aggregations?` | `Record<AggregateName, SecurityQueryApiKeysApiKeyAggregate>` | The aggregations result, if requested. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
