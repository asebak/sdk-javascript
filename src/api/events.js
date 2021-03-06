/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Request from './request';
import { serializeParams } from './../utils';

export default class Events {
  constructor(settings, auth) {
    this._settings = settings;

    auth.getToken().then(token => {
      this._settings.token = token;
    });

    this._request = new Request(this._settings);
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events/${eventId}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createEvent(assetId, params) {
    return new Promise((resolve, reject) => {
      this._request.postRequest(`assets/${assetId}/events`, params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
