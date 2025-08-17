'use client';
import { useCallback, useEffect, useState } from 'react';
import Pagination from './Pagination';
import './CardList.css';
import { ITEMS_PER_PAGE } from './../../shared/constants';
// import SelectedMenu from './SelectedItemsMenu';
import Cardlist from './Cardlist';
import type { PokeItem } from './../../types/Pokemontypes';
import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

interface PagedlistProps {
  filteredPokeList: Array<PokeItem>;
}

export default function Pagedlist(props: PagedlistProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<PokeItem[]>([]);

  const [totalPages, settotalPages] = useState(10);

  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const [currentPage, setPage] = useState(parseInt(page || '1', 10));

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const router = useRouter();
  const pathname = usePathname();

  const setPageInQueryString = (page: number) => {
    router.push(pathname + '?' + createQueryString('page', page.toString()));
    setPage(page);
  };

  const validate = () => {
    if (isNaN(currentPage) || currentPage < 1) {
      return <div>Incorrect page number</div>;
    }

    if (currentPage > totalPages) {
      return (
        <div>
          <h1>404 - Page not found</h1>
          <p>
            Page {currentPage} not exists. Total pages: {totalPages}.
          </p>
          <Link href={`/?page=${totalPages}`}>Go to last page</Link>
        </div>
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const getPageCount = async () => {
      try {
        settotalPages(
          Math.ceil(props.filteredPokeList.length / ITEMS_PER_PAGE)
        );
        setPage(1);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? 'Error: ' + err.message : 'Error');
      }
    };
    getPageCount();
  }, [props.filteredPokeList]);

  useEffect(() => {
    validate();
    setLoading(true);
    const loadData = async () => {
      try {
        let resultData: Array<PokeItem> = [];

        const data = props.filteredPokeList;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        resultData = data.slice(startIndex, endIndex);

        setData(resultData);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? 'Error: ' + err.message
            : 'Error has been occured!'
        );
        setData([]);
      }
    };
    loadData();
  }, [currentPage, props.filteredPokeList]);

  if (loading) return <div id="pokemonTable">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data == null || data.length <= 0) return <div>No items found</div>;
  return (
    <div>
      <Provider store={store}>
        <Cardlist pagedList={data} />
        <Pagination
          page={currentPage}
          sendPageUp={(page) => {
            setPageInQueryString(page);
          }}
          totalPages={totalPages}
        />
      </Provider>
    </div>
  );
}
