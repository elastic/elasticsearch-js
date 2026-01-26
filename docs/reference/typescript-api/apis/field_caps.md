# Client.field_caps

Get the field capabilities. Get information about the capabilities of fields among multiple indices. For data streams, the API returns field capabilities among the stream’s backing indices. It returns runtime fields like any other field. For example, a runtime field with a type of keyword is returned the same as any other field that belongs to the `keyword` family.

## Method Signature

```typescript
client.field_caps(this: That, params?: T.FieldCapsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FieldCapsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`FieldCapsRequest`](../types/FieldCapsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FieldCapsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
