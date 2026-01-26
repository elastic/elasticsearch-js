# Client.ilm.removePolicy

Remove policies from an index. Remove the assigned lifecycle policies from an index or a data stream's backing indices. It also stops managing the indices.

## Method Signature

```typescript
client.ilm.removePolicy(this: That, params: T.IlmRemovePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmRemovePolicyResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmRemovePolicyRequest`](../types/IlmRemovePolicyRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmRemovePolicyResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
