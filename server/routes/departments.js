import express from 'express';

const router = express.Router();

const departments = [
  { id: '1', name: 'IT Department' },
  { id: '2', name: 'Library' },
  { id: '3', name: 'Hostel' },
  { id: '4', name: 'Administration' },
  { id: '5', name: 'Accounts' }
];

router.get('/', (req, res) => {
  return res.json({
    status: 'success',
    data: departments
  });
});

export default router;
