import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategorySubCategoryForWidgetGallery'
})
export class CatSubCatPipeWidgetGallery implements PipeTransform {
    transform(items: Array<any>,category : string, subCategory: string): Array<any> {
        if(subCategory==''|| subCategory==null || subCategory =='null')
        {
          // console.log(items)
          return items.filter(item => item.category === category);
        }
        else{
          // console.log(items)
            return items.filter(item => item.category === category && item.sub_category === subCategory );
        }

      }
}
