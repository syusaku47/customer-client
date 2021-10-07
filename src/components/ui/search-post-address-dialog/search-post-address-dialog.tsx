/* eslint-disable */
import { useCallback, useState } from 'react';
import { prefectures } from '../../../collection/prefectures';
import { UserAgent } from '../../../utilities/user-agent';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Select } from '../select/select';
import { Table } from '../table/table';

export type Props = Partial<{
  zipcode1: string;
  zipcode2: string;
  pref: number;
  city: string;
  address: string;
}>

export const SearchPostAddressDialog = (props: Props) => {
  const {
    zipcode1: _zipcode1,
    zipcode2: _zipcode2,
    pref: _pref,
    city: _city,
    address: _address,
  } = props;

  /* State */
  const [zipcode1, setZipcode1] = useState(_zipcode1 || '');
  const [zipcode2, setZipcode2] = useState(_zipcode2 || '');
  const [pref, setPref] = useState(_pref || NaN);
  const [city, setCity] = useState(_city || '');
  const [address, setAddress] = useState(_address || '');

  /* Callback */
  const handlePost = useCallback(() => {
    console.log('登録');
  }, []);

  const handleAddress2PostNo = useCallback(() => {
    console.log('');
  }, []);

  const handlePostNo2Address = useCallback(() => {
    console.log('登録');
  }, []);

  const className = `search_postaddress_dialog ${UserAgent}`;

  return (UserAgent === 'pc'
    ? (
      <div className={className} style={{ display: 'flex' }}>
        <section>
          <div>
            郵便番号
            <Input />
            <Input />
            <Button>
              郵便番号から住所検索
            </Button>
          </div>
          <div>
            都道府県
            <Select
              value={pref}
              defaultLabel="指定無し"
              options={
                prefectures.map((v) => ({
                  text: v.label, value: v.value,
                }))
              }
              onChange={(v) => setPref(Number(v))}
            />
            <Button>
              住所から郵便番号検索
            </Button>
          </div>
          <div>
            市区町村
            <Select
              value={pref}
              defaultLabel="指定無し"
              options={
                prefectures.map((v) => ({
                  text: v.label, value: v.value,
                }))
              }
              onChange={(v) => setPref(Number(v))}
            />
          </div>
          <div>
            町名
            <Input />
          </div>
        </section>
        <section>
          <Table
            className="table_selectable table_sortable table_sticky"
            header={['〒', '住所']}
            onClickRow={() => { }}
            onDbClick={() => { }}
            // eslint-disable-next-line
            sort={{ onClick: (order: any, index: any) => { } }}
            rowDataList={[]}
            lists={[]}
          />
        </section>
      </div>
    )
    : (
      <div className={className}>
        a
      </div>
    ));
};
