import { formatDistance } from 'date-fns/formatDistance';
import { enUS } from 'date-fns/locale/en-US';

export const dateDistance = (target: number, now?: number) =>
  formatDistance(new Date(target), now ? new Date(now) : new Date(), {
    locale: enUS,
    addSuffix: true,
  });
