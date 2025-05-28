# `SecurityQueryUserUserQueryContainer` [interface-SecurityQueryUserUserQueryContainer]

| Name | Type | Description |
| - | - | - |
| `bool` | [QueryDslBoolQuery](./QueryDslBoolQuery.md) | matches users matching boolean combinations of other queries. |
| `exists` | [QueryDslExistsQuery](./QueryDslExistsQuery.md) | Returns users that contain an indexed value for a field. |
| `ids` | [QueryDslIdsQuery](./QueryDslIdsQuery.md) | Returns users based on their IDs. This query uses the user document IDs stored in the `_id` field. |
| `match_all` | [QueryDslMatchAllQuery](./QueryDslMatchAllQuery.md) | Matches all users, giving them all a `_score` of 1.0. |
| `match` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslMatchQuery](./QueryDslMatchQuery.md) | string | [float](./float.md) | boolean>> | Returns users that match a provided text, number, date or boolean value. The provided text is analyzed before matching. |
| `prefix` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslPrefixQuery](./QueryDslPrefixQuery.md) | string>> | Returns users that contain a specific prefix in a provided field. |
| `range` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslRangeQuery](./QueryDslRangeQuery.md)>> | Returns users that contain terms within a provided range. |
| `simple_query_string` | [QueryDslSimpleQueryStringQuery](./QueryDslSimpleQueryStringQuery.md) | Returns users based on a provided query string, using a parser with a limited but fault-tolerant syntax. |
| `term` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslTermQuery](./QueryDslTermQuery.md) | [FieldValue](./FieldValue.md)>> | Returns users that contain an exact term in a provided field. To return a document, the query term must exactly match the queried field's value, including whitespace and capitalization. |
| `terms` | [QueryDslTermsQuery](./QueryDslTermsQuery.md) | Returns users that contain one or more exact terms in a provided field. To return a document, one or more terms must exactly match a field value, including whitespace and capitalization. |
| `wildcard` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslWildcardQuery](./QueryDslWildcardQuery.md) | string>> | Returns users that contain terms matching a wildcard pattern. |
