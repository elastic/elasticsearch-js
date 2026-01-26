# Client.open_point_in_time

Open a point in time. A search request by default runs against the most recent visible data of the target indices, which is called point in time. Elasticsearch pit (point in time) is a lightweight view into the state of the data as it existed when initiated. In some cases, it’s preferred to perform multiple search requests using the same point in time. For example, if refreshes happen between `search_after` requests, then the results of those requests might not be consistent as changes happening between searches are only visible to the more recent point in time. A point in time must be opened explicitly before being used in search requests. A subsequent search request with the `pit` parameter must not specify `index`, `routing`, or `preference` values as these parameters are copied from the point in time. Just like regular searches, you can use `from` and `size` to page through point in time search results, up to the first 10,000 hits. If you want to retrieve more hits, use PIT with `search_after`. IMPORTANT: The open point in time request and each subsequent search request can return different identifiers; always use the most recently received ID for the next search request. When a PIT that contains shard failures is used in a search request, the missing are always reported in the search response as a `NoShardAvailableActionException` exception. To get rid of these exceptions, a new PIT needs to be created so that shards missing from the previous PIT can be handled, assuming they become available in the meantime. **Keeping point in time alive** The `keep_alive` parameter, which is passed to a open point in time request and search request, extends the time to live of the corresponding point in time. The value does not need to be long enough to process all data — it just needs to be long enough for the next request. Normally, the background merge process optimizes the index by merging together smaller segments to create new, bigger segments. Once the smaller segments are no longer needed they are deleted. However, open point-in-times prevent the old segments from being deleted since they are still in use. TIP: Keeping older segments alive means that more disk space and file handles are needed. Ensure that you have configured your nodes to have ample free file handles. Additionally, if a segment contains deleted or updated documents then the point in time must keep track of whether each document in the segment was live at the time of the initial search request. Ensure that your nodes have sufficient heap space if you have many open point-in-times on an index that is subject to ongoing deletes or updates. Note that a point-in-time doesn't prevent its associated indices from being deleted. You can check how many point-in-times (that is, search contexts) are open with the nodes stats API.

## Method Signature

```typescript
client.open_point_in_time(this: That, params: T.OpenPointInTimeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.OpenPointInTimeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`OpenPointInTimeRequest`](../types/OpenPointInTimeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.OpenPointInTimeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
