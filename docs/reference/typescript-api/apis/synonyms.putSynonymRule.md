# Client.synonyms.putSynonymRule

Create or update a synonym rule. Create or update a synonym rule in a synonym set. If any of the synonym rules included is invalid, the API returns an error. When you update a synonym rule, all analyzers using the synonyms set will be reloaded automatically to reflect the new rule.

## Method Signature

```typescript
client.synonyms.putSynonymRule(this: That, params: T.SynonymsPutSynonymRuleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SynonymsPutSynonymRuleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SynonymsPutSynonymRuleRequest`](../types/SynonymsPutSynonymRuleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SynonymsPutSynonymRuleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
