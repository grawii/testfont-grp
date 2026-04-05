let cart = [];
let currentWeight = "ปกติ";
let currentStyle = "ปกติ";

document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const weightButtons = document.getElementById('weightButtons');
    const styleButtons = document.getElementById('styleButtons');
    const displayText = document.getElementById('displayText');
    const priceLabel = document.getElementById('priceLabel');

    // --- ส่วนที่แก้ไข: ระบบ Render ฟอนต์ให้รองรับ 3D และน้ำหนักต่างๆ ---
    function renderPreview() {
        const font = fontList[fontSelect.value];
        
        // ล้าง Effect เดิมออกก่อน
        displayText.classList.remove('font-outline-mode');
        displayText.style.fontWeight = "normal";
        displayText.style.fontStyle = "normal";

        // เงื่อนไขที่ 1: ถ้าเลือกสไตล์ 3D
        if (currentStyle === "3D") {
            // ดึงชื่อฟอนต์จาก mapping["3D"] (เช่น pocky-3d)
            if (font.mapping["3D"]) {
                displayText.style.fontFamily = font.mapping["3D"];
            }
        } 
        // เงื่อนไขที่ 2: ถ้าเลือกสไตล์ โปร่ง
        else if (currentStyle === "โปร่ง") {
            // ใช้ฟอนต์ตามน้ำหนักที่เลือก (บาง/ปกติ/หนา) + ใส่ Effect เส้นขอบ
            displayText.style.fontFamily = font.mapping[currentWeight];
            displayText.classList.add('font-outline-mode');
        } 
        // เงื่อนไขที่ 3: สไตล์ปกติ
        else {
            // ใช้ฟอนต์ตามน้ำหนักที่เลือก (บาง/ปกติ/หนา)
            displayText.style.fontFamily = font.mapping[currentWeight];
        }
    }

    function updateControls() {
        const font = fontList[fontSelect.value];
        priceLabel.textContent = font.price;

        // สร้างปุ่มน้ำหนัก (บาง, ปกติ, หนา)
        weightButtons.innerHTML = '';
        if (font.weights && font.weights.length > 0) {
            document.getElementById('weightControl').classList.remove('hidden');
            font.weights.forEach(w => {
                const btn = createPill(w, () => {
                    currentWeight = w;
                    renderPreview();
                });
                if (w === currentWeight) btn.classList.add('active');
                weightButtons.appendChild(btn);
            });
        } else {
            document.getElementById('weightControl').classList.add('hidden');
        }

        // สร้างปุ่มลักษณะ (ปกติ, 3D, โปร่ง)
        styleButtons.innerHTML = '';
        if (font.styles && font.styles.length > 0) {
            document.getElementById('styleControl').classList.remove('hidden');
            font.styles.forEach(s => {
                const btn = createPill(s, () => {
                    currentStyle = s;
                    renderPreview();
                });
                if (s === currentStyle) btn.classList.add('active');
                styleButtons.appendChild(btn);
            });
        } else {
            document.getElementById('styleControl').classList.add('hidden');
        }
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

    // --- ระบบตะกร้าและใบเสร็จ (คงเดิม) ---
    window.addToCart = function() {
        const font = fontList[fontSelect.value];
        if (cart.some(item => item.name === font.name)) return alert("มีในตะกร้าแล้วจ้า ♡");
        cart.push({ name: font.name, price: font.price });
        updateCartUI();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    window.updateCartUI = function() {
        document.getElementById('cartCount').textContent = cart.length;
        const cartItems = document.getElementById('cartItems');
        let total = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-xs text-pink-300 py-4 italic">ตะกร้าว่างเปล่าจ้าา ♡</p>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                total += parseInt(item.price);
                cartItems.innerHTML += `
                    <div class="flex justify-between items-center py-2 border-b border-pink-50 text-xs">
                        <div class="flex items-center gap-2">
                            <button onclick="removeFromCart(${index})" class="remove-btn">×</button>
                            <span>${item.name}</span>
                        </div>
                        <b>${item.price}</b>
                    </div>`;
            });
        }
        document.getElementById('totalPrice').textContent = total + ".-";
    };

    window.goToCheckout = function() {
        if (cart.length === 0) return alert("เลือกฟอนต์ก่อนน้าา ♡");
        const receiptList = document.getElementById('receiptList');
        receiptList.innerHTML = '';
        cart.forEach(item => {
            receiptList.innerHTML += `<div class="flex justify-between text-xs"><span>• ${item.name}</span><span>${item.price}</span></div>`;
        });
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('checkoutPage').classList.remove('hidden');
    };

    window.copyAndLine = function() {
        const email = document.getElementById('userEmail').value;
        if (!email) return alert("กรุณากรอก Email ด้วยน้าา ♡");
        let total = 0;
        let fontNames = cart.map(item => { total += parseInt(item.price); return item.name; }).join(', ');
        const textToCopy = `[ สั่งซื้อฟอนต์ GRP House ]\nรายการ: ${fontNames}\nYod: ${total}.-\nEmail: ${email}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("คัดลอกรายละเอียดแล้ว! เตรียมแจ้งใน LINE ได้เลย");
            window.open('https://line.me/R/ti/p/@yourlineid', '_blank'); // อย่าลืมแก้ ID LINE นะองุ่น
        });
    };

    // การตั้งค่าเริ่มต้น (Init)
    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index; opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });

    fontSelect.onchange = () => {
        currentWeight = "ปกติ";
        currentStyle = "ปกติ";
        updateControls();
    };

    // ปรับขนาดเริ่มต้นให้ตัวใหญ่ตามที่องุ่นต้องการ
    document.getElementById('fontSize').value = 80;
    displayText.style.fontSize = '80px';
    document.getElementById('sizeValue').textContent = '80px';

    document.getElementById('fontSize').oninput = (e) => {
        displayText.style.fontSize = e.target.value + 'px';
        document.getElementById('sizeValue').textContent = e.target.value + 'px';
    };

    document.getElementById('textInput').oninput = (e) => {
        displayText.textContent = e.target.value || "ลองพิมพ์ข้อความน้าา ♡";
    };

    window.openCart = () => document.getElementById('cartModal').classList.remove('hidden');
    window.closeCart = () => document.getElementById('cartModal').classList.add('hidden');
    window.closeCheckout = () => document.getElementById('checkoutPage').classList.add('hidden');

    updateControls();
});
