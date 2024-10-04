export const ErrorMessage = (code: number) => {
  return ErrorCode.find((e) => e.key === code)?.message || "";
};
const ErrorCode = [
  {
    key: -101,
    message: "Đầu vào không hợp lệ",
  },
  {
    key: -99,
    message: "Lỗi không xác định",
  },
  {
    key: -102,
    message: "Không đúng khoảng thời gian mở sự kiện",
  },
  {
    key: -103,
    message: "Bạn đã hết lượt nhận quà",
  },
  {
    key: -104,
    message: "Không đủ lượt quay",
  },
  {
    key: -105,
    message: "Trạng thái log giao dịch không hợp lệ",
  },
  {
    key: -106,
    message: "Giới tính tài khoản nhận khác vật phẩm",
  },
  {
    key: -107,
    message: "Không được tặng Item này",
  },
  {
    key: -108,
    message: "Không đủ lượt vote",
  },
  {
    key: -109,
    message: "Chưa đủ điều kiện nhận mốc tổng lượt tặng quà",
  },
  {
    key: -110,
    message: "Chưa đủ số giao dịch nhận mốc tặng quà",
  },
  {
    key: -112,
    message: "Đã nhận quà",
  },
  {
    key: -113,
    message: "Tài khoản không tồn tại",
  },
];
