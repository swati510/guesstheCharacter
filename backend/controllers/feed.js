// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Feed = require('../models/feed');
const User = require('../models/user');

const getFeedById = async (req, res, next) => {
  const feedId = req.params.fid;

  let feed;
  try {
    feed = await Feed.findById(feedId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a feed.',
      500
    );
    return next(error);
  }

  if (!feed) {
    const error = new HttpError(
      'Could not find feed for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ feed: feed.toObject({ getters: true }) });
};

const getFeedsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let feeds;
  let userWithFeeds;
  try {
    userWithFeeds = await User.findById(userId).populate('feeds');
  } catch (err) {
    const error = new HttpError(
      'Fetching feeds failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!feeds || feeds.length === 0) {
  if (!userWithFeeds || userWithFeeds.feeds.length === 0) {
    return next(
      new HttpError('Could not find feeds for the provided user id.', 404)
    );
  }

  res.json({ feeds: userWithFeeds.feeds.map(feed => feed.toObject({ getters: true })) });
};

const createFeed = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { description,name, creator } = req.body;


  const createdFeed = new Feed({
  
    description,
    name,
    creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      'Creating feed failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFeed.save({ session: sess }); 
    user.feeds.push(createdFeed); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating feed failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ feed: createdFeed });
};

const getAllFeed=async (req, res, next) =>{
    let feeds;
    try{
        feeds=await Feed.find({});

    }
    catch (err) {
        const error = new HttpError(
          'No feed found',
          404
        );
        return next(error);
      }
      if (!feeds ) {
        const error = new HttpError(
          'empty feeds',
          401
        );
        return next(error);
      }
      res.json({feeds});

 }
const updateFeed = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {  description } = req.body;
  const feedId = req.params.fid;

  let feed;
  try {
    feed = await Feed.findById(feedId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update feed.',
      500
    );
    return next(error);
  }

  feed.description = description;

  try {
    await feed.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update feed.',
      500
    );
    return next(error);
  }

  res.status(200).json({ feed: feed.toObject({ getters: true }) });
};

const deleteFeed = async (req, res, next) => {
  const feedId = req.params.fid;

  let feed;
  try {
    feed = await Feed.findById(feedId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete feed.',
      500
    );
    return next(error);
  }

  if (!feed) {
    const error = new HttpError('Could not find feed for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await feed.remove({session: sess});
    feed.creator.feeds.pull(feed);
    await feed.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete feed.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted feed.' });
};

exports.getFeedById = getFeedById;
exports.getFeedsByUserId = getFeedsByUserId;
exports.createFeed = createFeed;
exports.updateFeed = updateFeed;
exports.deleteFeed = deleteFeed;
exports.getAllFeed=getAllFeed;