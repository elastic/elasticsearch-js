## Interface `BulkWriteOperation`

| Name | Type | Description |
| - | - | - |
| `dynamic_templates` | Record<string, string> | A map from the full name of fields to the name of dynamic templates. It defaults to an empty map. If a name matches a dynamic template, that template will be applied regardless of other match predicates defined in the template. If a field is already defined in the mapping, then this parameter won't be used. |
| `pipeline` | string | The ID of the pipeline to use to preprocess incoming documents. If the index has a default ingest pipeline specified, setting the value to `_none` turns off the default ingest pipeline for this request. If a final pipeline is configured, it will always run regardless of the value of this parameter. |
| `require_alias` | boolean | If `true`, the request's actions must target an index alias. |
