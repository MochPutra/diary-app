// Mendukung URL remote (string) maupun gambar lokal (hasil require)
export const toSource = (img) => (typeof img === 'string' ? { uri: img } : img);
