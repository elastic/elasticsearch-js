# AnalysisConditionTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'condition'` | - |
| `filter` | `string[]` | Array of token filters. If a token matches the predicate script in the `script` parameter, these filters are applied to the token in the order provided. |
| `script` | `Script | ScriptSource` | Predicate script used to apply token filters. If a token matches this script, the filters in the `filter` parameter are applied to the token. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
