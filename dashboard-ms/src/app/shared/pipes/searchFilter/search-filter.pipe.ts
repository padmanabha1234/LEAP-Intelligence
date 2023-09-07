import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, searchFilterConfig: any): any {
    console.log(searchFilterConfig)
    let {searchProps, searchText} = searchFilterConfig;
    if(searchText) {
      searchText = String(searchText)
      // searchText = searchText ? searchText.toLocaleLowerCase() : '';
    }
    
    let data = items.data;

    // return items
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if (searchText) {
      let filteredData = data.filter((e: any) => {
        let include = false;
        // return String(e.udise_code?.value)?.includes(searchText) ? String(e.udise_code?.value)?.includes(searchText) : false
        searchProps.every((prop: any) => {
          let value = e?.[prop]?.value ? (String(e?.[prop]?.value).toLocaleLowerCase()).includes(searchText.toLocaleLowerCase()) : (e?.[prop] ? (String(e?.[prop]).toLocaleLowerCase()).includes(searchText.toLocaleLowerCase()) : false)
          if(value) {
            include = true;
            return false
          }
          return true
        })
        return include
      })
      return {
        ...items,
        data: filteredData
      }
      // return items.filter((e: any) => {
      //   return String(e.email).toLocaleLowerCase().includes(searchText) ||
      //     String(e.first_name).toLocaleLowerCase().includes(searchText) ||
      //     String(e.last_name).toLocaleLowerCase().includes(searchText) ||
      //     String(e.designation).toLocaleLowerCase().includes(searchText) ||
      //     String(e.tibil_id).toLocaleLowerCase().includes(searchText) ||
      //     String(e.phone_number).toLocaleLowerCase().includes(searchText);
      // });
      
    }
  }

}
