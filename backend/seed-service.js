const db = require("./database/database");

db.run(
    `INSERT INTO service_history
    (
        elevatorId,
        technicianId,
        type,
        date,
        description
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
        "29A1-0001-01",
        "TECH001",
        "maintenance",
        "2026-09-22",
        "Bảo trì định kỳ, kiểm tra hệ thống và vệ sinh thiết bị."
    ],
    function (err) {
        if (err) {
            console.error("Lỗi thêm service history:", err.message);
        } else {
            console.log("Đã thêm service history mẫu.");
        }

        db.close();
    }
);