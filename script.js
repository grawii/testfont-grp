let cart = [];
let currentWeight = "ปกติ";
let currentStyle = "ปกติ";

document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const weightButtons = document.getElementById('weightButtons');
    const styleButtons = document.getElementById('styleButtons');
    const displayText = document.getElementById('displayText');
    const priceLabel = document.getElementById('priceLabel');

    // 1. ฟังก์ชัน Render ข้อความตามปุ่มที่เลือก
    function renderPreview() {
        const font = fontList[fontSelect.value];
        displayText.classList.remove('font-outline-mode');
        displayText.style.fontWeight = "normal"; // ปิดระบบคำนวณของ Browser

        // ถ้าเลือก 3D ให้ใช้ Font Family สำหรับ 3D โดยเฉพาะ
        if (currentStyle === "3D") {
            displayText.style.fontFamily = font.mapping["3D"];
        } 
        // ถ้าเลือก โปร่ง ให้ใช้ Font ของน้ำหนักปัจจุบันแต่ใส่ CSS Outline
        else if (currentStyle === "โปร่ง") {
            displayText.style.fontFamily = font.mapping[currentWeight];
            displayText.classList.add('font-outline-mode');
        } 
        // กรณีปกติ
        else {
            displayText.style.fontFamily = font.mapping[currentWeight];
        }
    }

    // 2. ฟังก์ชันอัปเดตปุ่มควบคุม
    function updateControls() {
        const font = fontList[fontSelect.value];
        priceLabel.textContent = font.price;

        // สร้างปุ่มน้ำหนัก
        weightButtons.innerHTML = '';
        if (font.weights && font.weights.length > 0) {
            document.getElementById('weightControl').classList.remove('hidden');
            font.weights.forEach(w => {
                const btn = createPill(w, () => {
                    currentWeight = w;
                    renderPreview();
                });
                if (w === "ปกติ") btn.classList.add('active');
                weightButtons.appendChild(btn);
            });
            currentWeight = "ปกติ";
        } else {
            document.getElementById('weightControl').classList.add('hidden');
        }

        // สร้างปุ่มลักษณะ
        styleButtons.innerHTML = '';
        if (font.styles && font.styles.length > 0) {
            document.getElementById('styleControl').classList.remove('hidden');
            font.styles.forEach(s => {
                const btn = createPill(s, () => {
                    currentStyle = s;
                    renderPreview();
                });
                if (s === "ปกติ") btn.classList.add('active');
                styleButtons.appendChild(btn);
            });
            currentStyle = "ปกติ";
        } else {
            document.getElementById('styleControl').classList.add('hidden');
        }

        renderPreview();
    }

    // ฟังก์ชันสร้างปุ่มเม็ดยา
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

    // --- ระบบอื่นๆ (ตะกร้า/ซื้อ) ---
    window.addToCart = function() {
        const font = fontList[fontSelect.value];
        if (cart.some(item => item.name === font.name)) return alert("มีในตะกร้าแล้วจ้า ♡");
        cart.push({ name: font.name, price: font.price });
        updateCartUI();
    };

    window.updateCartUI = function() {
        document.getElementById('cartCount').textContent = cart.length;
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = cart.length ? '' : '<p class="text-center text-xs text-pink-300 py-4 italic">ตะกร้าว่างเปล่าจ้าา ♡</p>';
        let total = 0;
        cart.forEach((item, index) => {
            total += parseInt(item.price);
            cartItems.innerHTML += `<div class="flex justify-between py-2 border-b border-pink-50 text-xs"><span>${item.name}</span><b>${item.price}</b></div>`;
        });
        document.getElementById('totalPrice').textContent = total + ".-";
    };

    // เริ่มต้นระบบ
    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });

    fontSelect.onchange = updateControls;
    document.getElementById('fontSize').oninput = (e) => {
        displayText.style.fontSize = e.target.value + 'px';
        document.getElementById('sizeValue').textContent = e.target.value + 'px';
    };
    document.getElementById('textInput').oninput = (e) => {
        displayText.textContent = e.target.value || "ลองพิมพ์ข้อความ";
    };

    updateControls();
});
