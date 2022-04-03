import { ProductResponseWithFav } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductResponseWithFav;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/currentUser/${kind}`);

  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.title}
          price={record.product.price}
          hearts={record.product._count.fav}
        />
      ))}
    </>
  ) : null;
}
