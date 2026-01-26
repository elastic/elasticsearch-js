# Client.query_rules.deleteRule

Delete a query rule. Delete a query rule within a query ruleset. This is a destructive action that is only recoverable by re-adding the same rule with the create or update query rule API.

## Method Signature

```typescript
client.query_rules.deleteRule(this: That, params: T.QueryRulesDeleteRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.QueryRulesDeleteRuleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`QueryRulesDeleteRuleRequest`](../types/QueryRulesDeleteRuleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.QueryRulesDeleteRuleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
