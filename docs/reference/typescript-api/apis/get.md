# Client.get

Get a document by its ID. Get a document and its source or stored fields from an index. By default, this API is realtime and is not affected by the refresh rate of the index (when data will become visible for search). In the case where stored fields are requested with the `stored_fields` parameter and the document has been updated but is not yet refreshed, the API will have to parse and analyze the source to extract the stored fields. To turn off realtime behavior, set the `realtime` parameter to false. **Source filtering** By default, the API returns the contents of the `_source` field unless you have used the `stored_fields` parameter or the `_source` field is turned off. You can turn off `_source` retrieval by using the `_source` parameter: ``` GET my-index-000001/_doc/0?_source=false ``` If you only need one or two fields from the `_source`, use the `_source_includes` or `_source_excludes` parameters to include or filter out particular fields. This can be helpful with large documents where partial retrieval can save on network overhead Both parameters take a comma separated list of fields or wildcard expressions. For example: ``` GET my-index-000001/_doc/0?_source_includes=*.id&_source_excludes=entities ``` If you only want to specify includes, you can use a shorter notation: ``` GET my-index-000001/_doc/0?_source=*.id ``` **Routing** If routing is used during indexing, the routing value also needs to be specified to retrieve a document. For example: ``` GET my-index-000001/_doc/2?routing=user1 ``` This request gets the document with ID 2, but it is routed based on the user. The document is not fetched if the correct routing is not specified. **Distributed** The GET operation is hashed into a specific shard ID. It is then redirected to one of the replicas within that shard ID and returns the result. The replicas are the primary shard and its replicas within that shard ID group. This means that the more replicas you have, the better your GET scaling will be. **Versioning support** You can use the `version` parameter to retrieve the document only if its current version is equal to the specified one. Internally, Elasticsearch has marked the old document as deleted and added an entirely new document. The old version of the document doesn't disappear immediately, although you won't be able to access it. Elasticsearch cleans up deleted documents in the background as you continue to index more data.

## Method Signature

```typescript
client.get(this: That, params: T.GetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`GetRequest`](../types/GetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.GetResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
