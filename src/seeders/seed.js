/**
 * Seed script - Creates sample data for FE integration testing.
 * Usage: npm run seed
 */
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, Student, Course, Semester, Section, Schedule, Enrollment } = require('../models');

const SALT_ROUNDS = 10;

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync tables (force: true drops and recreates — use only in dev!)
    await sequelize.sync({ force: true });
    console.log('Tables recreated');

    // 1. Students

    const password = await bcrypt.hash('123456', SALT_ROUNDS);

    const students = await Student.bulkCreate([
      {
        student_id: '21IT001',
        full_name: 'Nguyễn Văn An',
        email: 'an.nguyen@student.edu.vn',
        password_hash: password,
        date_of_birth: '2003-05-15',
        major: 'Công nghệ thông tin',
        academic_year: 2021,
        status: 'active',
      },
      {
        student_id: '21IT002',
        full_name: 'Trần Thị Bình',
        email: 'binh.tran@student.edu.vn',
        password_hash: password,
        date_of_birth: '2003-08-22',
        major: 'Công nghệ thông tin',
        academic_year: 2021,
        status: 'active',
      },
      {
        student_id: '22CS001',
        full_name: 'Lê Hoàng Cường',
        email: 'cuong.le@student.edu.vn',
        password_hash: password,
        date_of_birth: '2004-01-10',
        major: 'Khoa học máy tính',
        academic_year: 2022,
        status: 'active',
      },
      {
        student_id: '20IT005',
        full_name: 'Phạm Minh Đức',
        email: 'duc.pham@student.edu.vn',
        password_hash: password,
        date_of_birth: '2002-11-30',
        major: 'Công nghệ thông tin',
        academic_year: 2020,
        status: 'graduated',
      },
      {
        student_id: '22SE001',
        full_name: 'Hoàng Thị Em',
        email: 'em.hoang@student.edu.vn',
        password_hash: password,
        date_of_birth: '2004-03-08',
        major: 'Kỹ thuật phần mềm',
        academic_year: 2022,
        status: 'suspended',
      },
    ]);
    console.log(`Seeded ${students.length} students (password: 123456)`);

    // 2. Courses
    const courses = await Course.bulkCreate([
      {
        course_id: 'MATH101',
        course_name: 'Giải tích 1',
        credits: 4,
        department: 'Khoa Toán',
        description: 'Giới hạn, đạo hàm, tích phân và ứng dụng',
        prerequisite_id: null,
        is_active: true,
      },
      {
        course_id: 'MATH102',
        course_name: 'Đại số tuyến tính',
        credits: 3,
        department: 'Khoa Toán',
        description: 'Ma trận, vector, không gian vector, ánh xạ tuyến tính',
        prerequisite_id: null,
        is_active: true,
      },
      {
        course_id: 'IT1001',
        course_name: 'Nhập môn lập trình',
        credits: 3,
        department: 'Khoa CNTT',
        description: 'Cơ bản về lập trình C/C++',
        prerequisite_id: null,
        is_active: true,
      },
      {
        course_id: 'IT2001',
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        credits: 4,
        department: 'Khoa CNTT',
        description: 'Stack, Queue, Tree, Graph, thuật toán sắp xếp, tìm kiếm',
        prerequisite_id: 'IT1001',
        is_active: true,
      },
      {
        course_id: 'IT3001',
        course_name: 'Cơ sở dữ liệu',
        credits: 3,
        department: 'Khoa CNTT',
        description: 'Mô hình quan hệ, SQL, thiết kế CSDL',
        prerequisite_id: 'IT1001',
        is_active: true,
      },
      {
        course_id: 'IT3002',
        course_name: 'Lập trình Web',
        credits: 3,
        department: 'Khoa CNTT',
        description: 'HTML, CSS, JavaScript, Node.js, React',
        prerequisite_id: 'IT2001',
        is_active: true,
      },
      {
        course_id: 'IT4001',
        course_name: 'Trí tuệ nhân tạo',
        credits: 3,
        department: 'Khoa CNTT',
        description: 'Tìm kiếm, logic, machine learning cơ bản',
        prerequisite_id: 'IT2001',
        is_active: true,
      },
      {
        course_id: 'ENG101',
        course_name: 'Tiếng Anh 1',
        credits: 2,
        department: 'Khoa Ngoại ngữ',
        description: 'Tiếng Anh giao tiếp cơ bản',
        prerequisite_id: null,
        is_active: true,
      },
    ]);
    console.log(`Seeded ${courses.length} courses`);

    // 3. Semesters
    const semesters = await Semester.bulkCreate([
      {
        semester_name: 'HK1 2024-2025',
        academic_year: '2024-2025',
        semester_number: 1,
        start_date: '2024-09-02',
        end_date: '2025-01-15',
        reg_open: '2024-08-15T08:00:00',
        reg_close: '2024-09-10T23:59:59',
        is_current: false,
      },
      {
        semester_name: 'HK2 2024-2025',
        academic_year: '2024-2025',
        semester_number: 2,
        start_date: '2025-02-10',
        end_date: '2025-06-30',
        // Registration window covers now for testing
        reg_open: '2025-01-20T08:00:00',
        reg_close: '2027-03-01T23:59:59',
        is_current: true,
      },
      {
        semester_name: 'HK Hè 2024-2025',
        academic_year: '2024-2025',
        semester_number: 3,
        start_date: '2025-07-07',
        end_date: '2025-08-30',
        reg_open: '2025-06-20T08:00:00',
        reg_close: '2025-07-10T23:59:59',
        is_current: false,
      },
    ]);
    console.log(`Seeded ${semesters.length} semesters`);

    const currentSemester = semesters[1]; // HK2

    // 4. Sections
    const sections = await Section.bulkCreate([
      // MATH101 - 2 sections
      {
        section_code: 'MATH101.01',
        course_id: 'MATH101',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'PGS.TS Nguyễn Văn Toán',
        max_students: 60,
        current_students: 0,
        room: 'A1-101',
        status: 'open',
      },
      {
        section_code: 'MATH101.02',
        course_id: 'MATH101',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'TS. Lê Thị Hàm',
        max_students: 40,
        current_students: 0,
        room: 'A1-202',
        status: 'open',
      },
      // IT1001 - 2 sections
      {
        section_code: 'IT1001.CNTT01',
        course_id: 'IT1001',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'ThS. Trần Minh Code',
        max_students: 45,
        current_students: 0,
        room: 'B2-301',
        status: 'open',
      },
      {
        section_code: 'IT1001.CNTT02',
        course_id: 'IT1001',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'TS. Phạm Hữu Debug',
        max_students: 45,
        current_students: 0,
        room: 'B2-302',
        status: 'open',
      },
      // IT2001 - 1 section
      {
        section_code: 'IT2001.CNTT01',
        course_id: 'IT2001',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'PGS.TS Vũ Đức Algo',
        max_students: 50,
        current_students: 0,
        room: 'B1-201',
        status: 'open',
      },
      // IT3001 - 1 section
      {
        section_code: 'IT3001.CNTT01',
        course_id: 'IT3001',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'TS. Ngô Thị SQL',
        max_students: 40,
        current_students: 0,
        room: 'B1-302',
        status: 'open',
      },
      // IT3002 - 1 section (closed)
      {
        section_code: 'IT3002.CNTT01',
        course_id: 'IT3002',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'ThS. Đỗ React',
        max_students: 35,
        current_students: 35,
        room: 'B3-101',
        status: 'closed',
      },
      // ENG101 - 1 section
      {
        section_code: 'ENG101.01',
        course_id: 'ENG101',
        semester_id: currentSemester.semester_id,
        lecturer_name: 'ThS. Linda Nguyễn',
        max_students: 30,
        current_students: 0,
        room: 'C1-101',
        status: 'open',
      },
    ]);
    console.log(`Seeded ${sections.length} sections`);

    // 5. Schedules
    const schedules = await Schedule.bulkCreate([
      // MATH101.01 - Thứ 2 tiết 1-3, Thứ 4 tiết 1-3
      { section_id: sections[0].section_id, day_of_week: 2, start_period: 1, end_period: 3, room: 'A1-101', week_type: 'all' },
      { section_id: sections[0].section_id, day_of_week: 4, start_period: 1, end_period: 3, room: 'A1-101', week_type: 'all' },

      // MATH101.02 - Thứ 3 tiết 4-6, Thứ 5 tiết 4-6
      { section_id: sections[1].section_id, day_of_week: 3, start_period: 4, end_period: 6, room: 'A1-202', week_type: 'all' },
      { section_id: sections[1].section_id, day_of_week: 5, start_period: 4, end_period: 6, room: 'A1-202', week_type: 'all' },

      // IT1001.CNTT01 - Thứ 2 tiết 4-6, Thứ 6 tiết 1-3
      { section_id: sections[2].section_id, day_of_week: 2, start_period: 4, end_period: 6, room: 'B2-301', week_type: 'all' },
      { section_id: sections[2].section_id, day_of_week: 6, start_period: 1, end_period: 3, room: 'B2-301', week_type: 'all' },

      // IT1001.CNTT02 - Thứ 3 tiết 1-3, Thứ 5 tiết 1-3
      { section_id: sections[3].section_id, day_of_week: 3, start_period: 1, end_period: 3, room: 'B2-302', week_type: 'all' },
      { section_id: sections[3].section_id, day_of_week: 5, start_period: 1, end_period: 3, room: 'B2-302', week_type: 'all' },

      // IT2001.CNTT01 - Thứ 2 tiết 7-9, Thứ 4 tiết 7-9
      { section_id: sections[4].section_id, day_of_week: 2, start_period: 7, end_period: 9, room: 'B1-201', week_type: 'all' },
      { section_id: sections[4].section_id, day_of_week: 4, start_period: 7, end_period: 9, room: 'B1-201', week_type: 'all' },

      // IT3001.CNTT01 - Thứ 3 tiết 7-9 (tuần lẻ), Thứ 5 tiết 7-9
      { section_id: sections[5].section_id, day_of_week: 3, start_period: 7, end_period: 9, room: 'B1-302', week_type: 'odd' },
      { section_id: sections[5].section_id, day_of_week: 5, start_period: 7, end_period: 9, room: 'B1-302', week_type: 'all' },

      // IT3002.CNTT01 - Thứ 4 tiết 4-6, Thứ 6 tiết 4-6
      { section_id: sections[6].section_id, day_of_week: 4, start_period: 4, end_period: 6, room: 'B3-101', week_type: 'all' },
      { section_id: sections[6].section_id, day_of_week: 6, start_period: 4, end_period: 6, room: 'B3-101', week_type: 'all' },

      // ENG101.01 - Thứ 7 tiết 1-3
      { section_id: sections[7].section_id, day_of_week: 7, start_period: 1, end_period: 3, room: 'C1-101', week_type: 'all' },
    ]);
    console.log(`Seeded ${schedules.length} schedules`);

    // 6. Sample Enrollments
    // Student 21IT001 enrolls in MATH101.01 and IT1001.CNTT01
    await Enrollment.bulkCreate([
      {
        student_id: '21IT001',
        section_id: sections[0].section_id, // MATH101.01
        enrolled_at: new Date(),
        status: 'enrolled',
      },
      {
        student_id: '21IT001',
        section_id: sections[2].section_id, // IT1001.CNTT01
        enrolled_at: new Date(),
        status: 'enrolled',
      },
    ]);

    // Update current_students counters
    await Section.increment('current_students', { by: 1, where: { section_id: sections[0].section_id } });
    await Section.increment('current_students', { by: 1, where: { section_id: sections[2].section_id } });

    console.log('Seeded sample enrollments for student 21IT001');

    console.log('All seed data created successfully!');
    console.log('Test accounts (password: 123456):');
    console.log('   - an.nguyen@student.edu.vn  (active)');
    console.log('   - binh.tran@student.edu.vn  (active)');
    console.log('   - cuong.le@student.edu.vn   (active)');
    console.log('   - duc.pham@student.edu.vn   (graduated)');
    console.log('   - em.hoang@student.edu.vn   (suspended)');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
