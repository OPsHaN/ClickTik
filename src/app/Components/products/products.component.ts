import { Iproduct } from './../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

searchKey="string";
isReadMore = true;
productList!:Iproduct[] | any;
categoryList:any[] = [];
totalItems!:number;
skipItems:number = 0;
limitItems:number =9;
currentpageIndex =0;
pagesnumbers:number[]=[];

  constructor(private product:ProductsService) { }

  ngOnInit(): void {

this.getProducts( this.skipItems , this.currentpageIndex)
this.getCategories();
  }


  //getProducts
  getProducts( skip:number , currentPage:number){

    this.product.getproductList(this.limitItems ,skip).subscribe((result)=> {
      this.productList=result.products;
      this.totalItems=result.total;
      this.skipItems=skip;
      this.currentpageIndex=currentPage;
      this.pagesnumbers=[];
      for (let index = 0; index < (this.totalItems/this.limitItems); index++) {
      this.pagesnumbers.push(index+1)
      }
      })

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  showText() {
    this.isReadMore = !this.isReadMore
 }


 //getCategories
 getCategories() {
  this.product.getaAllcategories().subscribe((res:any) =>{
this.categoryList = res
  } , error => {
alert(error)
  });
  
 }

 //filterCategories
 getFilter(event:any){
 let value = event.target.value;
 if(value == "all"){
  this.getProducts(this.skipItems , this.currentpageIndex)
}
 else {
  this.getFilterProducts(value);
 }
 }
 
getFilterProducts(keyword:string){
  this.product.getFiltercategories(keyword).subscribe((res:any) =>{
this.productList = res.products;
});
}



}
