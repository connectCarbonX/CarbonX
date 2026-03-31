import {
  collection,
  type DocumentData,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type SiteConstants = {
  kg: string;
  km: string;
  liter: string;
};

export const EMPTY_SITE_CONSTANTS: SiteConstants = {
  kg: '',
  km: '',
  liter: '',
};

const METRIC_KEYS = ['kg', 'km', 'liter'] as const;
type MetricKey = (typeof METRIC_KEYS)[number];

function normalizeValue(value: unknown, fallback: string) {
  if (typeof value === 'number' || typeof value === 'string') {
    const text = String(value).trim();
    return text.length ? text : fallback;
  }

  return fallback;
}

function assignMetricValue(target: SiteConstants, key: MetricKey, value: unknown) {
  target[key] = normalizeValue(value, target[key]);
}

function mapCollectionSnapshot(snapshot: QuerySnapshot<DocumentData>): SiteConstants {
  const mapped = { ...EMPTY_SITE_CONSTANTS };

  snapshot.forEach((entry) => {
    const data = entry.data();

    if (entry.id === 'metrics') {
      assignMetricValue(mapped, 'kg', data.kg);
      assignMetricValue(mapped, 'km', data.km);
      assignMetricValue(mapped, 'liter', data.liter);
      return;
    }

    if (entry.id === 'kg' || data.key === 'kg') {
      assignMetricValue(mapped, 'kg', data.value ?? data.kg);
    }

    if (entry.id === 'km' || data.key === 'km') {
      assignMetricValue(mapped, 'km', data.value ?? data.km);
    }

    if (entry.id === 'liter' || data.key === 'liter') {
      assignMetricValue(mapped, 'liter', data.value ?? data.liter);
    }

    METRIC_KEYS.forEach((key) => {
      if (key in data) {
        assignMetricValue(mapped, key, data[key]);
      }
    });
  });

  return mapped;
}

export async function readSiteConstants(): Promise<SiteConstants> {
  const collectionSnapshot = await getDocs(collection(db, 'constant'));

  if (!collectionSnapshot.empty) {
    return mapCollectionSnapshot(collectionSnapshot);
  }

  const metricsSnapshot = await getDoc(doc(db, 'constant', 'metrics'));

  if (!metricsSnapshot.exists()) {
    return { ...EMPTY_SITE_CONSTANTS };
  }

  const data = metricsSnapshot.data();

  return {
    kg: normalizeValue(data.kg, EMPTY_SITE_CONSTANTS.kg),
    km: normalizeValue(data.km, EMPTY_SITE_CONSTANTS.km),
    liter: normalizeValue(data.liter, EMPTY_SITE_CONSTANTS.liter),
  };
}

export function subscribeToSiteConstants(
  onUpdate: (constants: SiteConstants) => void,
  onError?: (error: unknown) => void
) {
  return onSnapshot(
    collection(db, 'constant'),
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate({ ...EMPTY_SITE_CONSTANTS });
        return;
      }

      onUpdate(mapCollectionSnapshot(snapshot));
    },
    (error) => {
      onError?.(error);
    }
  );
}
