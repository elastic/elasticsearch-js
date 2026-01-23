# RankEvalResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `metric_score` | [`double`](double.md) | The overall evaluation quality calculated by the defined metric |
| `details` | `Record<Id, RankEvalRankEvalMetricDetail>` | The details section contains one entry for every query in the original requests section, keyed by the search request id |
| `failures` | `Record<string, any>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
