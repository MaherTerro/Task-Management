const express = require('express');
const bcrypt = require('bcrypt');
const Model = require('../Model/Task');
const User = require('../Model/User');
const router = express.Router()


//add task
router.post('/post', async (req, res) => {
    const data = new Model({
        userid:req.body.userid,
      title: req.body.title,
        description: req.body.description,
        duedate: req.body.duedate,
       iscompleted:false
    })
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//sign up
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
     //check if user exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
  //if not proceed with sign up
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'An error occurred during sign-up' });
    }
  });
  //login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful',userid:user._id,username:user.username });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });
  //getalltasks in order by is completed and due date
  router.post('/getAll', async (req, res) => {
    const { userid } = req.body;
  
    try {
      const tasks = await Model.find({ userid }).sort({ iscompleted: -1, duedate: 1 });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//get one task by id
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//update task
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//complete task
router.put('/complete/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = {
          iscompleted: true
      }

      const result = await Model.updateOne({ _id: id }, updatedData);

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
//delete task
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;
