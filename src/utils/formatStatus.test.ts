import { describe, expect, it } from 'vitest';
import { formatStatus } from './formatStatus';

describe('formatStatus', () => {
  it.each([
    ['pending', 'Pending'],
    ['in_progress', 'In progress'],
    ['completed', 'Completed'],
    ['rejected', 'Rejected'],
    ['reviewed', 'Reviewed'],
    ['archived', 'Archived'],
  ])('formats %s as %s', (status, label) => {
    expect(formatStatus(status)).toBe(label);
  });

  it('handles the old hyphenated spelling', () => {
    expect(formatStatus('in-progress')).toBe('In progress');
  });

  it('shows Unknown when there is no status', () => {
    expect(formatStatus(null)).toBe('Unknown');
    expect(formatStatus('')).toBe('Unknown');
  });
});
