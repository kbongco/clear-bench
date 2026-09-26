import { describe, expect, it } from 'vitest';
import type { SampleWithOwner } from '../types/Samples/sample';
import { filterSamples } from './filterSamples';

function makeSample(overrides: Partial<SampleWithOwner>): SampleWithOwner {
  return {
    id: 1,
    name: 'Sample',
    scientist_id: 1,
    lab_tech_id: null,
    sample_type: null,
    test_status: 'pending',
    test_start: null,
    due_date: null,
    test_duration: null,
    out_of_spec: false,
    totalBottles: 1,
    temperature: [],
    notes: null,
    scientist: { id: 1, name: 'Dr. Alice Nguyen', department: 'Food Safety' },
    ...overrides,
  };
}

const yogurt = makeSample({
  id: 1,
  name: 'Strawberry Yogurt',
  sample_type: 'Dairy',
  scientist: { id: 1, name: 'Dr. Alice Nguyen', department: 'Food Safety' },
});
const lotion = makeSample({
  id: 2,
  name: 'Rose Lotion',
  sample_type: 'Cosmetics',
  scientist: { id: 2, name: 'Dr. Marcus Lee', department: 'Cosmetics' },
});
const culture = makeSample({
  id: 3,
  name: 'Culture Plate',
  sample_type: null,
  scientist: { id: 3, name: 'Dr. Priya Patel', department: null },
});

const samples = [yogurt, lotion, culture];

describe('filterSamples', () => {
  it('returns the same array when the search is empty', () => {
    expect(filterSamples(samples, '')).toBe(samples);
  });

  it('returns the same array when the search is only spaces', () => {
    expect(filterSamples(samples, '   ')).toBe(samples);
  });

  it('matches the sample name', () => {
    expect(filterSamples(samples, 'yogurt')).toEqual([yogurt]);
  });

  it('matches the scientist name', () => {
    expect(filterSamples(samples, 'marcus')).toEqual([lotion]);
  });

  it('matches the team', () => {
    expect(filterSamples(samples, 'food safety')).toEqual([yogurt]);
  });

  it('matches the sample type', () => {
    expect(filterSamples(samples, 'dairy')).toEqual([yogurt]);
  });

  it('ignores case', () => {
    expect(filterSamples(samples, 'ROSE')).toEqual([lotion]);
  });

  it('ignores spaces around the search', () => {
    expect(filterSamples(samples, '  culture  ')).toEqual([culture]);
  });

  it('matches part of a word', () => {
    expect(filterSamples(samples, 'lot')).toEqual([lotion]);
  });

  it('returns every match, in the original order', () => {
    expect(filterSamples(samples, 'dr.')).toEqual([yogurt, lotion, culture]);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterSamples(samples, 'kombucha')).toEqual([]);
  });

  it('handles a missing team and sample type', () => {
    expect(() => filterSamples([culture], 'anything')).not.toThrow();
    expect(filterSamples([culture], 'priya')).toEqual([culture]);
  });

  it('does not change the list it was given', () => {
    const copy = [...samples];
    filterSamples(samples, 'yogurt');
    expect(samples).toEqual(copy);
  });
});
