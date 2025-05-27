## Interface `AnalysisConditionTokenFilter`

| Name | Type | Description |
| - | - | - |
| `filter` | string[] | Array of token filters. If a token matches the predicate script in the `script` parameter, these filters are applied to the token in the order provided. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Predicate script used to apply token filters. If a token matches this script, the filters in the `filter` parameter are applied to the token. |
| `type` | 'condition' | &nbsp; |
