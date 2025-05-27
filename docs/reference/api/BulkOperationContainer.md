## Interface `BulkOperationContainer`

| Name | Type | Description |
| - | - | - |
| `create` | [BulkCreateOperation](./BulkCreateOperation.md) | Index the specified document if it does not already exist. The following line must contain the source data to be indexed. |
| `delete` | [BulkDeleteOperation](./BulkDeleteOperation.md) | Remove the specified document from the index. |
| `index` | [BulkIndexOperation](./BulkIndexOperation.md) | Index the specified document. If the document exists, it replaces the document and increments the version. The following line must contain the source data to be indexed. |
| `update` | [BulkUpdateOperation](./BulkUpdateOperation.md) | Perform a partial document update. The following line must contain the partial document and update options. |
