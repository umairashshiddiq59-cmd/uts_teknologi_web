
// =====================================
// 1. DATA VILA
// =====================================

const daftarVila = [
    {
        id: 1,
        nama: "Vila Permai Garden",
        tipe: "Vila Keluarga",
        lokasi: "Cisarua, Puncak Bogor",
        harga: 500000,
        fasilitas: ["2 Kamar Tidur", "Kolam Renang", "WiFi"],
        tersedia: true,
        kapasitas: 5,
    },
    {
        id: 2,
        nama: "Vila Permai Mountain",
        tipe: "Vila Pegunungan",
        lokasi: "Cipanas, Puncak Bogor",
        harga: 750000,
        fasilitas: ["3 Kamar Tidur", "Dapur", "Parkir"],
        tersedia: true,
        kapasitas: 8,
    },
    {
        id: 3,
        nama: "Vila Permai Family",
        tipe: "Vila Premium",
        lokasi: "Megamendung, Bogor",
        harga: 1000000,
        fasilitas: ["4 Kamar Tidur", "Kolam Renang", "WiFi"],
        tersedia: true,
        kapasitas: 10,
    }
];

// =====================================
// 2. MENGAMBIL ELEMEN HTML
// =====================================

const villaList = document.getElementById("villaList");
const villaSelect = document.getElementById("villa");
const searchVilla = document.getElementById("searchVilla");

const bookingForm = document.getElementById("bookingForm");
const namaInput = document.getElementById("nama");
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const jumlahTamuInput = document.getElementById("jumlahTamu");

const priceSummary = document.getElementById("priceSummary");
const formMessage = document.getElementById("formMessage");
const orderResult = document.getElementById("orderResult");
const checkButton = document.getElementById("checkButton");

// =====================================
// 3. FORMAT RUPIAH
// =====================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// =====================================
// 4. MENAMPILKAN DAFTAR VILA
// =====================================

function tampilkanVila(dataVila) {
    villaList.replaceChildren();

    if (dataVila.length === 0) {
        const pesan = document.createElement("p");
        pesan.textContent = "Vila tidak ditemukan.";
        villaList.appendChild(pesan);
        return;
    }

    dataVila.forEach(vila => {
        const card = document.createElement("article");
        card.className = "villa-card";

        const gambar = document.createElement("div");
        gambar.className = "villa-card__image";
        gambar.textContent = vila.gambar;

        const body = document.createElement("div");
        body.className = "villa-card__body";

        const judul = document.createElement("h3");
        judul.textContent = vila.nama;

        const deskripsi = document.createElement("p");
        deskripsi.className = "villa-card__description";
        deskripsi.textContent = vila.tipe + " • " + vila.lokasi;

        const fasilitas = document.createElement("p");
        fasilitas.className = "villa-card__facilities";
        fasilitas.textContent =
            "Fasilitas: " + vila.fasilitas.join(", ");

        const kapasitas = document.createElement("p");
        kapasitas.className = "villa-card__description";
        kapasitas.textContent =
            "Kapasitas maksimal: " + vila.kapasitas + " orang";

        const harga = document.createElement("p");
        harga.className = "villa-card__price";
        harga.textContent = formatRupiah(vila.harga) + " / malam";

        const status = document.createElement("p");
        status.className = "villa-card__status";
        status.textContent = vila.tersedia
            ? "● Tersedia"
            : "● Tidak tersedia";

        body.append(
            judul,
            deskripsi,
            fasilitas,
            kapasitas,
            harga,
            status
        );

        card.append(gambar, body);
        villaList.appendChild(card);
    });
}

// =====================================
// 5. DROPDOWN VILA OTOMATIS
// =====================================

function isiPilihanVila() {
    daftarVila.forEach(vila => {
        const option = document.createElement("option");

        option.value = vila.id;
        option.textContent =
            vila.nama + " - " + formatRupiah(vila.harga);

        villaSelect.appendChild(option);
    });
}

// =====================================
// 6. PENCARIAN VILA
// =====================================

searchVilla.addEventListener("input", function () {
    const kataKunci = this.value.toLowerCase();

    const hasilPencarian = daftarVila.filter(vila => {
        const informasi =
            vila.nama + " " +
            vila.tipe + " " +
            vila.lokasi + " " +
            vila.fasilitas.join(" ");

        return informasi.toLowerCase().includes(kataKunci);
    });

    tampilkanVila(hasilPencarian);
});

// =====================================
// 7. MENGHITUNG JUMLAH MALAM
// =====================================

function hitungJumlahMalam() {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;

    if (!checkin || !checkout) {
        return 0;
    }

    const tanggalMasuk = new Date(checkin + "T00:00:00");
    const tanggalKeluar = new Date(checkout + "T00:00:00");

    const selisih = tanggalKeluar - tanggalMasuk;

    return Math.round(selisih / (1000 * 60 * 60 * 24));
}

// =====================================
// 8. MENGHITUNG TOTAL HARGA
// =====================================

function hitungTotalHarga() {
    const idVila = Number(villaSelect.value);

    const vila = daftarVila.find(item => item.id === idVila);

    const malam = hitungJumlahMalam();
    const jumlahTamu = Number(jumlahTamuInput.value);

    if (!vila || malam <= 0 || jumlahTamu < 1 || jumlahTamu > 10) {
        priceSummary.replaceChildren();

        const judul = document.createElement("h3");
        judul.textContent = "Ringkasan Biaya";

        const pesan = document.createElement("p");
        pesan.textContent =
            "Lengkapi pilihan vila, tanggal, dan jumlah tamu untuk melihat estimasi biaya.";

        priceSummary.append(judul, pesan);

        return null;
    }

    const total = vila.harga * malam;

    priceSummary.replaceChildren();

    const judul = document.createElement("h3");
    judul.textContent = "Ringkasan Biaya";

    const barisHarga = document.createElement("p");
    barisHarga.className = "price-line";
    barisHarga.textContent =
        "Harga per malam: " + formatRupiah(vila.harga);

    const barisMalam = document.createElement("p");
    barisMalam.className = "price-line";
    barisMalam.textContent = "Jumlah malam: " + malam;

    const barisTamu = document.createElement("p");
    barisTamu.className = "price-line";
    barisTamu.textContent = "Jumlah tamu: " + jumlahTamu;

    const totalHarga = document.createElement("p");
    totalHarga.className = "price-line price-total";
    totalHarga.textContent = "Total: " + formatRupiah(total);

    priceSummary.append(
        judul,
        barisHarga,
        barisMalam,
        barisTamu,
        totalHarga
    );

    return {
        vila,
        malam,
        jumlahTamu,
        total
    };
}

// =====================================
// 9. VALIDASI FORMULIR
// =====================================

function validasiForm() {
    const nama = namaInput.value.trim();
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const jumlahTamu = Number(jumlahTamuInput.value);

    if (!nama) {
        return "Nama lengkap wajib diisi.";
    }

    if (!villaSelect.value) {
        return "Silakan pilih unit vila.";
    }

    if (!checkin || !checkout) {
        return "Tanggal check-in dan check-out wajib diisi.";
    }

    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const tanggalMasuk = new Date(checkin + "T00:00:00");
    const tanggalKeluar = new Date(checkout + "T00:00:00");

    if (tanggalMasuk < hariIni) {
        return "Tanggal check-in tidak boleh di masa lalu.";
    }

    if (tanggalKeluar <= tanggalMasuk) {
        return "Tanggal check-out harus setelah check-in.";
    }

    if (
        !Number.isInteger(jumlahTamu) ||
        jumlahTamu < 1 ||
        jumlahTamu > 10
    ) {
        return "Jumlah tamu harus antara 1 sampai 10 orang.";
    }

    const vila = daftarVila.find(
        item => item.id === Number(villaSelect.value)
    );

    if (!vila || !vila.tersedia) {
        return "Maaf, vila tidak tersedia.";
    }

    if (jumlahTamu > vila.kapasitas) {
        return "Jumlah tamu melebihi kapasitas vila.";
    }

    return "";
}

// =====================================
// 10. UPDATE TOTAL OTOMATIS
// =====================================

[
    villaSelect,
    checkinInput,
    checkoutInput,
    jumlahTamuInput
].forEach(elemen => {
    elemen.addEventListener("change", hitungTotalHarga);
    elemen.addEventListener("input", hitungTotalHarga);
});

// =====================================
// 11. CEK KETERSEDIAAN
// =====================================

checkButton.addEventListener("click", function () {
    formMessage.textContent = "";

    const kesalahan = validasiForm();

    if (kesalahan) {
        formMessage.textContent = kesalahan;
        return;
    }

    const data = hitungTotalHarga();

    if (data) {
        formMessage.textContent =
            "Vila tersedia untuk tanggal yang dipilih. Estimasi biaya sudah ditampilkan.";
        formMessage.style.color = "#237a46";
    }
});

// =====================================
// 12. SIMPAN PESANAN
// =====================================

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.style.color = "#c0392b";
    orderResult.replaceChildren();

    const kesalahan = validasiForm();

    if (kesalahan) {
        formMessage.textContent = kesalahan;
        return;
    }

    const data = hitungTotalHarga();

    if (!data) {
        formMessage.textContent =
            "Periksa kembali tanggal dan pilihan vila.";
        return;
    }

    const pesanan = {
        nama: namaInput.value.trim(),
        namaVila: data.vila.nama,
        checkin: checkinInput.value,
        checkout: checkoutInput.value,
        jumlahTamu: data.jumlahTamu,
        jumlahMalam: data.malam,
        total: data.total,
        tanggalPesanan: new Date().toISOString()
    };

    try {
        const daftarPesanan = JSON.parse(
            localStorage.getItem("pesananVila") || "[]"
        );

        if (!Array.isArray(daftarPesanan)) {
            throw new Error("Format penyimpanan tidak valid.");
        }

        daftarPesanan.push(pesanan);

        localStorage.setItem(
            "pesananVila",
            JSON.stringify(daftarPesanan)
        );

        localStorage.setItem(
            "namaTamuTerakhir",
            pesanan.nama
        );

        const hasil = document.createElement("div");
        const judul = document.createElement("h3");
        judul.textContent = "Pesanan Berhasil Disimpan!";

        const detail = document.createElement("p");
        detail.textContent =
            "Terima kasih, " + pesanan.nama +
            ". Pesanan " + pesanan.namaVila +
            " telah disimpan di perangkat ini. Total: " +
            formatRupiah(pesanan.total) +
            ". Ini merupakan simulasi, bukan konfirmasi reservasi.";

        hasil.append(judul, detail);
        orderResult.appendChild(hasil);

        formMessage.textContent = "";

    } catch (error) {
        formMessage.textContent =
            "Terjadi kesalahan saat menyimpan pesanan. Silakan coba kembali.";

        console.error(error);
    }
});

// =====================================
// 13. MEMUAT NAMA TAMU TERAKHIR
// =====================================

function muatDataTerakhir() {
    try {
        const namaTerakhir = localStorage.getItem(
            "namaTamuTerakhir"
        );

        if (namaTerakhir) {
            namaInput.value = namaTerakhir;
        }
    } catch (error) {
        console.error("Gagal membaca penyimpanan lokal:", error);
    }
}

// =====================================
// 14. MENJALANKAN WEBSITE
// =====================================

function jalankanWebsite() {
    tampilkanVila(daftarVila);
    isiPilihanVila();
    muatDataTerakhir();
}

jalankanWebsite();
