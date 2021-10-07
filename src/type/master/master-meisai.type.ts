export type MasterMeisai = {
  /* TODO API定義書が出来次第getを確認 */
  detail_id: number,
  id: string,
  product_kubun: number,
  category_id: number,
  subcategory_id: number,
  name: string,
  standard: string,
  quantity: number,
  credit_id: number,
  quote_unit_price: string,
  prime_cost: string,
  image: File | any,
  valid_flag: boolean,
};
