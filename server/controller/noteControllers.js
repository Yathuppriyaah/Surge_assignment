const CustomApiErrorHandler = require('../utils/CustomApiErrorHandler');
const Note = require('../models/note');
const { StatusCodes } = require('http-status-codes');

// to create a new note
exports.createNote = async (req, res) => {
  req.body.createdBy = req.user.id;
  const { title, description } = req.body;
  // if empty fields throw an error
  if (!title || !description)
    throw new CustomApiErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );

  //   create a note
  const note = await Note.create({
    title,
    description,
    createdBy: req.user.id,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    note,
  });
};

// to get all the notes
exports.getAllNotes = async (req, res) => {
  const notes = await Note.find({ createdBy: req.user.id }).limit(8);
  // const notes = await Note.find().limit(8);
  res.status(StatusCodes.OK).json({
    success: true,
    notes,
  });
};

//  to update a note Api
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // if empty fields throw an error
  if (!title || !description)
    throw new CustomApiErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );

  //  find a note first
  const note = await Note.findOne({ _id: id });
  if (!note)
    throw new CustomApiErrorHandler(
      `No note found with this id ${id}`,
      StatusCodes.BAD_REQUEST
    );

  const noteUpdated = await Note.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ noteUpdated });
};

// to delete a note

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  //  find a note first
  const note = await Note.findOne({ _id: id });
  if (!note)
    throw new CustomApiErrorHandler(
      `No note found with this id ${id}`,
      StatusCodes.BAD_REQUEST
    );

  await note.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Note Deleted Successfully',
  });
};
