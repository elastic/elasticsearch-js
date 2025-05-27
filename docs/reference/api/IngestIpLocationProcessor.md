## Interface `IngestIpLocationProcessor`

| Name | Type | Description |
| - | - | - |
| `database_file` | string | The database filename referring to a database the module ships with (GeoLite2-City.mmdb, GeoLite2-Country.mmdb, or GeoLite2-ASN.mmdb) or a custom database in the ingest-geoip config directory. |
| `download_database_on_pipeline_creation` | boolean | If `true` (and if `ingest.geoip.downloader.eager.download` is `false`), the missing database is downloaded when the pipeline is created. Else, the download is triggered by when the pipeline is used as the `default_pipeline` or `final_pipeline` in an index. |
| `field` | [Field](./Field.md) | The field to get the ip address from for the geographical lookup. |
| `first_only` | boolean | If `true`, only the first found IP location data will be returned, even if the field contains an array. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `properties` | string[] | Controls what properties are added to the `target_field` based on the IP location lookup. |
| `target_field` | [Field](./Field.md) | The field that will hold the geographical information looked up from the MaxMind database. |
