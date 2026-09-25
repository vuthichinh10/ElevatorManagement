const db = require("./database/database");

db.run(
    `INSERT OR IGNORE INTO users
    (username, password, role, employeeId, elevatorId)
    VALUES (?, ?, ?, ?, ?)`,
    ["admin", "123456", "admin", "ADMIN001", null],
    function (err) {
        if (err) {
            console.error("Lỗi thêm Admin:", err.message);
        } else {
            console.log("Đã thêm tài khoản Admin.");
        }

        db.close();
    }
);