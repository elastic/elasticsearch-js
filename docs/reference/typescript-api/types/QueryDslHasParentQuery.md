# QueryDslHasParentQuery

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ignore_unmapped?` | `boolean` | Indicates whether to ignore an unmapped `parent_type` and not return any documents instead of an error.
You can use this parameter to query multiple indices that may not contain the `parent_type`. |
| `inner_hits?` | [`SearchInnerHits`](SearchInnerHits.md) | If defined, each search hit will contain inner hits. |
| `parent_type` | [`RelationName`](RelationName.md) | Name of the parent relationship mapped for the `join` field. |
| `query` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Query you wish to run on parent documents of the `parent_type` field.
If a parent document matches the search, the query returns its child documents. |
| `score?` | `boolean` | Indicates whether the relevance score of a matching parent document is aggregated into its child documents. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
