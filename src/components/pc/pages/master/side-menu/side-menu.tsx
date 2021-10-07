import { MasterLabel } from '../master.type';

type Props = {
  callback: (type: number) => void,
  list: MasterLabel[],
  activeId:number
}

export const SideMenu = (props: Props) => {
  const { callback, list, activeId } = props;

  return (
    <div className="side_menu">
      {list.map((v, i) => (
        <div key={`sideMenu ${i}`}>
          {v.type === undefined
            ? <label>{v.label}</label>
            : (
              <button
                onClick={() => callback(v.type ?? 0)}
                className={v.type === activeId ? 'active' : ''}/* ★TODO */
              ><i className="fas fa-chevron-right" />{v.label}
              </button>
            )}
        </div>
      ))}
    </div>
  );
};
