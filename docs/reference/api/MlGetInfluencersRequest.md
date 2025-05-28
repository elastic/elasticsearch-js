# `MlGetInfluencersRequest` [interface-MlGetInfluencersRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; desc?: never; end?: never; exclude_interim?: never; influencer_score?: never; from?: never; size?: never; sort?: never; start?: never; page?: never; }) | All values in `body` will be added to the request body. |
| `desc` | boolean | If true, the results are sorted in descending order. |
| `end` | [DateTime](./DateTime.md) | Returns influencers with timestamps earlier than this time. The default value means it is unset and results are not limited to specific timestamps. |
| `exclude_interim` | boolean | If true, the output excludes interim results. By default, interim results are included. |
| `from` | [integer](./integer.md) | Skips the specified number of influencers. |
| `influencer_score` | [double](./double.md) | Returns influencers with anomaly scores greater than or equal to this value. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `page` | [MlPage](./MlPage.md) | Configures pagination. This parameter has the `from` and `size` properties. |
| `querystring` | { [key: string]: any; } & { job_id?: never; desc?: never; end?: never; exclude_interim?: never; influencer_score?: never; from?: never; size?: never; sort?: never; start?: never; page?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of influencers to obtain. |
| `sort` | [Field](./Field.md) | Specifies the sort field for the requested influencers. By default, the influencers are sorted by the `influencer_score` value. |
| `start` | [DateTime](./DateTime.md) | Returns influencers with timestamps after this time. The default value means it is unset and results are not limited to specific timestamps. |
