# SpecUtilsCommonCatQueryParameters

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `format?` | `string` | Specifies the format to return the columnar data in, can be set to
`text`, `json`, `cbor`, `yaml`, or `smile`. |
| `help?` | `boolean` | When set to `true` will output available columns. This option
can't be combined with any other query string option. |
| `v?` | `boolean` | When set to `true` will enable verbose output. |
| `bytes?` | [`Bytes`](Bytes.md) | Sets the units for columns that contain a byte-size value.
Note that byte-size value units work in terms of powers of 1024. For instance `1kb` means 1024 bytes, not 1000 bytes.
If omitted, byte-size values are rendered with a suffix such as `kb`, `mb`, or `gb`, chosen such that the numeric value of the column is as small as possible whilst still being at least `1.0`.
If given, byte-size values are rendered as an integer with no suffix, representing the value of the column in the chosen unit.
Values that are not an exact multiple of the chosen unit are rounded down. |
| `time?` | [`TimeUnit`](TimeUnit.md) | Sets the units for columns that contain a time duration.
If omitted, time duration values are rendered with a suffix such as `ms`, `s`, `m` or `h`, chosen such that the numeric value of the column is as small as possible whilst still being at least `1.0`.
If given, time duration values are rendered as an integer with no suffix.
Values that are not an exact multiple of the chosen unit are rounded down. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
