import * as Yup from "yup";

export const signUpSchema = Yup.object({
username:Yup.string().min(2).max(25).required("Please enter your username"),
email: Yup.string().email().required("Please enter your email"),
password: Yup.string()
.min(8, "Password must be at least 8 characters")
.test(
  "password-strength",
  "Atleast one uppercase, lowercase letter, and number",
  (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(value)
)
.required("Please enter your password"),
confirm_password: Yup.string().required().oneOf([Yup.ref("password"),null], "Password must match"),
});