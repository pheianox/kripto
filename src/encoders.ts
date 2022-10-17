// import { DataType, Encoder } from "./types"
// import { buildFormatter, buildValidator, toBin, toHex } from "./utils"

// export const BinaryEncoder: Encoder = {
//   target: DataType.Binary,
//   formatter: buildFormatter(8),
//   validator: buildValidator(/^-{0,1}\d+$/g),
//   converter: (data, targetType) => {
//     switch (targetType) {
//       case DataType.PlainText:
//         return data
//       case DataType.Hexadecimal:
//         return toHex(data)
//       case DataType.Binary:
//         return toBin(data)
//     }
//   }
// }

// export const HexadecimalEncoder: Encoder = {
//   target: DataType.Hexadecimal,
//   formatter: buildFormatter(8),
//   validator: buildValidator(/^-{0,1}\d+$/g),
//   converter: (data, targetType) => {
//     switch (targetType) {
//       case DataType.PlainText:
//         return data
//       case DataType.Hexadecimal:
//         return toHex(data)
//       case DataType.Binary:
//         return toBin(data)
//     }
//   }
// }

// export const PlainTextEncoder: Encoder = {
//   target: DataType.PlainText,
//   formatter: data => data.value,
//   validator: () => true,
//   converter: (data, targetType) => {
//     switch (targetType) {
//       case DataType.PlainText:
//         return data
//       case DataType.Hexadecimal:
//         return toHex(data)
//       case DataType.Binary:
//         return toBin(data)
//     }
//   }
// }