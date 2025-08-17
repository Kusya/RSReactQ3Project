import { useTranslations } from 'next-intl';
import PokemonSearchPage from '@components/Main';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1 className="px-8">{t('title')}</h1>
      <PokemonSearchPage />
    </div>
  );
}
