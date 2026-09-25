const db = require('./database/database');

db.run(
    "DELETE FROM users WHERE username = ?",
    ["admin"],
    function (err) {
        if (err) {
            console.error("Lỗi xóa tài khoản:", err.message);
        } else {
            console.log(`Đã xóa ${this.changes} tài khoản admin cũ.`);
        }

        db.close();
    }
);