# `QueryRulesQueryRuleActions` [interface-QueryRulesQueryRuleActions]

| Name | Type | Description |
| - | - | - |
| `docs` | [QueryDslPinnedDoc](./QueryDslPinnedDoc.md)[] | The documents to apply the rule to. Only one of `ids` or `docs` may be specified and at least one must be specified. There is a maximum value of 100 documents in a rule. You can specify the following attributes for each document: * `_index`: The index of the document to pin. * `_id`: The unique document ID. |
| `ids` | [Id](./Id.md)[] | The unique document IDs of the documents to apply the rule to. Only one of `ids` or `docs` may be specified and at least one must be specified. |
