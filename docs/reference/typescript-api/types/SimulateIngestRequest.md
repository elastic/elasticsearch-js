# SimulateIngestRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | The index to simulate ingesting into.
This value can be overridden by specifying an index on each document.
If you specify this parameter in the request path, it is used for any documents that do not explicitly specify an index argument. |
| `pipeline?` | [`PipelineName`](PipelineName.md) | The pipeline to use as the default pipeline.
This value can be used to override the default pipeline of the index. |
| `merge_type?` | [`SimulateIngestMergeType`](SimulateIngestMergeType.md) | The mapping merge type if mapping overrides are being provided in mapping_addition.
The allowed values are one of index or template.
The index option merges mappings the way they would be merged into an existing index.
The template option merges mappings the way they would be merged into a template. |
| `docs` | `IngestDocument[]` | Sample documents to test in the pipeline. |
| `component_template_substitutions?` | `Record<string, ClusterComponentTemplateNode>` | A map of component template names to substitute component template definition objects. |
| `index_template_substitutions?` | `Record<string, IndicesIndexTemplate>` | A map of index template names to substitute index template definition objects. |
| `mapping_addition?` | [`MappingTypeMapping`](MappingTypeMapping.md) | - |
| `pipeline_substitutions?` | `Record<string, IngestPipeline>` | Pipelines to test.
If you don’t specify the `pipeline` request path parameter, this parameter is required.
If you specify both this and the request path parameter, the API only uses the request path parameter. |
| `body?` | `string | { [key: string]: any } & { index?: never, pipeline?: never, merge_type?: never, docs?: never, component_template_substitutions?: never, index_template_substitutions?: never, mapping_addition?: never, pipeline_substitutions?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, pipeline?: never, merge_type?: never, docs?: never, component_template_substitutions?: never, index_template_substitutions?: never, mapping_addition?: never, pipeline_substitutions?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
