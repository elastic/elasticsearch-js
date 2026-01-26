# Client.query_rules.putRule

Create or update a query rule. Create or update a query rule within a query ruleset. IMPORTANT: Due to limitations within pinned queries, you can only pin documents using ids or docs, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.

## Method Signature

```typescript
client.query_rules.putRule(this: That, params: T.QueryRulesPutRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesPutRuleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`QueryRulesPutRuleRequest`](../types/QueryRulesPutRuleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.QueryRulesPutRuleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
