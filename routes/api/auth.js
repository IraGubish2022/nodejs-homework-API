const express = require('express');

const { auth: controllers } = require('../../controllers');
const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { userJoiSchema, subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(userJoiSchema), ctrlWrapper(controllers.signup));

router.post('/login', validation(userJoiSchema), ctrlWrapper(controllers.login));

router.get('/logout', auth, ctrlWrapper(controllers.logout));

router.get("/verifyEmail/:verificationToken", controllers.verifyEmail);

router.post(
    "/verifyEmail",
    validation(subscriptionJoiSchema),
    controllers.resendVerifyEmail
  );

router.get("/current", auth, controllers.getCurrentUser);

router.post("/logout", auth, controllers.logout);

router.patch(
    "/avatars",
    auth,
    upload.single("avatar"),
    controllers.updateAvatar
  );

module.exports = router;