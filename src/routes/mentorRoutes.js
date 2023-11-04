const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create Mentor
router.post('/mentors', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Select one mentor and Add multiple Student
router.put('/mentors/:mentorId/addStudents', async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;

  try {
    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { students: { $each: studentIds } } },
      { new: true }
    ).populate('students');

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show all students for a particular mentor
router.get('/mentors/:mentorId/students', async (req, res) => {
  const { mentorId } = req.params;

  try {
    const mentor = await Mentor.findById(mentorId).populate('students');
    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
