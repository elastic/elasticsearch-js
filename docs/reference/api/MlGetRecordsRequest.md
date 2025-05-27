## Interface `MlGetRecordsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; from?: never; size?: never; desc?: never; end?: never; exclude_interim?: never; page?: never; record_score?: never; sort?: never; start?: never; }) | All values in `body` will be added to the request body. |
| `desc` | boolean | Refer to the description for the `desc` query parameter. |
| `end` | [DateTime](./DateTime.md) | Refer to the description for the `end` query parameter. |
| `exclude_interim` | boolean | Refer to the description for the `exclude_interim` query parameter. |
| `from` | [integer](./integer.md) | Skips the specified number of records. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `page` | [MlPage](./MlPage.md) | &nbsp; |
| `querystring` | { [key: string]: any; } & { job_id?: never; from?: never; size?: never; desc?: never; end?: never; exclude_interim?: never; page?: never; record_score?: never; sort?: never; start?: never; } | All values in `querystring` will be added to the request querystring. |
| `record_score` | [double](./double.md) | Refer to the description for the `record_score` query parameter. |
| `size` | [integer](./integer.md) | Specifies the maximum number of records to obtain. |
| `sort` | [Field](./Field.md) | Refer to the description for the `sort` query parameter. |
| `start` | [DateTime](./DateTime.md) | Refer to the description for the `start` query parameter. |
