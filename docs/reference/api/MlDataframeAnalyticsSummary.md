## Interface `MlDataframeAnalyticsSummary`

| Name | Type | Description |
| - | - | - |
| `_meta` | [Metadata](./Metadata.md) | &nbsp; |
| `allow_lazy_start` | boolean | &nbsp; |
| `analysis` | [MlDataframeAnalysisContainer](./MlDataframeAnalysisContainer.md) | &nbsp; |
| `analyzed_fields` | [MlDataframeAnalysisAnalyzedFields](./MlDataframeAnalysisAnalyzedFields.md) | string[] | &nbsp; |
| `authorization` | [MlDataframeAnalyticsAuthorization](./MlDataframeAnalyticsAuthorization.md) | The security privileges that the job uses to run its queries. If Elastic Stack security features were disabled at the time of the most recent update to the job, this property is omitted. |
| `create_time` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `description` | string | &nbsp; |
| `dest` | [MlDataframeAnalyticsDestination](./MlDataframeAnalyticsDestination.md) | &nbsp; |
| `id` | [Id](./Id.md) | &nbsp; |
| `max_num_threads` | [integer](./integer.md) | &nbsp; |
| `model_memory_limit` | string | &nbsp; |
| `source` | [MlDataframeAnalyticsSource](./MlDataframeAnalyticsSource.md) | &nbsp; |
| `version` | [VersionString](./VersionString.md) | &nbsp; |
