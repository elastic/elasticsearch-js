# Client.inference.putContextualai

Create an Contextual AI inference endpoint. Create an inference endpoint to perform an inference task with the `contexualai` service. To review the available `rerank` models, refer to <https://docs.contextual.ai/api-reference/rerank/rerank#body-model>.

## Method Signature

```typescript
client.inference.putContextualai(this: That, params: T.InferencePutContextualaiRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutContextualaiResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutContextualaiRequest`](../types/InferencePutContextualaiRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutContextualaiResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
