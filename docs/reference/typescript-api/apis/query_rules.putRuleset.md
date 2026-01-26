# Client.query_rules.putRuleset

Create or update a query ruleset. There is a limit of 100 rules per ruleset. This limit can be increased by using the `xpack.applications.rules.max_rules_per_ruleset` cluster setting. IMPORTANT: Due to limitations within pinned queries, you can only select documents using `ids` or `docs`, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.

## Method Signature

```typescript
client.query_rules.putRuleset(this: That, params: T.QueryRulesPutRulesetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesPutRulesetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`QueryRulesPutRulesetRequest`](../types/QueryRulesPutRulesetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.QueryRulesPutRulesetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
