document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen form dengan id 'bmiform'
    const bmiForm = document.getElementById('bmiform');

    // Membuat elemen div untuk menampilkan hasil BMI
    const resultElement = document.createElement('div');
    bmiForm.parentElement.appendChild(resultElement);

    // Menambahkan event listener untuk form submission
    bmiForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Mengambil nilai berat dan tinggi dari input form
        const weight = parseFloat(document.getElementById('weight').value);
        const heightInCm = parseFloat(document.getElementById('height').value);
        const heightInM = heightInCm / 100; // Konversi tinggi dari cm ke m

        if (!isNaN(weight) && !isNaN(heightInM) && heightInM > 0) {
            const bmi = calculateBMI(weight, heightInM); // Menghitung BMI
            const categoryInfo = getBMICategory(bmi); // Mendapatkan kategori BMI dan deskripsi

            //Menampilkan hasil BMI beserta kategori dan deskripsi
            resultElement.innerHTML = `
                <div id="bmi-result">
                    <h3 class="hasil-bmi">Hasil BMI Anda</h3>
                    <div class="bmi-value">${bmi.toFixed(2)}</div>
                    <div class="bmi-category">${categoryInfo.category}</div>
                    <p class="bmi-description">${categoryInfo.description}</p>
                </div>
            `;
        } else {
            // Menampilkan pesan error jika nilai tidak valid
            resultElement.innerHTML = `
                <div class="kalkulator">
                    <p class="error-message">Masukkan nilai berat dan tinggi yang valid.</p>
                </div>
            `;
        }
    });

    // Menambahkan event listener untuk tombol reset
    bmiForm.addEventListener('reset', function(){
        resultElement.innerHTML = ''; // Mengosongkan isi dari resultElement
    });

    // Fungsi untuk menghitung BMI
    function calculateBMI(weight, height) {
        return weight / (height * height);
    }

    // Fungsi untuk mendapatkan kategori BMI dan deskripsi berdasarkan nilai BMI
    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return {
                category: 'Kekurangan Berat Badan',
                description: 'Anda termasuk dalam kategori kekurangan berat badan, dianjurkan untuk mempertahankan pola makan yang sehat.'
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                category: 'Normal (Ideal)',
                description: 'Anda termasuk dalam kategori berat badan normal (ideal), pertahankan gaya hidup sehat.'
            };
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return {
                category: 'Kelebihan Berat Badan',
                description: 'Anda termasuk dalam kategori kelebihan berat badan, dianjurkan untuk rajin olahraga dan perbaiki pola makan.'
            };
        } else {
            return {
                category: 'Kegemukan (Obesitas)',
                description: 'Anda termasuk dalam kategori kegemukan (obesitas), berisiko lebih tinggi untuk berbagai penyakit seperti diabetes, tekanan darah tinggi, dan penyakit jantung. Konsultasikan dengan dokter untuk perencanaan pengelolaan berat badan.'
            };
        }
    }
});
