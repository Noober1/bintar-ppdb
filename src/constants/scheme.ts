const schemeErrorMessage = {
  INVALID_EMAIL_FORMAT: "Format email tidak valid",
  INVALID_TYPE: "Tipe data invalid",
  INVALID_TYPE_NUM: "Data harus berupa angka",
  EMPTY_EMAIL: "Email tidak boleh kosong",
  EMPTY_PASSWORD: "Kata sandi tidak boleh kosong",
  MISMATCH_PASSWORD: "Kata sandi tidak sama",
  EMPTY_DATA: "Data tidak boleh kosong",
  INVALID_GRANTED_ACCESS: "Hak akses invalid",
  INVALID_REGISTRATION_FORMAT:
    "Format nomor registrasi invalid, harus mengandung text [Y] dan [N]. Kosongkan jika ingin menggunakan format bawaan.",
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
