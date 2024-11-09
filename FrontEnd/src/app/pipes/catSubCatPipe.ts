import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategorySubCategory'
})
export class MatchesCategorySubCategoryPipe implements PipeTransform {
    transform(items: Array<any>, category: string, subCategory?: string): Array<any> {
    // if (!items || !category) {
    //   console.log("No items");
    //   return items;
    // }

    return items.filter(item => {
      const itemCategory = item.Category ?? item.category;
      const itemSubCategory = item.SubCategory ?? item.sub_category;

      const matchesCategory = itemCategory === category;
      const matchesSubCategory = subCategory ? itemSubCategory === subCategory : true;

      // console.log("Item:", item, "Matches Category:", matchesCategory, "Matches SubCategory:", matchesSubCategory);

      return matchesCategory && matchesSubCategory;
    });
  }
}
