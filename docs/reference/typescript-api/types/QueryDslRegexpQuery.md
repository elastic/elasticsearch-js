# QueryDslRegexpQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `case_insensitive?` | `boolean` | Allows case insensitive matching of the regular expression value with the indexed field values when set to `true`.
When `false`, case sensitivity of matching depends on the underlying field’s mapping. |
| `flags?` | `string` | Enables optional operators for the regular expression. |
| `max_determinized_states?` | `integer` | Maximum number of automaton states required for the query. |
| `rewrite?` | [`MultiTermQueryRewrite`](MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `value` | `string` | Regular expression for terms you wish to find in the provided field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
