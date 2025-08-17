import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { removeAll } from './../lib/features/selected/selectedSlice';
import saveAs from 'file-saver';
import { createFile } from './../actions/loadFile';
import { useTranslations } from 'next-intl';

export default function SelectedMenu() {
  const [error, setError] = useState<string | null>(null);
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const dispatch = useAppDispatch();
  const t = useTranslations('SelectedMenu');

  const loadData = async () => {
    try {
      const { data } = await createFileWithData();
      const file = new File(data, `${selected.length}_items.csv`, {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(file);
    } catch (err) {
      console.error('Error: ' + err);
      setError('Failed to load data for downloading.');
    }
  };
  const createFileWithData = createFile.bind(null, selected);
  if (error) return <div data-testid="error">Error: {error}</div>;
  return (
    <>
      {selected.length > 0 ? (
        <div className="p-2">
          {t('items_test')}: {selected.length}
          <button
            className="border border-solid border-gray-300 rounded-md px-2 mx-2"
            onClick={() => {
              dispatch(removeAll());
            }}
          >
            {t('unselect_btn')}
          </button>
          <button
            className="border border-solid border-gray-300 rounded-md px-2 mx-2"
            onClick={loadData}
          >
            {t('load_btn')}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
