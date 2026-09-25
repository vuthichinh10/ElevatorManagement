const db = require("./database/database");

db.run(
    `INSERT INTO inspections
    (
        elevatorId,
        inspectionDate,
        inspectionUnit,
        result,
        description
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
        "29A1-0001-01",
        "2026-09-20",
        "Trung tâm kiểm định ABC",
        "Đạt",
        "Kiểm tra định kỳ, hệ thống hoạt động bình thường."
    ],
    function (err) {
        if (err) {
            console.error("Lỗi thêm inspection:", err.message);
        } else {
            console.log("Đã thêm inspection mẫu.");
        }

        db.close();
    }
);