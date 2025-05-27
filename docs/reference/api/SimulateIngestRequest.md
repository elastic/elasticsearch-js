## Interface `SimulateIngestRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; pipeline?: never; docs?: never; component_template_substitutions?: never; index_template_substitutions?: never; mapping_addition?: never; pipeline_substitutions?: never; }) | All values in `body` will be added to the request body. |
| `component_template_substitutions` | Record<string, [ClusterComponentTemplateNode](./ClusterComponentTemplateNode.md)> | A map of component template names to substitute component template definition objects. |
| `docs` | [IngestDocument](./IngestDocument.md)[] | Sample documents to test in the pipeline. |
| `index_template_substitutions` | Record<string, [IndicesIndexTemplate](./IndicesIndexTemplate.md)> | A map of index template names to substitute index template definition objects. |
| `index` | [IndexName](./IndexName.md) | The index to simulate ingesting into. This value can be overridden by specifying an index on each document. If you specify this parameter in the request path, it is used for any documents that do not explicitly specify an index argument. |
| `mapping_addition` | [MappingTypeMapping](./MappingTypeMapping.md) | &nbsp; |
| `pipeline_substitutions` | Record<string, [IngestPipeline](./IngestPipeline.md)> | Pipelines to test. If you don’t specify the `pipeline` request path parameter, this parameter is required. If you specify both this and the request path parameter, the API only uses the request path parameter. |
| `pipeline` | [PipelineName](./PipelineName.md) | The pipeline to use as the default pipeline. This value can be used to override the default pipeline of the index. |
| `querystring` | { [key: string]: any; } & { index?: never; pipeline?: never; docs?: never; component_template_substitutions?: never; index_template_substitutions?: never; mapping_addition?: never; pipeline_substitutions?: never; } | All values in `querystring` will be added to the request querystring. |
