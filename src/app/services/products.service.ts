import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient ) { }


  //api products
  getproductList(limit:number , skip:number) {
    return this.http.get<any>('https://dummyjson.com/products?limit='+limit+'&skip='+skip);
  }

  //api single product
  getSingleproduct(productId:string){
    return this.http.get<any>('https://dummyjson.com/products/'+productId);
  }

//api categories
getaAllcategories() {
  return this.http.get<any>('https://dummyjson.com/products/categories');

}

//api filterCategories
getFiltercategories(keyword:string) {
  return this.http.get<any>('https://dummyjson.com/products/category/'+keyword);

}

//api serach
getFilterBySearch(query:string) {
  return this.http.get<any>('https://dummyjson.com/products/search?q='+query);
}



}
