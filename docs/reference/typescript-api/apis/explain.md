# Client.explain

Explain a document match result. Get information about why a specific document matches, or doesn't match, a query. It computes a score explanation for a query and a specific document.

## Method Signature

```typescript
client.explain(this: That, params: T.ExplainRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ExplainResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ExplainRequest`](../types/ExplainRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ExplainResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
