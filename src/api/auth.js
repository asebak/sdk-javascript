/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Request from './request';

export default class Auth {
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);

    if (!this._settings || !this._settings.secret || !this._settings.address) {
      console.error('Secret key and account address are required in order to generate an access token.');
      return false;
    }
  }

  getToken() {
    return new Promise((resolve, reject) => {
      if (this._settings.token) {
        resolve(this._settings.token);
      } else {
        this._request.postRequest('token', { validUntil: 1600000000 })
          .then((response) => {
            this._settings.token = response.data.token;
            resolve(this._settings.token);
          })
          .catch(error => reject(error));
      }
    });
  }
}
