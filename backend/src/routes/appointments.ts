import express from 'express';
import type { Request, Response, Router } from 'express';
import Appointment from '../models/Appointment.ts';
import { authenticateJWT } from '../middlewares/authMiddleware.ts';

const router: Router = express.Router();

// Get all appointments
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().populate('student counselor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Create a new appointment
router.post('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create appointment' });
  }
});

// Update appointment status
router.patch('/:id', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update appointment' });
  }
});

// Delete appointment
router.delete('/:id', authenticateJWT, async (req: Request, res: Response) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete appointment' });
  }
});

export default router;
