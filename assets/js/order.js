// order.js: populate summary and confirmation sections in order.html
(function () {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const $ = id => document.getElementById(id);

    function updateSummary() {
        const jenis = $('jenis_kue')?.value || '-';
        const jumlah = $('jumlah')?.value || '-';
        const tanggal = $('tanggal_pengambilan')?.value || '-';
        const jam = $('jam_pengambilan')?.value || '-';
        const hiasan = $('hiasan_jumlah')?.value || '0';

        $('summaryJenis') && ($('summaryJenis').textContent = jenis);
        $('summaryJumlah') && ($('summaryJumlah').textContent = jumlah);
        $('summaryTanggal') && ($('summaryTanggal').textContent = tanggal);
        $('summaryJam') && ($('summaryJam').textContent = jam);
        $('summaryHiasan') &&
            ($('summaryHiasan').textContent = hiasan + ' hiasan coklat tulisan');
    }

    function getTotalPrice() {
        let total = 0;
        const cakeSelects = form.querySelectorAll('select[name^="jenis_kue"]');

        cakeSelects.forEach((select, index) => {
            const jenis = select.value;
            const jumlahInput = form.querySelector(
                `input[name="jumlah${index > 0 ? index + 1 : ''}"]`
            );
            const jumlah = parseInt(jumlahInput?.value, 10) || 1;

            let price = 0;
            if (jenis === 'Birthday Cake Biscoff') price = 350000;
            else if (jenis === 'Strawberry Birthday Cake') price = 200000;
            else if (jenis === 'Bento Cakes') price = 80000;
            else if (jenis === 'Butter Matcha Cookies') price = 45000;
            else if (jenis === 'Red Velvet Cookies') price = 45000;
            else if (jenis === 'Cookie Monster Cookies') price = 50000;
            else if (jenis === 'Chunky Brownies Box') price = 180000;
            else if (jenis === 'Almond Flour Chocolate Brownies') price = 145000;
            else if (jenis === 'Matcha Oreo Blondies') price = 130000;
            else if (jenis === 'Tiramisu Cheesecake') price = 75000;
            else if (jenis === 'Oreo Cheesecake') price = 65000;
            else if (jenis === 'Blueberry Cheesecake') price = 60000;

            total += price * jumlah;
        });

        const hiasanJumlah = parseInt($('hiasan_jumlah')?.value, 10) || 0;
        total += hiasanJumlah * 20000;

        return total;
    }

    function updateConfirmation() {
        const nama = $('nama')?.value || '-';
        const telepon = $('telepon')?.value || '-';
        const tanggal = $('tanggal_pengambilan')?.value || '-';
        const jam = $('jam_pengambilan')?.value || '-';
        const hiasan = $('hiasan_jumlah')?.value || '0';

        let jenisList = [];
        let jumlahList = [];

        const cakeSelects = form.querySelectorAll('select[name^="jenis_kue"]');
        cakeSelects.forEach((select, index) => {
            const jenis = select.value;
            const jumlahInput = form.querySelector(
                `input[name="jumlah${index > 0 ? index : ''}"]`
            );
            const jumlah = jumlahInput?.value || '1';

            if (jenis) {
                jenisList.push(jenis);
                jumlahList.push(jumlah + ' pcs');
            }
        });

        $('confirmNama') && ($('confirmNama').textContent = nama);
        $('confirmTelepon') && ($('confirmTelepon').textContent = telepon);
        $('confirmJenis') &&
            ($('confirmJenis').textContent = jenisList.join(', ') || '-');
        $('confirmJumlah') &&
            ($('confirmJumlah').textContent = jumlahList.join(', ') || '-');
        $('confirmTanggal') && ($('confirmTanggal').textContent = tanggal);
        $('confirmJam') && ($('confirmJam').textContent = jam);

        $('confirmHiasan') &&
            (function () {
                const el = $('confirmHiasan');
                if (parseInt(hiasan, 10) > 0) {
                    el.textContent = hiasan + ' hiasan coklat tulisan';
                    el.parentElement.style.display = 'block';
                } else {
                    el.parentElement.style.display = 'none';
                }
            })();

        const total = getTotalPrice();
        $('confirmTotal') &&
            ($('confirmTotal').textContent =
                total > 0 ? 'Rp ' + total.toLocaleString('id-ID') : 'Rp 0');
    }

    form.addEventListener('input', () => {
        updateSummary();
        updateConfirmation();
    });

    form.addEventListener('change', () => {
        updateSummary();
        updateConfirmation();
    });

    let itemCount = 1;

    window.addItem = function () {
        itemCount++;
        const additionalItems = document.getElementById('additionalItems');
        const newRow = document.createElement('div');
        newRow.className = 'row mb-3';
        newRow.innerHTML = `
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Tambahan Pesanan</label>
                <select class="form-select" name="jenis_kue${itemCount}" required>
                    <option value="">-- Pilih Jenis Kue --</option>
                    <option value="Birthday Cake Biscoff">Birthday Cake Biscoff - Rp 350.000</option>
                    <option value="Strawberry Birthday Cake">Strawberry Birthday Cake - Rp 200.000</option>
                    <option value="Bento Cakes">Bento Cakes - Rp 80.000</option>
                    <option value="Butter Matcha Cookies">Butter Matcha Cookies - Rp 45.000</option>
                    <option value="Red Velvet Cookies">Red Velvet Cookies - Rp 45.000</option>
                    <option value="Cookie Monster Cookies">Cookie Monster Cookies - Rp 50.000</option>
                    <option value="Chunky Brownies Box">Chunky Brownies Box - Rp 180.000</option>
                    <option value="Almond Flour Chocolate Brownies">Almond Flour Chocolate Brownies - Rp 145.000</option>
                    <option value="Matcha Oreo Blondies">Matcha Oreo Blondies - Rp 130.000</option>
                    <option value="Tiramisu Cheesecake">Tiramisu Cheesecake - Rp 75.000</option>
                    <option value="Oreo Cheesecake">Oreo Cheesecake - Rp 65.000</option>
                    <option value="Blueberry Cheesecake">Blueberry Cheesecake - Rp 60.000</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Jumlah *</label>
                <input type="number" class="form-control" name="jumlah${itemCount}" min="1" value="1" required>
            </div>
        `;
        additionalItems.appendChild(newRow);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        updateSummary();
        updateConfirmation();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        $('modalNama').textContent = data.nama || '-';
        $('modalTelepon').textContent = data.telepon || '-';
        $('modalEmail').textContent = data.email || '-';
        $('modalTanggal').textContent = data.tanggal_pengambilan || '-';
        $('modalJam').textContent = data.jam_pengambilan || '-';
        $('modalCatatan').textContent = data.catatan || '-';

        const modalItems = $('modalItems');
        modalItems.innerHTML = '';

        const cakeSelects = form.querySelectorAll('select[name^="jenis_kue"]');
        cakeSelects.forEach((select, index) => {
            const jenis = select.value;
            const jumlahInput = form.querySelector(
                `input[name="jumlah${index > 0 ? index : ''}"]`
            );
            const jumlah = jumlahInput?.value || '1';

            if (jenis) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${jenis}:</strong> ${jumlah} pcs`;
                modalItems.appendChild(p);
            }

            if (
                index === cakeSelects.length - 1 &&
                parseInt(data.hiasan_jumlah, 10) > 0
            ) {
                const hiasanP = document.createElement('p');
                hiasanP.innerHTML =
                    `<strong>Hiasan Tambahan:</strong> ${data.hiasan_jumlah} hiasan coklat tulisan`;
                modalItems.appendChild(hiasanP);
            }
        });

        const total = getTotalPrice();
        $('modalTotal').textContent =
            total > 0 ? 'Rp ' + total.toLocaleString('id-ID') : 'Rp 0';

        new bootstrap.Modal(
            document.getElementById('orderSuccessModal')
        ).show();
    });

    updateSummary();
    updateConfirmation();
})();

/* ================= KIRIM KE SPREADSHEET (TIDAK DIUBAH) ================= */

const SPREADSHEET_URL =
    'https://script.google.com/macros/s/AKfycbyXwWxyLjXN0ntYQ_q77OZJuiFx8ZmVL-n471OE5BgtvbnZl1Ku7CoJa9Cm2-O_AwVXzA/exec';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('orderForm');
    if (!form) return;

    form.addEventListener('submit', function () {
        const formData = new FormData(form);
        let items = [];

        form.querySelectorAll('select[name^="jenis_kue"]').forEach((select, index) => {
            const jenis = select.value;
            const jumlah = form.querySelector(
                `input[name="jumlah${index > 0 ? index : ''}"]`
            )?.value || '1';

            if (jenis) items.push(`${jenis} (${jumlah} pcs)`);
        });

        fetch(SPREADSHEET_URL, {
            method: 'POST',
            body: JSON.stringify({
                nama: formData.get('nama'),
                telepon: formData.get('telepon'),
                email: formData.get('email'),
                pesanan: items.join(', '),
                hiasan: formData.get('hiasan_jumlah') || 0,
                tanggal_pengambilan: formData.get('tanggal_pengambilan'),
                jam_pengambilan: formData.get('jam_pengambilan'),
                catatan: formData.get('catatan') || '',
                total:
                    typeof getTotalPrice === 'function'
                        ? getTotalPrice()
                        : 0,
                waktu_submit: new Date().toLocaleString('id-ID')
            }),
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => console.error(err));
    });
});
