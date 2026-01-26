# Client.synonyms.putSynonym

Create or update a synonym set. Synonyms sets are limited to a maximum of 10,000 synonym rules per set. If you need to manage more synonym rules, you can create multiple synonym sets. When an existing synonyms set is updated, the search analyzers that use the synonyms set are reloaded automatically for all indices. This is equivalent to invoking the reload search analyzers API for all indices that use the synonyms set. For practical examples of how to create or update a synonyms set, refer to the External documentation.

## Method Signature

```typescript
client.synonyms.putSynonym(this: That, params: T.SynonymsPutSynonymRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SynonymsPutSynonymResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SynonymsPutSynonymRequest`](../types/SynonymsPutSynonymRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SynonymsPutSynonymResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
