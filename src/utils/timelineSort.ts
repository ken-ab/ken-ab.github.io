import type { TimelineEntry } from "../data/portfolio";

const emphasisRank: Record<NonNullable<TimelineEntry["emphasis"]>, number> = {
  featured: 3,
  medium: 2,
  compact: 1,
};

type PeriodBounds = {
  latest: number;
  earliest: number;
};

function toMonthIndex(year: number, month: number) {
  return year * 100 + month;
}

function parsePeriodBounds(period: string): PeriodBounds {
  const dates: number[] = [];
  const datePattern = /(\d{4})[./-](\d{1,2})|(\d{1,2})\/(\d{4})/g;

  for (const match of period.matchAll(datePattern)) {
    if (match[1] && match[2]) {
      dates.push(toMonthIndex(Number(match[1]), Number(match[2])));
    } else if (match[3] && match[4]) {
      dates.push(toMonthIndex(Number(match[4]), Number(match[3])));
    }
  }

  if (!dates.length) {
    return { latest: 0, earliest: 0 };
  }

  return {
    latest: Math.max(...dates),
    earliest: Math.min(...dates),
  };
}

function getEmphasisRank(entry: TimelineEntry) {
  return entry.emphasis ? emphasisRank[entry.emphasis] : emphasisRank.medium;
}

export function sortTimelineEntries<T extends TimelineEntry>(items: T[]) {
  return items
    .map((item, index) => ({
      item,
      index,
      bounds: parsePeriodBounds(item.period),
    }))
    .sort((a, b) => {
      const latestDiff = b.bounds.latest - a.bounds.latest;
      if (latestDiff) return latestDiff;

      const emphasisDiff = getEmphasisRank(b.item) - getEmphasisRank(a.item);
      if (emphasisDiff) return emphasisDiff;

      const earliestDiff = b.bounds.earliest - a.bounds.earliest;
      if (earliestDiff) return earliestDiff;

      return a.index - b.index;
    })
    .map(({ item }) => item);
}
