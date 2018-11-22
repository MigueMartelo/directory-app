const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');
const { isAuthenticated } = require('../helpers/auth');

router.get('/contacts/add', isAuthenticated, (req, res) => {
    res.render('contacts/add-contact');
});

router.post('/contacts/new-contact', isAuthenticated, async (req, res) => {
    const {name, phone, address} = req.body;
    const errors = [];

    if(!name || !phone){
        errors.push({text: 'Please enter all field!'});
    }
    
    if(errors.length > 0){
        res.render('contacts/new-contact', {
            errors,
            name,
            phone,
            address
        });
    } else {
        const newContact = new Contact({name, phone, address});
        newContact.user = req.user.id;
        await newContact.save();
        req.flash('success_msg', 'Contact added successfully!!!');
        res.redirect('/contacts');
    }
});

router.get('/contacts', isAuthenticated, async (req, res) => {    
    const contacts = await Contact.find({user: req.user.id}).sort({name: 'asc'});
    res.render('contacts/all-contacts', {contacts});
});

router.get('/contacts/edit/:id', isAuthenticated,  async (req, res) => {
    const contactToEdit = await Contact.findById(req.params.id);
    res.render('contacts/edit-contact', {contactToEdit});
});

router.put('/contacts/edit-contact/:id', isAuthenticated, async (req, res) => {
    const {name, phone, address} = req.body;
    await Contact.findByIdAndUpdate(req.params.id, {name, phone, address});
    req.flash('success_msg', 'Contact update successfully!!!')
    res.redirect('/contacts');
});

router.delete('/contacts/delete/:id', isAuthenticated, async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Contact delete successfully!!!')
    res.redirect('/contacts');
})

module.exports = router;