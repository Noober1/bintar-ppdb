const schemeErrorMessage = {
  INVALID_EMAIL_FORMAT: "Format email tidak valid",
  EMPTY_EMAIL: "Email tidak boleh kosong",
  EMPTY_PASSWORD: "Kata sandi tidak boleh kosong",
  EMPTY_DATA: "Data tidak boleh kosong",
  INVALID_GRANTED_ACCESS: "Hak akses invalid",
  INVALID_MINLENGTH: (length: number) =>
    `Panjang karakter tidak valid, minimal ${length} karakter`,
  INVALID_MAXLENGTH: (length: number) =>
    `Panjang karakter tidak valid, maksimal ${length} karakter`,
  INVALID_NUM_MIN: (length: number) =>
    `Angka tidak valid, angka minimal ${length}`,
  INVALID_NUM_MAX: (length: number) =>
    `Angka tidak valid, angka maksimal ${length}`,
};

export default schemeErrorMessage;
