# Client.synonyms.deleteSynonym

Delete a synonym set. You can only delete a synonyms set that is not in use by any index analyzer. Synonyms sets can be used in synonym graph token filters and synonym token filters. These synonym filters can be used as part of search analyzers. Analyzers need to be loaded when an index is restored (such as when a node starts, or the index becomes open). Even if the analyzer is not used on any field mapping, it still needs to be loaded on the index recovery phase. If any analyzers cannot be loaded, the index becomes unavailable and the cluster status becomes red or yellow as index shards are not available. To prevent that, synonyms sets that are used in analyzers can't be deleted. A delete request in this case will return a 400 response code. To remove a synonyms set, you must first remove all indices that contain analyzers using it. You can migrate an index by creating a new index that does not contain the token filter with the synonyms set, and use the reindex API in order to copy over the index data. Once finished, you can delete the index. When the synonyms set is not used in analyzers, you will be able to delete it.

## Method Signature

```typescript
client.synonyms.deleteSynonym(this: That, params: T.SynonymsDeleteSynonymRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SynonymsDeleteSynonymResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SynonymsDeleteSynonymRequest`](../types/SynonymsDeleteSynonymRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SynonymsDeleteSynonymResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
