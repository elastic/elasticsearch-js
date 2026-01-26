# Client.indices.analyze

Get tokens from text analysis. The analyze API performs analysis on a text string and returns the resulting tokens. Generating excessive amount of tokens may cause a node to run out of memory. The `index.analyze.max_token_count` setting enables you to limit the number of tokens that can be produced. If more than this limit of tokens gets generated, an error occurs. The `_analyze` endpoint without a specified index will always use `10000` as its limit.

## Method Signature

```typescript
client.indices.analyze(this: That, params?: T.IndicesAnalyzeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesAnalyzeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesAnalyzeRequest`](../types/IndicesAnalyzeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesAnalyzeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
