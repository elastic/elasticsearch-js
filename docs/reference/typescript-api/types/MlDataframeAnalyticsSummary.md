# MlDataframeAnalyticsSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allow_lazy_start?` | `boolean` | - |
| `analysis` | [`MlDataframeAnalysisContainer`](MlDataframeAnalysisContainer.md) | - |
| `analyzed_fields?` | `MlDataframeAnalysisAnalyzedFields | string[]` | - |
| `authorization?` | [`MlDataframeAnalyticsAuthorization`](MlDataframeAnalyticsAuthorization.md) | The security privileges that the job uses to run its queries. If Elastic Stack security features were disabled at the time of the most recent update to the job, this property is omitted. |
| `create_time?` | `EpochTime<UnitMillis>` | - |
| `description?` | `string` | - |
| `dest` | [`MlDataframeAnalyticsDestination`](MlDataframeAnalyticsDestination.md) | - |
| `id` | [`Id`](Id.md) | - |
| `max_num_threads?` | `integer` | - |
| `model_memory_limit?` | `string` | - |
| `source` | [`MlDataframeAnalyticsSource`](MlDataframeAnalyticsSource.md) | - |
| `version?` | [`VersionString`](VersionString.md) | - |
| `_meta?` | [`Metadata`](Metadata.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
