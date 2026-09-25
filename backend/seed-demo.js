const db = require('./database/database');

db.serialize(() => {
    console.log('Bắt đầu tạo dữ liệu demo...');

    // ==========================================
    // 1. TÀI KHOẢN DEMO
    // ==========================================

    db.run(
        `
        INSERT INTO users
        (username, password, role, employeeId, elevatorId)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
            password = excluded.password,
            role = excluded.role,
            employeeId = excluded.employeeId,
            elevatorId = excluded.elevatorId
        `,
        [
            'admin01',
            '123456',
            'admin',
            'ADMIN001',
            null
        ]
    );

    db.run(
        `
        INSERT INTO users
        (username, password, role, employeeId, elevatorId)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
            password = excluded.password,
            role = excluded.role,
            employeeId = excluded.employeeId,
            elevatorId = excluded.elevatorId
        `,
        [
            'tech01',
            '123456',
            'technician',
            'TECH001',
            null
        ]
    );

    db.run(
        `
        INSERT INTO users
        (username, password, role, employeeId, elevatorId)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
            password = excluded.password,
            role = excluded.role,
            employeeId = excluded.employeeId,
            elevatorId = excluded.elevatorId
        `,
        [
            'owner01',
            '123456',
            'owner',
            null,
            '29A1-0001-01'
        ]
    );


    // ==========================================
    // 2. THANG MÁY 01
    // Giữ nguyên thang máy Owner đang sử dụng
    // ==========================================

    db.run(
        `
        INSERT INTO elevators
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(elevatorId) DO UPDATE SET
            owner = excluded.owner,
            location = excluded.location,
            city = excluded.city,
            manufacturer = excluded.manufacturer,
            installationDate = excluded.installationDate,
            type = excluded.type,
            capacity = excluded.capacity,
            status = excluded.status,
            numberOfStops = excluded.numberOfStops,
            speed = excluded.speed,
            pitDepth = excluded.pitDepth,
            overheadHeight = excluded.overheadHeight,
            driveType = excluded.driveType
        `,
        [
            '29A1-0001-01',
            'Vinh Tower',
            'Hoàn Kiếm',
            'Hà Nội',
            'Mitsubishi',
            '2022-03-15',
            'Thang khách',
            '1000 kg / 13 người',
            'Đang hoạt động',
            10,
            1.5,
            150,
            2600,
            'Traction'
        ]
    );


    // ==========================================
    // 3. THANG MÁY 02
    // ==========================================

    db.run(
        `
        INSERT INTO elevators
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(elevatorId) DO UPDATE SET
            owner = excluded.owner,
            location = excluded.location,
            city = excluded.city,
            manufacturer = excluded.manufacturer,
            installationDate = excluded.installationDate,
            type = excluded.type,
            capacity = excluded.capacity,
            status = excluded.status,
            numberOfStops = excluded.numberOfStops,
            speed = excluded.speed,
            pitDepth = excluded.pitDepth,
            overheadHeight = excluded.overheadHeight,
            driveType = excluded.driveType
        `,
        [
            '29A1-0002-01',
            'CMC Building',
            'Cầu Giấy',
            'Hà Nội',
            'Otis',
            '2023-06-20',
            'Thang khách',
            '800 kg / 10 người',
            'Đang hoạt động',
            8,
            1.0,
            140,
            2500,
            'Traction'
        ]
    );


    // ==========================================
    // 4. THANG MÁY 03
    // ==========================================

    db.run(
        `
        INSERT INTO elevators
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(elevatorId) DO UPDATE SET
            owner = excluded.owner,
            location = excluded.location,
            city = excluded.city,
            manufacturer = excluded.manufacturer,
            installationDate = excluded.installationDate,
            type = excluded.type,
            capacity = excluded.capacity,
            status = excluded.status,
            numberOfStops = excluded.numberOfStops,
            speed = excluded.speed,
            pitDepth = excluded.pitDepth,
            overheadHeight = excluded.overheadHeight,
            driveType = excluded.driveType
        `,
        [
            '29A1-0003-01',
            'Green Tower',
            'Nam Từ Liêm',
            'Hà Nội',
            'Hyundai',
            '2021-11-10',
            'Thang khách',
            '1200 kg / 16 người',
            'Đang bảo trì',
            12,
            1.75,
            160,
            2700,
            'Traction'
        ]
    );


    // ==========================================
    // 5. XÓA DỮ LIỆU DEMO CŨ CỦA E02/E03
    // ==========================================

    db.run(
        `DELETE FROM inspections
         WHERE elevatorId IN (?, ?)`,
        [
            '29A1-0002-01',
            '29A1-0003-01'
        ]
    );

    db.run(
        `DELETE FROM service_history
         WHERE elevatorId IN (?, ?)`,
        [
            '29A1-0002-01',
            '29A1-0003-01'
        ]
    );


    // ==========================================
    // 6. KIỂM ĐỊNH THANG 02
    // ==========================================

    db.run(
        `
        INSERT INTO inspections
        (
            elevatorId,
            inspectionDate,
            inspectionUnit,
            result,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0002-01',
            '2026-09-18',
            'Trung tâm kiểm định ABC',
            'Đạt',
            'Kiểm định định kỳ, hệ thống hoạt động bình thường.'
        ]
    );

    db.run(
        `
        INSERT INTO inspections
        (
            elevatorId,
            inspectionDate,
            inspectionUnit,
            result,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0002-01',
            '2026-06-15',
            'Trung tâm kiểm định ABC',
            'Đạt',
            'Kiểm tra hệ thống an toàn và hệ thống cửa.'
        ]
    );


    // ==========================================
    // 7. KIỂM ĐỊNH THANG 03
    // ==========================================

    db.run(
        `
        INSERT INTO inspections
        (
            elevatorId,
            inspectionDate,
            inspectionUnit,
            result,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0003-01',
            '2026-09-10',
            'Trung tâm kiểm định XYZ',
            'Đạt',
            'Kiểm định định kỳ trước đợt bảo trì.'
        ]
    );

    db.run(
        `
        INSERT INTO inspections
        (
            elevatorId,
            inspectionDate,
            inspectionUnit,
            result,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0003-01',
            '2026-05-20',
            'Trung tâm kiểm định XYZ',
            'Đạt',
            'Kiểm tra tổng thể thiết bị.'
        ]
    );


    // ==========================================
    // 8. DỊCH VỤ THANG 02
    // ==========================================

    db.run(
        `
        INSERT INTO service_history
        (
            elevatorId,
            technicianId,
            type,
            date,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0002-01',
            'TECH001',
            'maintenance',
            '2026-09-20',
            'Bảo trì định kỳ và kiểm tra hệ thống cửa.'
        ]
    );

    db.run(
        `
        INSERT INTO service_history
        (
            elevatorId,
            technicianId,
            type,
            date,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0002-01',
            'TECH001',
            'repair',
            '2026-08-12',
            'Điều chỉnh cảm biến cửa thang máy.'
        ]
    );


    // ==========================================
    // 9. DỊCH VỤ THANG 03
    // ==========================================

    db.run(
        `
        INSERT INTO service_history
        (
            elevatorId,
            technicianId,
            type,
            date,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0003-01',
            'TECH001',
            'maintenance',
            '2026-09-22',
            'Bảo trì định kỳ toàn bộ hệ thống.'
        ]
    );

    db.run(
        `
        INSERT INTO service_history
        (
            elevatorId,
            technicianId,
            type,
            date,
            description
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            '29A1-0003-01',
            'TECH001',
            'replacement',
            '2026-09-24',
            'Thay thế cảm biến cửa thang máy.'
        ]
    );


    // ==========================================
    // 10. KIỂM TRA KẾT QUẢ
    // ==========================================

    db.all(
        `SELECT elevatorId, owner, location, manufacturer, status
         FROM elevators
         ORDER BY elevatorId`,
        (err, rows) => {
            if (err) {
                console.error('Lỗi kiểm tra elevators:', err.message);
                return;
            }

            console.log('\n=== DANH SÁCH THANG MÁY ===');
            console.table(rows);
        }
    );

    db.all(
        `SELECT username, role, employeeId, elevatorId
         FROM users
         ORDER BY id`,
        (err, rows) => {
            if (err) {
                console.error('Lỗi kiểm tra users:', err.message);
                return;
            }

            console.log('\n=== DANH SÁCH TÀI KHOẢN ===');
            console.table(rows);
        }
    );
});

setTimeout(() => {
    console.log('\nHoàn tất seed dữ liệu demo.');
    db.close();
}, 1000);