import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../../firebasefront';

export class UserModel {
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
  }

  async saveUserData(userId, userData) {
    try {
      await set(ref(database, 'users/' + userId), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        birthDate: userData.birthDate,
        country: userData.country,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error("Failed to save user data: " + error.message);
    }
  }

  async signInWithEmail(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUpWithEmail(email, password) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signInWithGoogle() {
    const result = await signInWithPopup(this.auth, this.googleProvider);
    return result.user;
  }

  async signInWithFacebook() {
    const result = await signInWithPopup(this.auth, this.facebookProvider);
    return result.user;
  }
}