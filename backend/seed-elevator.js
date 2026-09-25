const db = require("./database/database");

db.run(
    `INSERT OR IGNORE INTO elevators
    (
        elevatorId,
        owner,
        location,
        city,
        manufacturer,
        installationDate,
        type,
        capacity,
        status,
        numberOfStops,
        speed,
        pitDepth,
        overheadHeight,
        driveType
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        "29A1-0001-01",
        "Vinh Tower",
        "Hoàn Kiếm",
        "Hà Nội",
        "Mitsubishi",
        "2022-03-15",
        "Thang khách",
        "1000 kg / 13 người",
        "Đang hoạt động",
        10,
        1.5,
        150,
        2600,
        "Traction"
    ],
    function (err) {
        if (err) {
            console.error("Lỗi thêm thang máy:", err.message);
        } else {
            console.log("Đã thêm thang máy mẫu.");
        }

        db.close();
    }
);