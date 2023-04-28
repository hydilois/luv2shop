import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  private categoryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // Need to build the URL based on the category ID
    const searcUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.getProducts(searcUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // Need to build the URL based on the keyword
    const searcUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`

    return this.getProducts(searcUrl);
  }



  private getProducts(searcUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searcUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to buil the url based on the product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl)
  }

  getProductListPaginate(thePage:number, thePageSize:number, theCategoryId: number): Observable<GetResponseProducts> {

    // Need to build the URL based on the category id, page and size
    const searcUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(searcUrl);
  }

  searchProductsPaginate(thePage:number, thePageSize:number, theKeyword: string): Observable<GetResponseProducts> {

    // Need to build the URL based on the keyword, page and size
    const searcUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(searcUrl);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  },
  page: {
    size:number,
    totalElements: number,
    totalPages: number,
    number: number

  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
