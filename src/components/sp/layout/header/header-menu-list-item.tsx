import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './header-menu-list-item.scss';

type Props = {
label: string

} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const HeaderMenuListItem = (props: Props) => {
  const { label, onClick, className } = props;

  return (
    <div
      className={`${className || ''} header_menu_list_item`}
      onClick={onClick}
    >
      <span>{label}</span>
      <i className="fas fa-angle-right" />
    </div>
  );
};
