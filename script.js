let cart = [];
let currentWeight = "ปกติ";
let currentStyle = "ปกติ";

document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const weightButtons = document.getElementById('weightButtons');
    const styleButtons = document.getElementById('styleButtons');
    const displayText = document.getElementById('displayText');
    const priceLabel = document.getElementById('priceLabel');

    function renderPreview() {
        const font = fontList[fontSelect.value];
        if (!font) return;
        displayText.classList.remove('font-outline-mode');
        let chosen = "";
        if (currentStyle === "3D" && font.mapping["3D"]) {
            chosen = font.mapping["3D"];
        } else {
            chosen = font.mapping[currentWeight] || font.mapping["ปกติ"];
            if (currentStyle === "โปร่ง") displayText.classList.add('font-outline-mode');
        }
        if (chosen) {
            // แก้ไขจุดตาย: ต้องมี ' ' ครอบชื่อฟอนต์ มึงดูดีๆ นะ
            displayText.style.setProperty('font-family', "'" + chosen + "'", 'important');
        }
    }

    function updateControls() {
        const font = fontList[fontSelect.value];
        if (!font) return;
        priceLabel.textContent = font.price;
        weightButtons.innerHTML = '';
        if (font.weights && font.weights.length > 1) {
            document.getElementById('weightControl').classList.remove('hidden');
            font.weights.forEach(w => {
                const btn = createPill(w, () => { currentWeight = w; renderPreview(); });
                if (w === currentWeight) btn.classList.add('active');
                weightButtons.appendChild(btn);
            });
        } else { document.getElementById('weightControl').classList.add('hidden'); }
        styleButtons.innerHTML = '';
        if (font.styles && font.styles.length > 0) {
            document.getElementById('styleControl').classList.remove('hidden');
            font.styles.forEach(s => {
                const btn = createPill(s, () => { currentStyle = s; renderPreview(); });
                if (s === currentStyle) btn.classList.add('active');
                styleButtons.appendChild(btn);
            });
        } else { document.getElementById('styleControl').classList.add('hidden'); }
        renderPreview();
    }

    function createPill(text, callback) {
        const btn = document.createElement('button');
        btn.className = 'pill-btn';
        btn.textContent = text;
        btn.onclick = (e) => {
            const container = e.target.parentElement;
            container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            callback();
        };
        return btn;
    }

    window.addToCart = () => {
        const font = fontList[fontSelect.value];
        if (cart.some(item => item.name === font.name)) return alert("มีในตะกร้าแล้วจ้า ♡");
        cart.push({ name: font.name, price: font.price });
        updateCartUI();
    };
    window.removeFromCart = (i) => { cart.splice(i, 1); updateCartUI(); };
    window.updateCartUI = () => {
        document.getElementById('cartCount').textContent = cart.length;
        const items = document.getElementById('cartItems');
        let total = 0;
        if (cart.length === 0) { items.innerHTML = '<p class="text-center text-xs py-4 italic">ตะกร้าว่างเปล่าจ้าา ♡</p>'; }
        else { items.innerHTML = ''; cart.forEach((item, index) => {
            total += parseInt(item.price);
            items.innerHTML += `<div class="flex justify-between items-center py-2 border-b text-xs"><div class="flex items-center gap-2"><button onclick="removeFromCart(${index})" class="remove-btn">×</button><span>${item.name}</span></div><b>${item.price}</b></div>`;
        }); }
        document.getElementById('totalPrice').textContent = total + ".-";
    };
    window.goToCheckout = () => {
        if (cart.length === 0) return alert("เลือกฟอนต์ก่อนน้าา ♡");
        const list = document.getElementById('receiptList'); list.innerHTML = '';
        cart.forEach(item => { list.innerHTML += `<div class="flex justify-between text-xs"><span>• ${item.name}</span><span>${item.price}</span></div>`; });
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutPage').classList.remove('hidden');
    };
    window.copyAndLine = () => {
        const email = document.getElementById('userEmail').value;
        if (!email) return alert("กรุณากรอก Email ด้วยน้าา ♡");
        let total = 0; let names = cart.map(i => { total += parseInt(i.price); return i.name; }).join(', ');
        const text = `[ สั่งซื้อฟอนต์ GRP House ]\nรายการ: ${names}\nยอดรวม: ${total}.-\nอีเมล: ${email}`;
        navigator.clipboard.writeText(text).then(() => { alert("คัดลอกแล้ว! แจ้งใน LINE ได้เลย"); window.open('https://line.me/R/ti/p/@yourlineid', '_blank'); });
    };

    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index; opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });
    fontSelect.onchange = () => { currentWeight = "ปกติ"; currentStyle = "ปกติ"; updateControls(); };
    document.getElementById('fontSize').oninput = (e) => {
        displayText.style.fontSize = e.target.value + 'px';
        document.getElementById('sizeValue').textContent = e.target.value + 'px';
    };
    document.getElementById('textInput').oninput = (e) => { displayText.textContent = e.target.value || "ลองพิมพ์ข้อความน้าา ♡"; };
    window.openCart = () => document.getElementById('cartModal').classList.remove('hidden');
    window.closeCart = () => document.getElementById('cartModal').classList.add('hidden');
    window.closeCheckout = () => document.getElementById('checkoutPage').classList.add('hidden');
    updateControls();
});
