# Client.transform.putTransform

Create a transform. Creates a transform. A transform copies data from source indices, transforms it, and persists it into an entity-centric destination index. You can also think of the destination index as a two-dimensional tabular data structure (known as a data frame). The ID for each document in the data frame is generated from a hash of the entity, so there is a unique row per entity. You must choose either the latest or pivot method for your transform; you cannot use both in a single transform. If you choose to use the pivot method for your transform, the entities are defined by the set of `group_by` fields in the pivot object. If you choose to use the latest method, the entities are defined by the `unique_key` field values in the latest object. You must have `create_index`, `index`, and `read` privileges on the destination index and `read` and `view_index_metadata` privileges on the source indices. When Elasticsearch security features are enabled, the transform remembers which roles the user that created it had at the time of creation and uses those same roles. If those roles do not have the required privileges on the source and destination indices, the transform fails when it attempts unauthorized operations. NOTE: You must use Kibana or this API to create a transform. Do not add a transform directly into any `.transform-internal*` indices using the Elasticsearch index API. If Elasticsearch security features are enabled, do not give users any privileges on `.transform-internal*` indices. If you used transforms prior to 7.5, also do not give users any privileges on `.data-frame-internal*` indices.

## Method Signature

```typescript
client.transform.putTransform(this: That, params: T.TransformPutTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformPutTransformResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TransformPutTransformRequest`](../types/TransformPutTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformPutTransformResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
