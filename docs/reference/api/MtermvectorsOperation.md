# `MtermvectorsOperation` [interface-MtermvectorsOperation]

| Name | Type | Description |
| - | - | - |
| `_id` | [Id](./Id.md) | The ID of the document. |
| `_index` | [IndexName](./IndexName.md) | The index of the document. |
| `doc` | any | An artificial document (a document not present in the index) for which you want to retrieve term vectors. |
| `field_statistics` | boolean | If `true`, the response includes the document count, sum of document frequencies, and sum of total term frequencies. |
| `fields` | [Fields](./Fields.md) | Comma-separated list or wildcard expressions of fields to include in the statistics. Used as the default list unless a specific field list is provided in the `completion_fields` or `fielddata_fields` parameters. |
| `filter` | [TermvectorsFilter](./TermvectorsFilter.md) | Filter terms based on their tf-idf scores. |
| `offsets` | boolean | If `true`, the response includes term offsets. |
| `payloads` | boolean | If `true`, the response includes term payloads. |
| `positions` | boolean | If `true`, the response includes term positions. |
| `routing` | [Routing](./Routing.md) | Custom value used to route operations to a specific shard. |
| `term_statistics` | boolean | If true, the response includes term frequency and document frequency. |
| `version_type` | [VersionType](./VersionType.md) | Specific version type. |
| `version` | [VersionNumber](./VersionNumber.md) | If `true`, returns the document version as part of a hit. |
