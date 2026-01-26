# Client.indices.putMapping

Update field mappings. Add new fields to an existing data stream or index. You can use the update mapping API to: - Add a new field to an existing index - Update mappings for multiple indices in a single request - Add new properties to an object field - Enable multi-fields for an existing field - Update supported mapping parameters - Change a field's mapping using reindexing - Rename a field using a field alias Learn how to use the update mapping API with practical examples in the [Update mapping API examples](https://www.elastic.co/docs/manage-data/data-store/mapping/update-mappings-examples) guide.

## Method Signature

```typescript
client.indices.putMapping(this: That, params: T.IndicesPutMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutMappingRequest`](../types/IndicesPutMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
