# QueryDslPercolateQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `document?` | `any` | The source of the document being percolated. |
| `documents?` | `any[]` | An array of sources of the documents being percolated. |
| `field` | [`Field`](Field.md) | Field that holds the indexed queries. The field must use the `percolator` mapping type. |
| `id?` | [`Id`](Id.md) | The ID of a stored document to percolate. |
| `index?` | [`IndexName`](IndexName.md) | The index of a stored document to percolate. |
| `name?` | `string` | The suffix used for the `_percolator_document_slot` field when multiple `percolate` queries are specified. |
| `preference?` | `string` | Preference used to fetch document to percolate. |
| `routing?` | [`Routing`](Routing.md) | Routing used to fetch document to percolate. |
| `version?` | [`VersionNumber`](VersionNumber.md) | The expected version of a stored document to percolate. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
