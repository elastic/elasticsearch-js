# `IngestFingerprintProcessor` [interface-IngestFingerprintProcessor]

| Name | Type | Description |
| - | - | - |
| `fields` | [Fields](./Fields.md) | Array of fields to include in the fingerprint. For objects, the processor hashes both the field key and value. For other fields, the processor hashes only the field value. |
| `ignore_missing` | boolean | If true, the processor ignores any missing fields. If all fields are missing, the processor silently exits without modifying the document. |
| `method` | [IngestFingerprintDigest](./IngestFingerprintDigest.md) | The hash method used to compute the fingerprint. Must be one of MD5, SHA-1, SHA-256, SHA-512, or MurmurHash3. |
| `salt` | string | Salt value for the hash function. |
| `target_field` | [Field](./Field.md) | Output field for the fingerprint. |
