import ProfileTemplate from './Profile.pug';
import profileData from './Profile__data.pug';
import {User} from '../../utils/user.js';
import BaseView from '../BaseView';
import Bus from '../../utils/bus';
/**
 *
 */
export default class ProfileView extends BaseView {
  /**
   *
   * @param {*} parent
   */
  constructor(parent) {
    super(parent, ProfileTemplate, false);

    Bus.on('userUpdate', this.onUserUpdate.bind(this));
    Bus.on('onSuccessUpload', this._onSuccessUpload.bind(this));
    Bus.on('onFailedUpload', (error) => {
      this._showWarning(this._warnings.email, error.message);
    });
    Bus.on('onSuccessAvatarGet', this._onSuccessAvatarGet.bind(this));
    Bus.on('onFailedAvatarGet', this._onFailedAvatarGet.bind(this));
  }

  /** */
  render() {
    this.user = User;
    console.log('RRrrrr ', User);
    super.render();

    Bus.emit('getAvatar', User.name);
    document.getElementById('file')
        .addEventListener('change', this._handleFileSelect.bind(this), false);
  }


  /**
   *
   * @param {*} warning
   * @param {*} message
   */
  _showWarning(warning, message) {
    warning.classList.remove('hidden');
    warning.innerHTML = '';
    warning.innerHTML += message;
  }
  /**
   *
   * @param {*} warning
   */
  _hideWarning(warning) {
    warning.classList.add('hidden');
    warning.innerHTML = '';
  }

  /**
   *
   * @param {*} evt
   * @param {*} h
   * @param {*} w
   */
  _handleFileSelect(evt) {
    const file = evt.target.files; // FileList object
    const f = file[0];
    // Only process image files.
    if (!f.type.match('image.*')) {
      alert('Image only please....');
      return;
    }
    Bus.emit('uploadAvatar', f);
  }

  /**
   * @param {*} uploadURL
   */
  _onSuccessUpload(uploadURL) {
    console.log('_onSuccessUpload ');
    // Render thumbnail.'
    const img = document.createElement('img');
    img.src = uploadURL;
    img.className = 'thumb';
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').appendChild(img);
  }

  /**
   *
   */
  _onFailedAvatarGet() {
    console.log('Failed to get avatar');
    document.getElementById('output')
        .innerHTML = `<div class=profile__default_avatar></div>`;
  }

  /**
   *
   * @param {*} blob
   */
  _onSuccessAvatarGet(blob) {
    const objectURL = URL.createObjectURL(blob);
    console.log('_getAvatar' + objectURL);
    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(blob);
    img.className = 'thumb';
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    };
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').appendChild(img);
  }

  /**
   *
   */
  onUserUpdate() {
    const userInfo = this.parent.querySelector('.profile__data');
    userInfo.innerHTML = profileData({user: this._user});
  }
}
