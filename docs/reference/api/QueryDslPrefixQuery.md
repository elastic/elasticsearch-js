## Interface `QueryDslPrefixQuery`

| Name | Type | Description |
| - | - | - |
| `case_insensitive` | boolean | Allows ASCII case insensitive matching of the value with the indexed field values when set to `true`. Default is `false` which means the case sensitivity of matching depends on the underlying field’s mapping. |
| `rewrite` | [MultiTermQueryRewrite](./MultiTermQueryRewrite.md) | Method used to rewrite the query. |
| `value` | string | Beginning characters of terms you wish to find in the provided field. |
