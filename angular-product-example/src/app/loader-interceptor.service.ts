import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {


  constructor(private loaderService: LoaderService) { }

  activeRequests = 0;
  isLoader : boolean;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.isLoader = !!req.headers.get('isloader');

    if(!this.isLoader){
      if (this.activeRequests === 0) {      
        this.loaderService.isLoading.next(true);
      }
      this.activeRequests++;
  
      return next.handle(req).pipe(
        finalize(
          () => {
            this.activeRequests--;
            
            if (this.activeRequests === 0) {
              this.loaderService.isLoading.next(false);
            }
          }
        )
      )
    }
    else{
      return next.handle(req);
    }
  }
}
