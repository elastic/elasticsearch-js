# `RankEvalResponse` [interface-RankEvalResponse]

| Name | Type | Description |
| - | - | - |
| `details` | Record<[Id](./Id.md), [RankEvalRankEvalMetricDetail](./RankEvalRankEvalMetricDetail.md)> | The details section contains one entry for every query in the original requests section, keyed by the search request id |
| `failures` | Record<string, any> | &nbsp; |
| `metric_score` | [double](./double.md) | The overall evaluation quality calculated by the defined metric |
