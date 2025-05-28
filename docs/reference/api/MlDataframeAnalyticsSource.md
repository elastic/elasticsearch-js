# `MlDataframeAnalyticsSource` [interface-MlDataframeAnalyticsSource]

| Name | Type | Description |
| - | - | - |
| `_source` | [MlDataframeAnalysisAnalyzedFields](./MlDataframeAnalysisAnalyzedFields.md) | string[] | Specify `includes` and/or ` excludes patterns to select which fields will be present in the destination. Fields that are excluded cannot be included in the analysis. |
| `index` | [Indices](./Indices.md) | Index or indices on which to perform the analysis. It can be a single index or index pattern as well as an array of indices or patterns. NOTE: If your source indices contain documents with the same IDs, only the document that is indexed last appears in the destination index. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The Elasticsearch query domain-specific language (DSL). This value corresponds to the query object in an Elasticsearch search POST body. All the options that are supported by Elasticsearch can be used, as this object is passed verbatim to Elasticsearch. By default, this property has the following value: { "match_all": { } } . |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | Definitions of runtime fields that will become part of the mapping of the destination index. |
