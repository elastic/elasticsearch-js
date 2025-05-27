## Interface `SecurityQueryApiKeysResponse`

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<[AggregateName](./AggregateName.md), [SecurityQueryApiKeysApiKeyAggregate](./SecurityQueryApiKeysApiKeyAggregate.md)> | The aggregations result, if requested. |
| `api_keys` | [SecurityApiKey](./SecurityApiKey.md)[] | A list of API key information. |
| `count` | [integer](./integer.md) | The number of API keys returned in the response. |
| `total` | [integer](./integer.md) | The total number of API keys found. |
