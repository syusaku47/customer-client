export type EstimateMeisai = {
  quote_id: number;
  id: number;
  item_kubun: number;
  category: number;
  sub_category: number;
  construction_materials_name: string;
  standard: string;
  quantity: number;
  unit: number;
  quote_unit_price: number;
  prime_cost: number;
  item_kubun_name: string;
  category_name: string;
  sub_category_name: string;
  unit_name: string;
  index: number;
  sub_index: number;
};

export type EstimateMeisaiListType = {
  quote_id: number;
  id: number;
  category: number;
  category_name: string;
  sub_category: number;
  sub_category_name: string;
  component_name: string;
  print_name: string;
  standard: string;
  quantity: number;
  unit: string;
  unit_name: string;
  quote_unit_price: number;
  price: number;
  prime_cost: number;
  cost_amount: number;
  gross_profit_amount: number;
  gross_profit_rate: number;
  remarks: string;
  index: number;
  sub_index: number;
};

export type EstimateMeisaiSideMenuData = {
  parent_id: number;
  detail_id: number;
  parent_title: string;
  parent_percent: number;
};

export type SubEstimateMeisaiSideMenuData = {
  id: number;
  percent: number;
  title: string;
};

export type EstimateMeisaiSideMenu = {
  percent: number;
  data: ({
    sub: SubEstimateMeisaiSideMenuData[];
  } & EstimateMeisaiSideMenuData)[];
};

export type EstimateMeisaiEditState = {};
