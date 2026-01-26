# Client.exists

Check a document. Verify that a document exists. For example, check to see if a document with the `_id` 0 exists: ``` HEAD my-index-000001/_doc/0 ``` If the document exists, the API returns a status code of `200 - OK`. If the document doesn’t exist, the API returns `404 - Not Found`. **Versioning support** You can use the `version` parameter to check the document only if its current version is equal to the specified one. Internally, Elasticsearch has marked the old document as deleted and added an entirely new document. The old version of the document doesn't disappear immediately, although you won't be able to access it. Elasticsearch cleans up deleted documents in the background as you continue to index more data.

## Method Signature

```typescript
client.exists(this: That, params: T.ExistsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ExistsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ExistsRequest`](../types/ExistsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ExistsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
