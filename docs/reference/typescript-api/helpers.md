# Client.helpers

The `Client.helpers` namespace provides utility methods for common operations.

## Available Helpers

### bulk

Bulk indexing helper for efficiently indexing large amounts of data.

```typescript
const result = await client.helpers.bulk({
  datasource: documents,
  onDocument: (doc) => ({ index: { _index: 'my-index' } }),
  onDrop: (doc) => console.log('Dropped:', doc)
});
```

### search

Search helper with advanced options.

### scrollSearch

Scroll search helper for retrieving large result sets.

### scrollDocuments

Scroll documents helper for iterating through all documents.

## See Also

- [Client](./client.md)
- [Helper Documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-helpers.html)
