# Client.inference.putJinaai

Create an JinaAI inference endpoint. Create an inference endpoint to perform an inference task with the `jinaai` service. To review the available `rerank` models, refer to <https://jina.ai/reranker>. To review the available `text_embedding` models, refer to the <https://jina.ai/embeddings/>.

## Method Signature

```typescript
client.inference.putJinaai(this: That, params: T.InferencePutJinaaiRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutJinaaiResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutJinaaiRequest`](../types/InferencePutJinaaiRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutJinaaiResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
