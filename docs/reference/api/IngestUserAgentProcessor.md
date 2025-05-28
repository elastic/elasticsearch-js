# `IngestUserAgentProcessor` [interface-IngestUserAgentProcessor]

| Name | Type | Description |
| - | - | - |
| `extract_device_type` | boolean | Extracts device type from the user agent string on a best-effort basis. |
| `field` | [Field](./Field.md) | The field containing the user agent string. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `properties` | [IngestUserAgentProperty](./IngestUserAgentProperty.md)[] | Controls what properties are added to `target_field`. |
| `regex_file` | string | The name of the file in the `config/ingest-user-agent` directory containing the regular expressions for parsing the user agent string. Both the directory and the file have to be created before starting Elasticsearch. If not specified, ingest-user-agent will use the `regexes.yaml` from uap-core it ships with. |
| `target_field` | [Field](./Field.md) | The field that will be filled with the user agent details. |
