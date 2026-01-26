# Client.indices.putIndexTemplate

Create or update an index template. Index templates define settings, mappings, and aliases that can be applied automatically to new indices. Elasticsearch applies templates to new indices based on an wildcard pattern that matches the index name. Index templates are applied during data stream or index creation. For data streams, these settings and mappings are applied when the stream's backing indices are created. Settings and mappings specified in a create index API request override any settings or mappings specified in an index template. Changes to index templates do not affect existing indices, including the existing backing indices of a data stream. You can use C-style `/* *\/` block comments in index templates. You can include comments anywhere in the request body, except before the opening curly bracket. **Multiple matching templates** If multiple index templates match the name of a new index or data stream, the template with the highest priority is used. Multiple templates with overlapping index patterns at the same priority are not allowed and an error will be thrown when attempting to create a template matching an existing index template at identical priorities. **Composing aliases, mappings, and settings** When multiple component templates are specified in the `composed_of` field for an index template, they are merged in the order specified, meaning that later component templates override earlier component templates. Any mappings, settings, or aliases from the parent index template are merged in next. Finally, any configuration on the index request itself is merged. Mapping definitions are merged recursively, which means that later mapping components can introduce new field mappings and update the mapping configuration. If a field mapping is already contained in an earlier component, its definition will be completely overwritten by the later one. This recursive merging strategy applies not only to field mappings, but also root options like `dynamic_templates` and `meta`. If an earlier component contains a `dynamic_templates` block, then by default new `dynamic_templates` entries are appended onto the end. If an entry already exists with the same key, then it is overwritten by the new definition.

## Method Signature

```typescript
client.indices.putIndexTemplate(this: That, params: T.IndicesPutIndexTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutIndexTemplateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutIndexTemplateRequest`](../types/IndicesPutIndexTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutIndexTemplateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
