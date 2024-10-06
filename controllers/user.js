const { ObjectId } = require("mongodb");
const User = require("../models/User");

const getAllUser = async (req, res) => {
  try {
    const queryOptions = {};
    const users = await User.find(queryOptions);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { _id, name, email, age, phone } = req.body;
    // const object_Id = new ObjectId(_id);
    console.log("good")
    if (!_id || !name || !email || !age || !phone) {
      return res.status(401).send("Please Provide Name, Email and Password");
    }

    const isValidEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isValidEmail) return res.status(401).send("Invalid Email");

    let user = await User.findOne({ email });

    if (user) return res.status(400).send("User already exists");
    // req.body._id = object_Id;
    user = await User.create({ ...req.body, wishlist: [] });
    console.log(user)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `No User with id: ${userID}` });
    }
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ msg: `No task with id: ${userID}` });
    }

    const updatedUser = await User.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ msg: `No task with id: ${userID}` });
    }

    await User.findByIdAndDelete({ _id: userID });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getWishlist = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${userID}` });
    }

    const wishlist = user.wishlist;

    return res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const { propertyId } = req.body;

    if (!userID || !propertyId) {
      return res
        .status(400)
        .json({ msg: "Please provide both userId and propertyId" });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: `No user found with id: ${userID}` });
    }

    // Check if the propertyId exists in the wishlist
    const propertyIndex = user.wishlist.indexOf(propertyId);

    if (propertyIndex === -1) {
      return res
        .status(404)
        .json({ msg: "Property not found in the wishlist" });
    }

    user.wishlist.splice(propertyIndex, 1);
    await user.save();

    return res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const { propertyId } = req.body;

    if (!userID || !propertyId) {
      return res
        .status(400)
        .json({ msg: "Please provide both userId and propertyId" });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: `No user found with id: ${userID}` });
    }

    // Check if the propertyId already exists in the wishlist
    if (user.wishlist.includes(propertyId)) {
      return res
        .status(400)
        .json({ msg: "Property already exists in the wishlist" });
    }

    user.wishlist.push(propertyId);
    await user.save();

    return res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ msg: `No task with id: ${userID}` });
    }

    const updatedUser = await User.findOneAndUpdate({ _id: userID }, {
      $set: {
        role: 'admin'
      }
    }, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const removeAdmin = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ msg: `No task with id: ${userID}` });
    }

    const updatedUser = await User.findOneAndUpdate({ _id: userID }, {
      $set: {
        role: 'user'
      }
    }, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getWishlist,
  removeFromWishlist,
  addToWishlist,
};
