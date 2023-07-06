const schemeErrorMessage = {
  INVALID_EMAIL_FORMAT: "format email tidak valid",
  EMPTY_EMAIL: "Email tidak boleh kosong",
  EMPTY_PASSWORD: "Kata sandi tidak boleh kosong",
  EMPTY_DATA: "Data tidak boleh kosong",
  INVALID_GRANTED_ACCESS: "Hak akses invalid",
  INVALID_MINLENGTH: (length: number) =>
    `Panjang karakter tidak valid, minimal ${length} karakter`,
  INVALID_MAXLENGTH: (length: number) =>
    `Panjang karakter tidak valid, maksimal ${length} karakter`,
};

export default schemeErrorMessage;
