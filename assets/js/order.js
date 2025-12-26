// ================= ORDER.JS FINAL =================
(function () {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const $ = id => document.getElementById(id);

    function getTotalPrice() {
        let total = 0;
        const cakeSelects = form.querySelectorAll('select[name^="jenis_kue"]');

        cakeSelects.forEach((select, index) => {
            const jenis = select.value;
            const jumlah = parseInt(
                form.querySelector(`input[name="jumlah${index || ''}"]`)?.value || 1
            );

            const prices = {
                'Birthday Cake Biscoff': 350000,
                'Strawberry Birthday Cake': 200000,
                'Bento Cakes': 80000,
                'Butter Matcha Cookies': 45000,
                'Red Velvet Cookies': 45000,
                'Cookie Monster Cookies': 50000,
                'Chunky Brownies Box': 180000,
                'Almond Flour Chocolate Brownies': 145000,
                'Matcha Oreo Blondies': 130000,
                'Tiramisu Cheesecake': 75000,
                'Oreo Cheesecake': 65000,
                'Blueberry Cheesecake': 60000
            };

            total += (prices[jenis] || 0) * jumlah;
        });

        total += (parseInt($('hiasan_jumlah')?.value || 0) * 20000);
        return total;
    }

    let itemCount = 1;

    window.addItem = function () {
        itemCount++;
        document.getElementById('additionalItems').insertAdjacentHTML('beforeend', `
            <div class="row mb-3">
                <div class="col-md-6">
                    <select class="form-select" name="jenis_kue${itemCount}">
                        <option value="">-- Pilih Jenis Kue --</option>
                        <option value="Birthday Cake Biscoff">Birthday Cake Biscoff</option>
                        <option value="Strawberry Birthday Cake">Strawberry Birthday Cake</option>
                        <option value="Bento Cakes">Bento Cakes</option>
                        <option value="Butter Matcha Cookies">Butter Matcha Cookies</option>
                        <option value="Red Velvet Cookies">Red Velvet Cookies</option>
                        <option value="Cookie Monster Cookies">Cookie Monster Cookies</option>
                        <option value="Chunky Brownies Box">Chunky Brownies Box</option>
                        <option value="Almond Flour Chocolate Brownies">Almond Flour Chocolate Brownies</option>
                        <option value="Matcha Oreo Blondies">Matcha Oreo Blondies</option>
                        <option value="Tiramisu Cheesecake">Tiramisu Cheesecake</option>
                        <option value="Oreo Cheesecake">Oreo Cheesecake</option>
                        <option value="Blueberry Cheesecake">Blueberry Cheesecake</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <input type="number" class="form-control" name="jumlah${itemCount}" value="1" min="1">
                </div>
            </div>
        `);
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fd = new FormData(form);
        let items = [];

        form.querySelectorAll('select[name^="jenis_kue"]').forEach((s, i) => {
            if (s.value) {
                const j = form.querySelector(`input[name="jumlah${i || ''}"]`)?.value || 1;
                items.push(`${s.value} (${j} pcs)`);
            }
        });

        // KIRIM KE GOOGLE SHEETS (PRAKTIKUM)
        fetch('hhttps://script.google.com/macros/s/AKfycbyXwWxyLjXN0ntYQ_q77OZJuiFx8ZmVL-n471OE5BgtvbnZl1Ku7CoJa9Cm2-O_AwVXzA/exec', {
            method: 'POST',
            body: new URLSearchParams({
                nama: fd.get('nama'),
                telepon: fd.get('telepon'),
                email: fd.get('email'),
                pesanan: items.join(', '),
                hiasan: fd.get('hiasan_jumlah') || 0,
                tanggal_pengambilan: fd.get('tanggal_pengambilan'),
                jam_pengambilan: fd.get('jam_pengambilan'),
                catatan: fd.get('catatan') || '',
                total: getTotalPrice(),
                waktu_submit: new Date().toLocaleString('id-ID')
            })
        });

        new bootstrap.Modal(document.getElementById('orderSuccessModal')).show();
    });
})();
