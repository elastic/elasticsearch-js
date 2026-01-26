# Client.delete

Delete a document. Remove a JSON document from the specified index. NOTE: You cannot send deletion requests directly to a data stream. To delete a document in a data stream, you must target the backing index containing the document. **Optimistic concurrency control** Delete operations can be made conditional and only be performed if the last modification to the document was assigned the sequence number and primary term specified by the `if_seq_no` and `if_primary_term` parameters. If a mismatch is detected, the operation will result in a `VersionConflictException` and a status code of `409`. **Versioning** Each document indexed is versioned. When deleting a document, the version can be specified to make sure the relevant document you are trying to delete is actually being deleted and it has not changed in the meantime. Every write operation run on a document, deletes included, causes its version to be incremented. The version number of a deleted document remains available for a short time after deletion to allow for control of concurrent operations. The length of time for which a deleted document's version remains available is determined by the `index.gc_deletes` index setting. **Routing** If routing is used during indexing, the routing value also needs to be specified to delete a document. If the `_routing` mapping is set to `required` and no routing value is specified, the delete API throws a `RoutingMissingException` and rejects the request. For example: ``` DELETE /my-index-000001/_doc/1?routing=shard-1 ``` This request deletes the document with ID 1, but it is routed based on the user. The document is not deleted if the correct routing is not specified. **Distributed** The delete operation gets hashed into a specific shard ID. It then gets redirected into the primary shard within that ID group and replicated (if needed) to shard replicas within that ID group.

## Method Signature

```typescript
client.delete(this: That, params: T.DeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`DeleteRequest`](../types/DeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.DeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
