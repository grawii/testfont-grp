let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const weightControl = document.getElementById('weightControl');
    const styleControl = document.getElementById('styleControl');
    const weightButtons = document.getElementById('weightButtons');
    const styleButtons = document.getElementById('styleButtons');
    const displayText = document.getElementById('displayText');
    const priceLabel = document.getElementById('priceLabel');
    const buyBtn = document.querySelector('.contact-btn');

    // --- 1. ฟังก์ชันจัดการตะกร้า (อัปเดต UI) ---
    window.updateCartUI = function() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const totalPrice = document.getElementById('totalPrice');
        const receiptList = document.getElementById('receiptList');
        
        if(cartCount) cartCount.textContent = cart.length;
        if(cartItems) cartItems.innerHTML = '';
        
        let total = 0;
        cart.forEach((item, index) => {
            const priceNum = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
            total += priceNum;
            if(cartItems) {
                cartItems.innerHTML += `
                    <div class="flex justify-between items-center text-[#8c5a65] py-2 border-b border-pink-50">
                        <div class="flex items-center gap-2 text-xs font-bold">
                            <button onclick="removeFromCart(${index})" class="w-5 h-5 flex items-center justify-center rounded-full bg-pink-100 text-[#ff9eaa]">✕</button>
                            <span>${item.name}</span>
                        </div>
                        <span class="font-bold text-xs">${item.price}</span>
                    </div>
                `;
            }
        });

        if(cart.length === 0 && cartItems) {
            cartItems.innerHTML = '<p class="text-center text-xs text-pink-300 py-4 italic">ตะกร้าว่างเปล่าจ้าา ♡</p>';
        }
        if(totalPrice) totalPrice.textContent = total + ".-";
        if(receiptList) {
            receiptList.innerHTML = cart.map(item => `
                <div class="flex justify-between text-sm py-1"><span>${item.name}</span> <span>${item.price}</span></div>
            `).join('') + `<div class="flex justify-between font-black mt-4 text-lg border-t-2 border-pink-100 pt-2 text-[#8c5a65]"><span>รวมยอดทั้งหมด</span> <span>${total}.-</span></div>`;
        }
    };

    // --- 2. ฟังก์ชันเพิ่มของลงตะกร้า (แบบเช็คซ้ำ) ---
    window.addToCart = function() {
        const font = fontList[fontSelect.value];
        
        // เช็คว่ามีของในตะกร้าหรือยัง
        const isDuplicate = cart.some(item => item.name === font.name);
        if (isDuplicate) {
            alert("มีฟอนต์นี้ในตะกร้าแล้วน้าา ♡");
            return;
        }

        cart.push({ name: font.name, price: font.price });
        updateCartUI();
        
        const icon = document.getElementById('cartIcon');
        if(icon) {
            icon.classList.add('scale-125');
            setTimeout(() => icon.classList.remove('scale-125'), 200);
        }
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // --- 3. ฟังก์ชันเปิด/ปิด หน้าต่างต่างๆ ---
    window.closeCart = () => document.getElementById('cartModal').classList.add('hidden');
    window.goToCheckout = () => {
        if(cart.length === 0) return alert("เลือกฟอนต์ใส่ตะกร้าก่อนน้าา ♡");
        document.getElementById('checkoutPage').classList.remove('hidden');
    };
    window.closeCheckout = () => document.getElementById('checkoutPage').classList.add('hidden');

    window.copyAndLine = function() {
        const email = document.getElementById('userEmail').value;
        if(!email) return alert("องุ่นขออีเมลสำหรับส่งไฟล์หน่อยน้าา");
        let text = "🛒 รายการสั่งซื้อ GRP House\n--------------------------\n";
        cart.forEach((item, i) => text += `${i+1}. ${item.name} (${item.price})\n`);
        text += "--------------------------\n";
        text += `ยอดรวมทั้งหมด: ${document.getElementById('totalPrice').textContent}\n`;
        text += `อีเมลลูกค้า: ${email}\n\n`;
        text += "คัดลอกข้อความนี้แล้วส่งให้แอดมินได้เลยค่ะ ♡";
        navigator.clipboard.writeText(text).then(() => {
            alert("คัดลอกใบเสร็จแล้วค่ะ! กำลังพาไปที่ Line นะคะ");
            window.location.href = "https://line.me/ti/p/@309ranuu";
        });
    };

    // --- 4. จุดที่ทำให้ไอคอนรถเข็นกดได้ (Event Listener) ---
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.onclick = () => {
            document.getElementById('cartModal').classList.remove('hidden');
        };
    }

    if (buyBtn) {
        buyBtn.onclick = (e) => {
            e.preventDefault();
            addToCart();
        };
    }

    // ส่วนของ Font Tester เดิม
    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });

    function updateControls() {
        const font = fontList[fontSelect.value];
        displayText.style.fontFamily = font.family;
        priceLabel.textContent = font.price;

        if (font.features.includes('weight')) {
            weightControl.classList.remove('hidden');
            weightButtons.innerHTML = '';
            font.weights.forEach(w => {
                let label = w;
                if(w === "300") label = "บาง";
                if(w === "normal") label = "ปกติ";
                if(w === "bold") label = "หนา";
                const btn = createPill(label, () => displayText.style.fontWeight = w);
                weightButtons.appendChild(btn);
            });
            weightButtons.firstChild.click();
        } else {
            weightControl.classList.add('hidden');
            displayText.style.fontWeight = 'normal';
        }

        if (font.features.includes('style')) {
            styleControl.classList.remove('hidden');
            styleButtons.innerHTML = '';
            font.styles.forEach(s => {
                const btn = createPill(s === 'outline' ? 'โปร่ง' : 'ปกติ', () => {
                    s === 'outline' ? displayText.classList.add('font-outline') : displayText.classList.remove('font-outline');
                });
                styleButtons.appendChild(btn);
            });
            styleButtons.firstChild.click();
        } else {
            styleControl.classList.add('hidden');
            displayText.classList.remove('font-outline');
        }
    }

    function createPill(text, callback) {
        const btn = document.createElement('button');
        btn.className = 'pill-btn';
        btn.textContent = text;
        btn.onclick = () => {
            btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            callback();
        };
        return btn;
    }

    fontSelect.onchange = updateControls;
    document.getElementById('fontSize').oninput = (e) => {
        const val = e.target.value + 'px';
        displayText.style.fontSize = val;
        document.getElementById('sizeValue').textContent = val;
    };
    document.getElementById('textInput').oninput = (e) => {
        displayText.textContent = e.target.value || "ลองพิมพ์ข้อความ";
    };

    updateControls(); 
});
