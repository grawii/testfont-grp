const fontList = [
    { 
        name: "มนตรา (GRP Mantra)", 
        price: "89.-",
        mapping: {
            "บาง": "grp01-thin",
            "ปกติ": "grp01-reg",
            "หนา": "grp01-bold"
        },
        weights: ["บาง", "ปกติ", "หนา"],
        styles: [] // ไม่มีสไตล์พิเศษ
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
        styles: [] 
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
    { 
        name: "ป๊อกกี้ (GRP Pocky)", 
        price: "89.-",
        // หมวดกลวงๆ ที่ระบุชื่อฟอนต์จาก CSS ไว้
        mapping: {
            "บาง": "pocky-thin",
            "ปกติ": "pocky-reg",
            "หนา": "pocky-bold",
            "3D": "pocky-3d"
        },
        weights: ["บาง", "ปกติ", "หนา"],
        styles: ["ปกติ", "3D", "โปร่ง"]
    }
    // ฟอนต์อื่นๆ ก็ทำ mapping แบบเดียวกันครับ
];

];
