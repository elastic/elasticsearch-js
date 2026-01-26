# Client.get_source

Get a document's source. Get the source of a document. For example: ``` GET my-index-000001/_source/1 ``` You can use the source filtering parameters to control which parts of the `_source` are returned: ``` GET my-index-000001/_source/1/?_source_includes=*.id&_source_excludes=entities ```

## Method Signature

```typescript
client.get_source(this: That, params: T.GetSourceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetSourceResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`GetSourceRequest`](../types/GetSourceRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.GetSourceResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
