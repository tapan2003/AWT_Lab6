const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User'); 
// Get all users 
router.get('/', async (req, res) => { 
try { 
const users = await User.find(); 
res.json(users); 
} catch (err) { 
res.status(500).json({ message: err.message }); 
} 
}); 
// Create a new user 
router.post('/', async (req, res) => { 
const user = new User({ 
username: req.body.username, 
email: req.body.email 
}); 
try { 
const newUser = await user.save(); 
res.status(201).json(newUser); 
} catch (err) { 
res.status(400).json({ message: err.message }); 
} 
}); 
// Middleware to find user by id 
async function getUser(req, res, next) { 
try { 
user = await User.findById(req.params.id); 
if (user == null) { 
return res.status(404).json({ message: 'User not found' }); 
} 
} catch (err) { 
return res.status(500).json({ message: err.message }); 
} 
res.user = user; 
next(); 
} 
// Get one user 
router.get('/:id', getUser, (req, res) => { 
res.json(res.user); 
}); 
// Update one user 
router.patch('/:id', getUser, async (req, res) => { 
if (req.body.username != null) { 
res.user.username = req.body.username; 
} 
if (req.body.email != null) { 
res.user.email = req.body.email; 
} 
try { 
const updatedUser = await res.user.save(); 
res.json(updatedUser); 
} catch (err) { 
res.status(400).json({ message: err.message }); 
} 
}); 
// Delete one user 
router.delete('/:id', getUser, async (req, res) => { 
try { 
await res.user.deleteOne(); 
res.json({ message: 'User deleted' }); 
} catch (err) { 
res.status(500).json({ message: err.message }); 
} 
}); 
module.exports = router; 