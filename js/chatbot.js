/* ===================================================
   BİLEŞİM KİMYA - Akıllı Chatbot
   Sektör bilgisi tabanlı, keyword eşleştirmeli
   =================================================== */

(function () {

    /* ---------- VERİ TABANI ---------- */
    const KB = [
        {
            keys: ['merhaba','selam','iyi günler','günaydın','iyi akşamlar','hey','hi','hello'],
            answer: '👋 Merhaba! Ben Bileşim Kimya\'nın dijital asistanıyım. Size nasıl yardımcı olabilirim?\n\nÜretim, Private Label, markalarımız, sertifikalar veya ihracat hakkında bilgi alabilirsiniz.'
        },
        {
            keys: ['private label','fason','fason üretim','özel üretim','fason dolum','white label'],
            answer: '🏭 **Private Label Hizmetlerimiz:**\n\nBileşim Kimya olarak markanıza özel formülasyonlarla, ürün geliştirmeden doluma kadar tüm süreçlerde fason üretim gerçekleştiriyoruz.\n\n✅ Minimum sipariş miktarları esnektir\n✅ Özel formülasyon & reçete geliştirme\n✅ GMP standartlarında üretim\n✅ Etiket & ambalaj tasarımı desteği\n✅ Teslimat garantisi\n\nDetay için B2B Teklif Al butonunu kullanabilirsiniz.'
        },
        {
            keys: ['sertifika','iso','gmp','kalite belgesi','belge','standart','akreditasyon'],
            answer: '🏆 **Kalite Sertifikalarımız:**\n\n📋 ISO 9001:2015 — Kalite Yönetim Sistemi\n🌱 ISO 14001:2015 — Çevre Yönetim Sistemi\n⛑️ ISO 45001:2018 — İş Sağlığı & Güvenliği\n💄 ISO 22716:2013 — GMP İyi Üretim Uygulamaları\n\nTüm sertifikalar Kalite & Standartlar sayfasından indirilebilir.'
        },
        {
            keys: ['kapasite','ton','üretim kapasitesi','kaç ton','yıllık üretim'],
            answer: '⚙️ **Üretim Kapasitemiz:**\n\nYıllık **120.000 ton** üretim kapasitesiyle faaliyet gösteriyoruz. Tam otomasyonlu dolum hatlarımız sayesinde yüksek hacimli siparişleri karşılamak mümkündür.\n\n🔹 Çoklu üretim hatları\n🔹 Otomatik dolum & paketleme\n🔹 Soğuk & sıcak proses imkânı'
        },
        {
            keys: ['ihracat','ülke','global','yurt dışı','export','hangi ülke','kaç ülke'],
            answer: '🌍 **Global Ağımız:**\n\n70\'den fazla ülkeye ihracat yapıyoruz.\n\n🇪🇺 Avrupa\n🌙 Orta Doğu & Kuzey Afrika\n🌿 BDT Cumhuriyetleri\n🌏 Asya Pasifik\n\nÖzel gümrükleme, ihracat dokümantasyonu (CoA, MSDS, Sağlık Sertifikası) ve lojistik çözümler sunuyoruz.'
        },
        {
            keys: ['sio','sıo'],
            answer: '🫧 **Sio — Kişisel Bakım Markamız:**\n\nSio, kişisel bakım ve hijyen ürünleri kategorisinde premium kalite sunan markamızdır. Şampuan, duş jeli, el sabunu ve cilt bakım ürünlerini kapsar.\n\nDetay için Markalar sayfasını ziyaret edebilirsiniz.'
        },
        {
            keys: ['biotol','biyotol'],
            answer: '🌿 **Biotol — Temizlik Markamız:**\n\nBiotol, ev temizlik ürünleri kategorisinde çevre dostu ve yüksek performanslı formülasyonlar sunan markamızdır. Bulaşık, çamaşır ve yüzey temizleyiciler içerir.'
        },
        {
            keys: ['vione','vıone'],
            answer: '✨ **Vione — Premium Ev Bakım:**\n\nVione, premium ev bakım ürünleri segmentinde yer alan markamızdır. Fonksiyonel estetik ve üstün hijyen performansını bir arada sunar.'
        },
        {
            keys: ['v-one','v one','v1','vone'],
            answer: '💼 **V-One — Endüstriyel Hijyen:**\n\nV-One, endüstriyel ve kurumsal hijyen çözümleri sunan B2B odaklı markamızdır. Hastane, otel, restoran ve fabrika uygulamaları için geliştirilmiştir.'
        },
        {
            keys: ['arge','ar-ge','araştırma','laboratuvar','formülasyon','reçete'],
            answer: '🔬 **Ar-Ge & İnovasyon Merkezimiz:**\n\nDeneyimli kimyager ve mühendislerden oluşan ekibimizle:\n\n🧪 Özel formülasyon geliştirme\n📊 Mikrobiyolojik & kimyasal analiz\n🌡️ Stabilite & iklim testleri\n🌱 Yeşil kimya & eko-optimizasyon\n\nFikrinizi ürüne dönüştürmek için bize ulaşın.'
        },
        {
            keys: ['hammadde','tedarik','tedarikçi','ham madde'],
            answer: '📦 **Hammadde & Tedarik:**\n\nBileşim Kimya, uluslararası onaylı tedarikçilerden temin ettiği yüksek saflıkta hammaddelerle üretim yapar. Tüm girdiler giriş kalite kontrolünden geçirilir ve CoA (Analiz Sertifikası) ile belgelendirilir.'
        },
        {
            keys: ['temizlik','deterjan','çamaşır','bulaşık','yüzey','hijyen','dezenfektan'],
            answer: '🧴 **Temizlik Ürünleri Kategorimiz:**\n\n✅ Ev temizlik ürünleri (deterjan, yumuşatıcı, çamaşır suyu)\n✅ Kişisel hijyen ürünleri (sıvı sabun, el dezenfektanı)\n✅ Endüstriyel temizleyiciler\n✅ Kurumsal & hastane hijyeni\n\nPrivate Label olarak markanız altında üretebiliriz.'
        },
        {
            keys: ['kozmetik','şampuan','saç','cilt','bakım','losyon','krem','jel'],
            answer: '💄 **Kozmetik & Kişisel Bakım:**\n\nISO 22716 (GMP) sertifikalı tesisimizde üretiyoruz:\n\n🧴 Şampuan & saç bakım\n🚿 Duş jeli & vücut losyonu\n🤲 El ve cilt bakım kremleri\n💧 Misel su & tonik\n\nÖzel formülasyon ve markalama için teklif alabilirsiniz.'
        },
        {
            keys: ['sürdürülebilir','çevre','eko','geri dönüşüm','doğa','yeşil','organik'],
            answer: '🌱 **Sürdürülebilirlik Yaklaşımımız:**\n\nBileşim Kimya olarak:\n\n♻️ %100 geri dönüştürülebilir ambalaj geçişi\n🌿 Doğada çözünebilir formülasyonlar\n💧 Su tasarruflu üretim prosesleri\n🌍 Karbon ayak izi azaltımı\n\nÇevre taahhüdümüz ISO 14001 sertifikamızla güvence altındadır.'
        },
        {
            keys: ['fiyat','teklif','b2b','sipariş','alım','satın','kontrat','anlaşma','minimum'],
            answer: '💬 **B2B Teklif & Fiyatlandırma:**\n\nFiyatlar; ürün kategorisi, miktar, ambalaj ve formülasyon gereksinimlerine göre şekillenmektedir.\n\n📋 Teklif almak için:\n1️⃣ Sağ üstteki "B2B Teklif Al" butonuna tıklayın\n2️⃣ veya iletisim.html sayfamızı ziyaret edin\n3️⃣ Ekibimiz 24 saat içinde dönüş yapar.'
        },
        {
            keys: ['iletişim','telefon','mail','eposta','adres','konum','nerede','lokasyon'],
            answer: '📍 **İletişim Bilgilerimiz:**\n\n🏭 Bileşim Kimya A.Ş.\n📍 İstanbul, Türkiye\n\n🌐 Web: bilesimkimya.com\n\nYa da üst menüdeki "B2B Teklif Al" butonuyla bize formsuz ulaşabilirsiniz.'
        },
        {
            keys: ['personel','çalışan','ekip','kadro','insan kaynakları'],
            answer: '👥 **İnsan Kaynağımız:**\n\n250\'den fazla uzman çalışanımızla hizmet veriyoruz:\n\n🔬 Kimyager & Ar-Ge mühendisleri\n⚙️ Üretim & kalite uzmanları\n🚛 Lojistik & ihracat ekibi\n📊 Satış & müşteri ilişkileri'
        },
        {
            keys: ['tecrübe','deneyim','kaç yıl','kuruluş','ne zaman','tarih','yıl'],
            answer: '📅 **Kurumsal Geçmişimiz:**\n\nBileşim Kimya, 20 yılı aşkın tecrübesiyle Türkiye\'nin öncü kimya ve kozmetik üretim tesislerinden biridir.\n\nSektördeki derin bilgi birikimimizi, modern teknoloji ve inovasyon anlayışıyla harmanlıyoruz.'
        },
        {
            keys: ['ambalaj','şişe','kap','etiket','paketleme','dolum'],
            answer: '📦 **Ambalaj & Dolum Seçenekleri:**\n\n🔹 50 ml — 5 litre bireysel ambalaj\n🔹 5 — 200 litre endüstriyel variller\n🔹 IBC konteyner dolumu\n🔹 Özel etiket & baskı hizmetleri\n🔹 Çevre dostu geri dönüştürülebilir ambalajlar'
        },
    ];

    const QUICK_REPLIES = [
        'Private Label nedir?',
        'Sertifikalarınız neler?',
        'Üretim kapasiteniz?',
        'Hangi ülkelere ihracat yapıyorsunuz?',
        'Fiyat teklifi almak istiyorum',
        'Markalarınız hakkında bilgi',
    ];

    const FALLBACK = '🤔 Bu konuda size daha iyi yardımcı olmak isterim. Lütfen sorunuzu biraz daha detaylandırır mısınız?\n\nYa da doğrudan ekibimizle iletişime geçebilirsiniz → <a href="iletisim.html" style="color:#010f2d;font-weight:700;">İletişim Sayfası</a>';

    /* ---------- CEVAP BULUCU ---------- */
    function findAnswer(text) {
        const t = text.toLowerCase().replace(/[?!.,]/g, '');
        for (const entry of KB) {
            if (entry.keys.some(k => t.includes(k))) return entry.answer;
        }
        return FALLBACK;
    }

    /* ---------- HTML OLUŞTUR ---------- */
    function buildHTML() {
        // Toggle button
        const toggle = document.createElement('button');
        toggle.id = 'bk-chat-toggle';
        toggle.setAttribute('aria-label', 'Chatbot aç');
        toggle.innerHTML = `<i class="ph ph-chat-dots chat-icon"></i><i class="ph ph-x close-icon"></i>`;
        document.body.appendChild(toggle);

        // Panel
        const panel = document.createElement('div');
        panel.id = 'bk-chat-panel';
        panel.innerHTML = `
            <div class="bk-chat-header">
                <div class="bk-chat-avatar"><i class="ph ph-robot"></i></div>
                <div class="bk-chat-header-info">
                    <h4>Bileşim Kimya Asistanı</h4>
                    <span><span class="bk-status-dot"></span>Çevrimiçi — Hemen yanıt verir</span>
                </div>
            </div>
            <div class="bk-chat-messages" id="bkMessages"></div>
            <div class="bk-quick-replies" id="bkQuickReplies"></div>
            <div class="bk-chat-input">
                <input type="text" id="bkInput" placeholder="Sorunuzu yazın..." autocomplete="off" maxlength="200">
                <button class="bk-send-btn" id="bkSend" aria-label="Gönder"><i class="ph ph-paper-plane-tilt"></i></button>
            </div>
            <div class="bk-chat-footer">🔒 Bileşim Kimya tarafından güvenli şekilde işlenmektedir.</div>
        `;
        document.body.appendChild(panel);

        return { toggle, panel };
    }

    /* ---------- MESAJ EKLEYİCİ ---------- */
    function appendMsg(container, text, role) {
        const wrap = document.createElement('div');
        wrap.className = `bk-msg ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'bk-msg-avatar';
        avatar.innerHTML = role === 'bot'
            ? '<i class="ph ph-robot"></i>'
            : '<i class="ph ph-user"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'bk-msg-bubble';
        // Convert ** markdown bold and newlines
        bubble.innerHTML = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        container.appendChild(wrap);
        container.scrollTop = container.scrollHeight;
    }

    /* ---------- YAZMA EFEKTİ ---------- */
    function showTyping(container) {
        const wrap = document.createElement('div');
        wrap.className = 'bk-msg bot';
        wrap.id = 'bk-typing-ind';

        const avatar = document.createElement('div');
        avatar.className = 'bk-msg-avatar';
        avatar.innerHTML = '<i class="ph ph-robot"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'bk-msg-bubble';
        bubble.innerHTML = '<div class="bk-typing"><span></span><span></span><span></span></div>';

        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        container.appendChild(wrap);
        container.scrollTop = container.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('bk-typing-ind');
        if (el) el.remove();
    }

    /* ---------- BAŞLAT ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        const { toggle, panel } = buildHTML();
        const msgArea   = document.getElementById('bkMessages');
        const input     = document.getElementById('bkInput');
        const sendBtn   = document.getElementById('bkSend');
        const qrArea    = document.getElementById('bkQuickReplies');

        // Karşılama mesajı
        setTimeout(() => {
            appendMsg(msgArea, 'Merhaba! 👋 Ben Bileşim Kimya\'nın dijital asistanıyım.\n\nKimya üretimi, Private Label çözümleri, markalarımız ve sertifikalarımız hakkında sorularınızı yanıtlayabilirim.', 'bot');
            buildQuickReplies();
        }, 600);

        // Hızlı cevap butonları
        function buildQuickReplies() {
            qrArea.innerHTML = '';
            QUICK_REPLIES.forEach(q => {
                const btn = document.createElement('button');
                btn.className = 'bk-qr-btn';
                btn.textContent = q;
                btn.addEventListener('click', () => handleSend(q));
                qrArea.appendChild(btn);
            });
        }

        // Gönder
        function handleSend(text) {
            const msg = (text || input.value).trim();
            if (!msg) return;

            appendMsg(msgArea, msg, 'user');
            input.value = '';
            qrArea.innerHTML = ''; // quick reply'leri gizle

            showTyping(msgArea);
            const delay = 800 + Math.random() * 500;
            setTimeout(() => {
                removeTyping();
                appendMsg(msgArea, findAnswer(msg), 'bot');
            }, delay);
        }

        sendBtn.addEventListener('click', () => handleSend());
        input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

        // Aç/kapat
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) input.focus();
        });
    });

})();
