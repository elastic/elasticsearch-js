## Interface `QueryDslTermsSetQuery`

| Name | Type | Description |
| - | - | - |
| `minimum_should_match_field` | [Field](./Field.md) | Numeric field containing the number of matching terms required to return a document. |
| `minimum_should_match_script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Custom script containing the number of matching terms required to return a document. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | Specification describing number of matching terms required to return a document. |
| `terms` | [FieldValue](./FieldValue.md)[] | Array of terms you wish to find in the provided field. |
