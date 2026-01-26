# Client.query_rules.deleteRuleset

Delete a query ruleset. Remove a query ruleset and its associated data. This is a destructive action that is not recoverable.

## Method Signature

```typescript
client.query_rules.deleteRuleset(this: That, params: T.QueryRulesDeleteRulesetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesDeleteRulesetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`QueryRulesDeleteRulesetRequest`](../types/QueryRulesDeleteRulesetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.QueryRulesDeleteRulesetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
