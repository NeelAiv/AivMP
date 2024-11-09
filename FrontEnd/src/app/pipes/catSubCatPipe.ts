import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategorySubCategory'
})
export class MatchesCategorySubCategoryPipe implements PipeTransform {
    transform(items: Array<any>,category : string, subCategory: string): Array<any> {
      if(subCategory==''|| subCategory==null || subCategory =='null')
      {
        return items.filter(item => item.category === category);
      }
      else{
          return items.filter(item => item.category === category && item.sub_category === subCategory && item.main_page == true);
      }

    }
}
