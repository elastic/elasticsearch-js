## Interface `MlGetBucketsRequest`

| Name | Type | Description |
| - | - | - |
| `anomaly_score` | [double](./double.md) | Refer to the description for the `anomaly_score` query parameter. |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; timestamp?: never; from?: never; size?: never; anomaly_score?: never; desc?: never; end?: never; exclude_interim?: never; expand?: never; page?: never; sort?: never; start?: never; }) | All values in `body` will be added to the request body. |
| `desc` | boolean | Refer to the description for the `desc` query parameter. |
| `end` | [DateTime](./DateTime.md) | Refer to the description for the `end` query parameter. |
| `exclude_interim` | boolean | Refer to the description for the `exclude_interim` query parameter. |
| `expand` | boolean | Refer to the description for the `expand` query parameter. |
| `from` | [integer](./integer.md) | Skips the specified number of buckets. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `page` | [MlPage](./MlPage.md) | &nbsp; |
| `querystring` | { [key: string]: any; } & { job_id?: never; timestamp?: never; from?: never; size?: never; anomaly_score?: never; desc?: never; end?: never; exclude_interim?: never; expand?: never; page?: never; sort?: never; start?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of buckets to obtain. |
| `sort` | [Field](./Field.md) | Refer to the desription for the `sort` query parameter. |
| `start` | [DateTime](./DateTime.md) | Refer to the description for the `start` query parameter. |
| `timestamp` | [DateTime](./DateTime.md) | The timestamp of a single bucket result. If you do not specify this parameter, the API returns information about all buckets. |
