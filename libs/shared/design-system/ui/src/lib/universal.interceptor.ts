/**
 * @license
 * Copyright 2022 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * In a Universal app, HTTP URLs must be absolute.
 * This means we have to use absolute URLs when running on the server
 * and relative URLs when running in the browser.
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  /**
   * Universal interceptor for all HTTP requests
   * to add the absolute url for the server rendering.
   */
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    const serverReq: HttpRequest<T> = req;

    return next.handle(serverReq);
  }
}
