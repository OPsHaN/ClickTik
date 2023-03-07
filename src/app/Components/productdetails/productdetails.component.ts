import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  loading:boolean = false;
  productData:undefined | any;

  constructor(private activeRoute:ActivatedRoute ,  private product:ProductsService) { }

ngOnInit(): void {
let productId = this.activeRoute.snapshot.paramMap.get('productId');
this.loading=true;
productId && this.product.getSingleproduct(productId).subscribe((res) => {
console.log(res);
this.loading=false;
this.productData = res;
})

    }




}
