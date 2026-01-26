# Client.update

Update a document. Update a document by running a script or passing a partial document. If the Elasticsearch security features are enabled, you must have the `index` or `write` index privilege for the target index or index alias. The script can update, delete, or skip modifying the document. The API also supports passing a partial document, which is merged into the existing document. To fully replace an existing document, use the index API. This operation: * Gets the document (collocated with the shard) from the index. * Runs the specified script. * Indexes the result. The document must still be reindexed, but using this API removes some network roundtrips and reduces chances of version conflicts between the GET and the index operation. The `_source` field must be enabled to use this API. In addition to `_source`, you can access the following variables through the `ctx` map: `_index`, `_type`, `_id`, `_version`, `_routing`, and `_now` (the current timestamp). For usage examples such as partial updates, upserts, and scripted updates, see the External documentation.

## Method Signature

```typescript
client.update(this: That, params: T.UpdateRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.UpdateResponse<TDocumentR>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`UpdateRequest`](../types/UpdateRequest.md)<TDocument, TPartialDocument> | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.UpdateResponse<TDocumentR>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
