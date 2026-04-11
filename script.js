let cart = [];
let currentWeight = "ปกติ";
let currentStyle = "ปกติ";

document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const displayText = document.getElementById('displayText');
    
    // ฟังชันเปลี่ยนฟอนต์ (จุดที่เคยพัง)
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
            // แก้ไขจุดตาย: ใส่ Single Quote ครอบชื่อฟอนต์เพื่อให้ Browser รู้จัก
            displayText.style.setProperty('font-family', `'${chosen}'`, 'important');
        }
    }

    // ก๊อปปี้ส่วนที่เหลือ (updateControls, addToCart) ขององุ่นมาวางต่อได้เลยครับ
    // โครงสร้างอื่นถูกหมดแล้ว ผิดแค่การส่งค่าชื่อฟอนต์ไปที่ CSS ครับ
    
    // ... (ส่วนอื่นๆ ขององุ่น)
});
