# QueryDslFieldValueFactorScoreFunction

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | Field to be extracted from the document. |
| `factor?` | [`double`](double.md) | Optional factor to multiply the field value with. |
| `missing?` | [`double`](double.md) | Value used if the document doesn’t have that field.
The modifier and factor are still applied to it as though it were read from the document. |
| `modifier?` | [`QueryDslFieldValueFactorModifier`](QueryDslFieldValueFactorModifier.md) | Modifier to apply to the field value. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
