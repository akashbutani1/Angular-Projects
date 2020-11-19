import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'AddCategories', component: AddEditCategoryComponent },
  { path: 'EditCategories/:id', component: AddEditCategoryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-Products/:id', component: AddEditProductComponent },
  { path: 'AddProduct', component: AddEditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
