# MlEstimateModelMemoryRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analysis_config?` | [`MlAnalysisConfig`](MlAnalysisConfig.md) | For a list of the properties that you can specify in the
`analysis_config` component of the body of this API. |
| `max_bucket_cardinality?` | `Record<Field, long>` | Estimates of the highest cardinality in a single bucket that is observed
for influencer fields over the time period that the job analyzes data.
To produce a good answer, values must be provided for all influencer
fields. Providing values for fields that are not listed as `influencers`
has no effect on the estimation. |
| `overall_cardinality?` | `Record<Field, long>` | Estimates of the cardinality that is observed for fields over the whole
time period that the job analyzes data. To produce a good answer, values
must be provided for fields referenced in the `by_field_name`,
`over_field_name` and `partition_field_name` of any detectors. Providing
values for other fields has no effect on the estimation. It can be
omitted from the request if no detectors have a `by_field_name`,
`over_field_name` or `partition_field_name`. |
| `body?` | `string | { [key: string]: any } & { analysis_config?: never, max_bucket_cardinality?: never, overall_cardinality?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { analysis_config?: never, max_bucket_cardinality?: never, overall_cardinality?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
