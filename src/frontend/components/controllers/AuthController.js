import { UserModel } from '../models/UserModel';

export class AuthController {
  constructor() {
    this.userModel = new UserModel();
  }

  validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }

  async handleEmailSignIn(email, password) {
    try {
      await this.userModel.signInWithEmail(email, password);
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async handleEmailSignUp(formData) {
    try {
      this.validatePassword(formData.password, formData.confirmPassword);
      const userCredential = await this.userModel.signUpWithEmail(
        formData.email,
        formData.password
      );
      await this.userModel.saveUserData(userCredential.user.uid, formData);
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async handleSocialSignIn(provider) {
    try {
      let user;
      if (provider === 'google') {
        user = await this.userModel.signInWithGoogle();
      } else if (provider === 'facebook') {
        user = await this.userModel.signInWithFacebook();
      }

      await this.userModel.saveUserData(user.uid, {
        email: user.email,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        phone: user.phoneNumber || '',
        createdAt: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}