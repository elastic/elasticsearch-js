## Interface `IngestEnrichProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field in the input document that matches the policies match_field used to retrieve the enrichment data. Supports template snippets. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `max_matches` | [integer](./integer.md) | The maximum number of matched documents to include under the configured target field. The `target_field` will be turned into a json array if `max_matches` is higher than 1, otherwise `target_field` will become a json object. In order to avoid documents getting too large, the maximum allowed value is 128. |
| `override` | boolean | If processor will update fields with pre-existing non-null-valued field. When set to `false`, such fields will not be touched. |
| `policy_name` | string | The name of the enrich policy to use. |
| `shape_relation` | [GeoShapeRelation](./GeoShapeRelation.md) | A spatial relation operator used to match the geoshape of incoming documents to documents in the enrich index. This option is only used for `geo_match` enrich policy types. |
| `target_field` | [Field](./Field.md) | Field added to incoming documents to contain enrich data. This field contains both the `match_field` and `enrich_fields` specified in the enrich policy. Supports template snippets. |
