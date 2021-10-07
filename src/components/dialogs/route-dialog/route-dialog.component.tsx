import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { CustomerListType } from '../../../type/customer/customer.type';
import { ProjectListType } from '../../../type/project/project.type';
import { UserAgent } from '../../../utilities/user-agent';
import { Button } from '../../ui/button/button';
import { Input } from '../../ui/input/input';
import { RegistrationAddressMapDialogPC } from '../../ui/map/registration-address-map-dialog/pc/registration-address-map-dialog.pc';

type DefaultButtonProps = {
  label: string;
  onClick: () => void;

  size?: 'md' | 'sm' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'default' | 'dark';
  disabled?: boolean;
  icon?: globalThis.JSX.Element;
  className?: string;
}

export const DefaultButton = (props:DefaultButtonProps) => {
  const {
    size, color, onClick, disabled, label, icon, className,
  } = props;
  return (
    <Button
      size={size || 'md'}
      color={color || 'secondary'}
      onClick={onClick}
      disabled={disabled}
      className={className || ''}
    >
      <>
        {icon && icon}
        {label}
      </>
    </Button>
  );
};

// ------------------------------------------------------------------------

type DefaultInputProps = {
  value: string;
  label?: string;
  onChange: (v:string) => void;

  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}

export const DefaultInput = (props:DefaultInputProps) => {
  const {
    value: _value,
    onChange: _onChange,
    disabled,
    label,
    labelClassName,
    inputClassName,
  } = props;

  const [value, setValue] = useState(_value);

  const onChange = useCallback((e:globalThis.React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // _onChange(e.target.value);
  }, []);

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  return (
    <>
      {label && <div className={labelClassName || 'item_head'}>{label}</div>}
      <Input
        onBlur={() => _onChange(value)}
        className={inputClassName || 'small'}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

// ------------------------------------------------------------------------
type CustomerSearchBtnProps = {
  type: 'customer' | 'project' | 'address';
  onClick: (v: string) => void;
  disabled?: boolean;
  icon?: globalThis.JSX.Element;
  className?: string;
  size?: 'md' | 'sm' | 'lg';
}

export const SearchBtn = (props:CustomerSearchBtnProps) => {
  const {
    onClick: _onClick, type, disabled, icon, className, size,
  } = props;

  const dispatch = useDispatch();

  const label = useMemo(() => {
    switch (type) {
      case 'customer':
        return UserAgent === 'pc' ? '顧客検索' : '顧客';
      case 'project':
        return UserAgent === 'pc' ? '案件検索' : '案件';
      case 'address':
        return UserAgent === 'pc' ? '地図から検索' : '';
      default:
        return '';
    }
  }, [type]);

  /* Callback */
  const mapSearch = useCallback(() => {
    dispatch(DialogActions.push({
      title: '地図から登録',
      className: 'max_height_dialog max_width_dialog search_dialog map_dialog',
      element: <RegistrationAddressMapDialogPC
        type={type === 'address' ? undefined : type}
        callbackData={(d) => {
          if (type === 'customer') {
            const value = d as CustomerListType;
            console.log(value);
            _onClick(`${value.prefecture_name}${value.city}${value.address || ''}${value.building_name || ''}`);
          } else {
            const value = d as ProjectListType;
            _onClick(value.field_place);
          }
          dispatch(DialogActions.pop());
        }}
        callback={(d) => {
          dispatch(DialogActions.pop());
          _onClick(d?.formattedAddress || '');
        }}
        label="登録"
      />,
    }));
  },
  [type]);

  return (
    <DefaultButton
      label={label}
      onClick={mapSearch}
      disabled={disabled}
      icon={icon}
      className={className}
      size={size}
    />
  );
};
