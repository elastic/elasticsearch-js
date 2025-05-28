# `IngestAttachmentProcessor` [interface-IngestAttachmentProcessor]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to get the base64 encoded field from. |
| `ignore_missing` | boolean | If `true` and field does not exist, the processor quietly exits without modifying the document. |
| `indexed_chars_field` | [Field](./Field.md) | Field name from which you can overwrite the number of chars being used for extraction. |
| `indexed_chars` | [long](./long.md) | The number of chars being used for extraction to prevent huge fields. Use `-1` for no limit. |
| `properties` | string[] | Array of properties to select to be stored. Can be `content`, `title`, `name`, `author`, `keywords`, `date`, `content_type`, `content_length`, `language`. |
| `remove_binary` | boolean | If true, the binary field will be removed from the document |
| `resource_name` | string | Field containing the name of the resource to decode. If specified, the processor passes this resource name to the underlying Tika library to enable Resource Name Based Detection. |
| `target_field` | [Field](./Field.md) | The field that will hold the attachment information. |
