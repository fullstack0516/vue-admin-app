import { required, minLength, email, helpers } from "@vuelidate/validators"

const userPasswordMin = 6
const userNameMin = 4

const rules = {
  userEmail: {
    email: helpers.withMessage("Please enter a valid email address", email),
    required,
  },
  userPassword: {
    minLength: helpers.withMessage(
      `Please enter at least ${userPasswordMin} characters password`,
      minLength(userPasswordMin),
    ),
    required,
  },
  userName: {
    minLength: helpers.withMessage(
      `Please enter at least ${userNameMin} characters user name`,
      minLength(userNameMin),
    ),
    required,
  },
}

export default rules
