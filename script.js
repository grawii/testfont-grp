document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const weightControl = document.getElementById('weightControl');
    const styleControl = document.getElementById('styleControl');
    const weightButtons = document.getElementById('weightButtons');
    const styleButtons = document.getElementById('styleButtons');
    const displayText = document.getElementById('displayText');
    const priceLabel = document.getElementById('priceLabel');

    // 1. สร้างตัวเลือกฟอนต์
    fontList.forEach((font, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = font.name;
        fontSelect.appendChild(opt);
    });

    // 2. ฟังก์ชันอัปเดต UI ตามฟอนต์ที่เลือก
    function updateControls() {
        const font = fontList[fontSelect.value];
        displayText.style.fontFamily = font.family;
        priceLabel.textContent = font.price;

        // จัดการส่วน Weight
        if (font.features.includes('weight')) {
            weightControl.classList.remove('hidden');
            weightButtons.innerHTML = '';
// หาบรรทัดที่สร้างปุ่ม Weight ใน script.js แล้วปรับตามนี้ครับ
font.weights.forEach(w => {
    let label = w;
    if(w === "lighter") label = "บาง";
    if(w === "normal") label = "ปกติ";
    if(w === "bold") label = "หนา";
    
    const btn = createPill(label, () => displayText.style.fontWeight = w);
    weightButtons.appendChild(btn);
});
            weightButtons.firstChild.click(); // คลิกอันแรกเป็นค่าเริ่มต้น
        } else {
            weightControl.classList.add('hidden');
            displayText.style.fontWeight = 'normal';
        }

        // จัดการส่วน Style (ปกติ/โปร่ง)
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
            // ลบ class active จากกลุ่มเดียวกัน
            btn.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            callback();
        };
        return btn;
    }

    // Event Listeners
    fontSelect.onchange = updateControls;
    document.getElementById('fontSize').oninput = (e) => {
        const val = e.target.value + 'px';
        displayText.style.fontSize = val;
        document.getElementById('sizeValue').textContent = val;
    };
    document.getElementById('textInput').oninput = (e) => {
        displayText.textContent = e.target.value || "ลองพิมพ์ข้อความ";
    };

    updateControls(); // รันครั้งแรก
});
