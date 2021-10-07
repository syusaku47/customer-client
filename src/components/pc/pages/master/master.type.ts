/* eslint-disable camelcase */
export type MasterLabel={
  type?: number,
  label: string,
}

export type SideMenuLabel = MasterLabel&{ child:MasterLabel[]}

export type StoreMaster = {
  store_name: string,
  store_abbreviation_name: string,
  store_furigana: string,
  phone_num: string,
  fax_num: string,
  postal_code: string,
  address_prefecture: string,
  address_city: string,
  address_place: string,
  address_building_name: string,
  valid_flag: boolean,
  toll_free_num: string,
  bank_name: string,
  account_number: number,
  account_name: string,
  bank_type: string,
}

export type EmployeeMaster = {
  employee_code: string,
  store_name: string,
  employee_name: string,
  employee_abbreviation_name: string,
  employee_furigana_name: string,
  job_title: string,
  sale_goal: number,
  valid_flag: boolean,
  authority_1: boolean,
  authority_2: boolean,
  authority_3: boolean,
  authority_4: boolean,
}

export type TaxMaster = {
  id: number,
  applied_start_day: number,
  consumption_tax_rate: number,
  valid_flag: boolean,
}

export type LargeCategoryMaster = {
  id: number,
  large_category_name: string,
  valid_flag: boolean,
}

export type MiddleCategoryMaster = {
  id: number,
  large_category_name: string,
  middle_category_name: string,
  valid_flag: boolean,
}

export type MeisaiMaster = {
  id: number,
  goods_category: string,
  large_category_name: string,
  middle_category_name: string,
  name: string,
  standard: string,
  quantity: number,
  unit_name: string,
  estimated_price: number,
  purchase_cost: number,
  valid_flag: boolean,
}
export type UnitMaster = {
  id: number,
  unit_name: string,
  valid_flag: boolean,
}

export type OriginMaster = {
  id: number,
  origin_name: string,
  valid_flag: boolean,
}

export type BuildingCategoryMaster = {
  id: number,
  building_category_name: string,
  valid_flag: boolean,
}

export type MadoriMaster = {
  id: number,
  madori_name: string,
  valid_flag: boolean,
}

export type InquiryMaster = {
  id: number,
  inquiry_name: string,
  valid_flag: boolean,
}

export type OrderFailureMaster = {
  id: number,
  order_failure_reason: string,
  valid_flag: boolean,
}

export type SupportHistoryMaster = {
  id: number,
  approach_information: string,
  valid_flag: boolean,
}

export type AfterMaintenanceMaster = {
  id: number,
  registration_scheduled_date: string,
  valid_flag: boolean,
}

export type signatureMaster = {
  item: string,
  name: string,
}

export type EstimateMaster = {
  item: string,
  name: string,
  estimation_rate: number,
  purchase_cost_rate: number,
}

export type RelevantTagMaster = {
  id: number,
  relevant_tag_name: string,
  text_input_flag: boolean,
  valid_flag: boolean,
}

export type MyCarTypeMaster = {
  id: number,
  my_car_type_name: string,
  text_input_flag: boolean,
  valid_flag: boolean,
}

export type ContractedCompanyMaster = {}

export type MasterEditDialogProps = {
  id?: number,
  callback: () => void,
}

export type HeaderList = { key: string, label: string }[]
