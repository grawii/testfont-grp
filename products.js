const fontList = [
    { 
        name: "มนตรา (GRP Mantra)", 
        price: "89.-",
        mapping: {
            "บาง": "mantra-thin",
            "ปกติ": "mantra-reg",
            "หนา": "mantra-bold"
        },
        weights: ["บาง", "ปกติ", "หนา"],
        styles: ["ปกติ", "โปร่ง"]
    },
    { 
        name: "ไฮสคูล (GRP HighSchool)", 
        price: "129.-",
        mapping: {
            "บาง": "grp02-thin",
            "ปกติ": "grp02-reg",
            "หนา": "grp02-bold"
        },
        weights: ["บาง", "ปกติ", "หนา"],
        styles: ["ปกติ", "โปร่ง"] 
    },
    { 
        name: "พัฟฟี่ป็อป (GRP PuffyPop)", 
        price: "69.-",
        mapping: {
            "ปกติ": "grp03-reg"
        },
        weights: ["ปกติ"],
        styles: ["ปกติ", "โปร่ง"]
    },
// แก้เฉพาะส่วนป๊อกกี้ให้ชื่อตรงกับ CSS ด้านบน
    { 
        name: "ป๊อกกี้ (GRP Pocky)", 
        price: "89.-",
        mapping: {
            "บาง": "PockyThin",
            "ปกติ": "PockyReg",
            "หนา": "PockyBold",
            "3D": "Pocky3D"
        },
        weights: ["บาง", "ปกติ", "หนา"],
        styles: ["ปกติ", "3D", "โปร่ง"]
    }
];
