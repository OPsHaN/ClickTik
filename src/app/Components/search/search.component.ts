import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isReadMore = true;
  productList!:Iproduct[] | any;
  isuserLogged:boolean | undefined;

  constructor(private activeRoute:ActivatedRoute ,  private product:ProductsService) { }

  ngOnInit(): void {
  let query= this.activeRoute.snapshot.paramMap.get('query');
  console.warn(query)
  query && this.product.getFilterBySearch(query).subscribe((res) => 
  {
  this.productList=res.products;
  })
  }




  trackByFn(index: any, item: any) {
    return index;
  }

  showText() {
    this.isReadMore = !this.isReadMore
 }

}
