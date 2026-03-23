const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

class StudentController {
  /**
   * GET /api/students
   */
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20, status, major } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (status) where.status = status;
      if (major) where.major = major;

      const { count, rows } = await Student.findAndCountAll({
        where,
        attributes: { exclude: ['password_hash'] },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']],
      });

      res.status(200).json({
        success: true,
        data: {
          students: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/students/:id
   */
  async getById(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id, {
        attributes: { exclude: ['password_hash'] },
      });

      if (!student) {
        throw ApiError.notFound('Sinh viên không tồn tại');
      }

      res.status(200).json({
        success: true,
        data: { student },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/students/:id
   */
  async update(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        throw ApiError.notFound('Sinh viên không tồn tại');
      }

      const { full_name, date_of_birth, major, academic_year, status } = req.body;

      await student.update({
        ...(full_name && { full_name }),
        ...(date_of_birth !== undefined && { date_of_birth }),
        ...(major !== undefined && { major }),
        ...(academic_year !== undefined && { academic_year }),
        ...(status && { status }),
      });

      const updatedStudent = student.toJSON();
      delete updatedStudent.password_hash;

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin sinh viên thành công',
        data: { student: updatedStudent },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
