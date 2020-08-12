class Filters {

  constructor() {
    this.query = '';
  }

  /**
   * 
   * @param {Number} userOffset 
   * @param {Array} userFilters 
   */
  applyFilters(userOffset, userFilters) {

    // page offset
    const offset = !!userOffset ? '?page[size]=25&page[offset]=' + userOffset : '';

    // needed before more filters
    const query = !!userOffset ? '&' : '?';

    // more filters
    const filters = !!userFilters ? query + userFilters.join('&') : '';
    
    this.query = offset + filters;
  }
}

export default Filters;