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
        displayText.classList.remove('font-outline-mode');
        
        // บังคับให้ Browser ไม่คิดเอง
        displayText.style.fontWeight = "normal";
        displayText.style.fontStyle = "normal";

        if (currentStyle === "3D") {
            displayText.style.fontFamily = font.mapping["3D"];
        } 
        else if (currentStyle === "โปร่ง") {
            displayText.style.fontFamily = font.mapping[currentWeight];
            displayText.classList.add('font-outline-mode');
        } 
        else {
            displayText.style.fontFamily = font.mapping[currentWeight];
        }
    }

    function updateControls() {
        const font = fontList[fontSelect.value];
        priceLabel.textContent = font.price;

        // Weight Buttons
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
        }

        // Style Buttons
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

    // Global functions for buttons
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
        cart.forEach(item => {
            total += parseInt(item.price);
            cartItems.innerHTML += `<div class="flex justify-between py-2 border-b border-pink-50 text-xs"><span>${item.name}</span><b>${item.price}</b></div>`;
        });
        document.getElementById('totalPrice').textContent = total + ".-";
    };

    window.openCart = () => document.getElementById('cartModal').classList.remove('hidden');
    window.closeCart = () => document.getElementById('cartModal').classList.add('hidden');

    // Init
    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });

    fontSelect.onchange = () => {
        currentWeight = "ปกติ";
        currentStyle = "ปกติ";
        updateControls();
    };
    
    document.getElementById('fontSize').oninput = (e) => {
        displayText.style.fontSize = e.target.value + 'px';
        document.getElementById('sizeValue').textContent = e.target.value + 'px';
    };
    document.getElementById('textInput').oninput = (e) => {
        displayText.textContent = e.target.value || "ลองพิมพ์ข้อความ";
    };

    updateControls();
});
