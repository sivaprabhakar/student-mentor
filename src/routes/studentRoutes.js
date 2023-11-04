const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Mentor = require('../models/mentor');

// Create Student
router.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign or Change Mentor for particular Student
router.put('/students/:studentId/assignMentor/:mentorId', async (req, res) => {
  const { studentId, mentorId } = req.params;

  try {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    ).populate('mentor');

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show the previously assigned mentor for a particular student
router.get('/students/:studentId/previousMentor', async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate('mentor');
    res.json(student.mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
