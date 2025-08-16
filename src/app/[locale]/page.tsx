import { useTranslations } from 'next-intl';
import PokemonSearchPage from '@components/Main';
import Menu from '@components/Menu';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <header>
        <Menu />
      </header>
      <h1>{t('title')}</h1>
      <PokemonSearchPage />
    </div>
  );
}
