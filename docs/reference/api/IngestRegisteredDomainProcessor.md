## Interface `IngestRegisteredDomainProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | Field containing the source FQDN. |
| `ignore_missing` | boolean | If true and any required fields are missing, the processor quietly exits without modifying the document. |
| `target_field` | [Field](./Field.md) | Object field containing extracted domain components. If an empty string, the processor adds components to the document’s root. |
