import * as util from '../../src/util';

describe('Util Unit Tests', () => {
  describe('normalizeAmount()', () => {
    it('should filter out non-numeric characters', () => {
      expect(util.normalizeAmount('abc1_23.45xyz')).toBe('123.45');
      expect(util.normalizeAmount('$100,000')).toBe('100,000');
      expect(util.normalizeAmount('-1a2b3c.4d5')).toBe('123.45');
    });

    it('should add leading zero to lone decimal separator', () => {
      expect(util.normalizeAmount('.')).toBe('0.');
      expect(util.normalizeAmount(',')).toBe('0,');
      expect(util.normalizeAmount('.1')).toBe('0.1');
      expect(util.normalizeAmount(',1')).toBe('0,1');
      expect(util.normalizeAmount(',1.2')).toBe('0,12');
      expect(util.normalizeAmount('.1,2')).toBe('0.12');
    });

    it('should keep only the first decimal separator', () => {
      expect(util.normalizeAmount('123.456.7,8.9')).toBe('123.456789');
      expect(util.normalizeAmount('123,4.56,78.9')).toBe('123,456789');
      expect(util.normalizeAmount('123.456,789')).toBe('123.456789');
      expect(util.normalizeAmount('1.234.567.890')).toBe('1.234567890');
      expect(util.normalizeAmount('.234,567.8-90')).toBe('0.234567890');
    });

    it('should handle empty or invalid input', () => {
      expect(util.normalizeAmount('')).toBe('');
      expect(util.normalizeAmount('abc')).toBe('');
      expect(util.normalizeAmount('!@#-')).toBe('');
    });
  });

  describe('formatNumber()', () => {
    it('should work for undefined', () => {
      const num = util.formatNumber(undefined);
      expect(num).toBe('0');
    });

    it('should work for NaN', () => {
      const num = util.formatNumber(NaN);
      expect(num).toBe('0');
    });

    it('should work for null', () => {
      const num = util.formatNumber(null);
      expect(num).toBe('0');
    });

    it('should work for string input', () => {
      const num = util.formatNumber('1000000');
      expect(num).toMatch(/^1[,.]0{3}[,.]0{3}$/);
    });

    it('should work for number input', () => {
      const num = util.formatNumber(1000000);
      expect(num).toMatch(/^1[,.]0{3}[,.]0{3}$/);
    });

    it('should have 8 decimal values max', () => {
      const num = util.formatNumber(0.000000011);
      expect(num).toMatch(/^0[,.]0{7}1{1}$/);
    });
  });

  describe('formatFiat()', () => {
    it('should work for undefined', () => {
      const num = util.formatFiat(undefined, 'usd');
      expect(num).toMatch(/0[,.]0{2}/);
    });

    it('should work for NaN', () => {
      const num = util.formatFiat(NaN, 'usd');
      expect(num).toMatch(/0[,.]0{2}/);
    });

    it('should work for null', () => {
      const num = util.formatFiat(null, 'usd');
      expect(num).toMatch(/0[,.]0{2}/);
    });

    it('should work for string input', () => {
      const num = util.formatFiat('1000000', 'usd');
      expect(num).toMatch(/1[,.]0{3}[,.]0{3}[,.]0{2}/);
      expect(num).toMatch(/\${1}/);
    });

    it('should work for number input', () => {
      const num = util.formatFiat(1000000, 'usd');
      expect(num).toMatch(/1[,.]0{3}[,.]0{3}[,.]0{2}/);
      expect(num).toMatch(/\${1}/);
    });

    it('should display one cent', () => {
      const num = util.formatFiat(0.01, 'usd');
      expect(num).toMatch(/0[,.]0{1}1{1}/);
      expect(num).toMatch(/\${1}/);
      expect(num).not.toMatch(/^< /);
    });

    it('should round up to one cent', () => {
      const num = util.formatFiat(0.005, 'usd');
      expect(num).toMatch(/0[,.]0{1}1{1}/);
      expect(num).toMatch(/\${1}/);
      expect(num).not.toMatch(/^< /);
    });

    it('should display less than a cent', () => {
      const num = util.formatFiat(0.004, 'usd');
      expect(num).toMatch(/0[,.]0{1}1{1}/);
      expect(num).toMatch(/\${1}/);
      expect(num).toMatch(/^< /);
    });

    it('should display less than a cent for small numbers', () => {
      const num = util.formatFiat(0.0000001, 'usd');
      expect(num).toMatch(/0[,.]0{1}1{1}/);
      expect(num).toMatch(/\${1}/);
      expect(num).toMatch(/^< /);
    });

    it('should display less than a cent for negative small numbers', () => {
      const num = util.formatFiat(0.999999 - 1, 'usd');
      expect(num).toMatch(/0[,.]0{1}1{1}/);
      expect(num).toMatch(/\${1}/);
      expect(num).toMatch(/^< -/);
    });

    it('should display 0.00 without less than', () => {
      const num = util.formatFiat(0.0, 'usd');
      expect(num).toMatch(/0[,.]0{2}/);
      expect(num).toMatch(/\${1}/);
      expect(num).not.toMatch(/^< /);
    });
  });

  describe('parseDate()', () => {
    it('should throw error if timeStamp is undefined', () => {
      expect(util.parseDate.bind(null, undefined)).toThrow(/Invalid/);
    });

    it('should throw error if timeStamp is null', () => {
      expect(util.parseDate.bind(null, null)).toThrow(/Invalid/);
    });

    it('should throw error for empty timeStamp', () => {
      expect(util.parseDate.bind(null, '')).toThrow(/Invalid/);
    });

    it('should throw error if timeStamp is not a number', () => {
      expect(util.parseDate.bind(null, 'not-a-number')).toThrow(/Invalid/);
    });

    it('should throw error for decimal values', () => {
      expect(util.parseDate.bind(null, 100000.9)).toThrow(/Invalid/);
    });

    it('should work for 0', () => {
      const date = util.parseDate(0);
      expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z');
    });

    it('should work for 1', () => {
      const date = util.parseDate(1);
      expect(date.toISOString()).toBe('1970-01-01T00:00:01.000Z');
    });

    it('should work for number input', () => {
      const date = util.parseDate(1527070395);
      expect(date.toISOString()).toBe('2018-05-23T10:13:15.000Z');
    });
  });

  describe('toSatoshis()', () => {
    let settings;

    beforeEach(() => {
      settings = {
        displayFiat: false,
        unit: 'btc',
        fiat: 'usd',
        exchangeRate: { usd: 0.00014503 },
      };
    });

    it('should throw error if amount is undefined', () => {
      expect(util.toSatoshis.bind(null, undefined, settings)).toThrow(/Invalid/);
    });

    it('should throw error if amount is null', () => {
      expect(util.toSatoshis.bind(null, null, settings)).toThrow(/Invalid/);
    });

    it('should throw error if amount is number', () => {
      expect(util.toSatoshis.bind(null, 0.1, settings)).toThrow(/Invalid/);
    });

    it('should throw error if settings is undefined', () => {
      expect(util.toSatoshis.bind(null, '100', undefined)).toThrow(/Invalid/);
    });

    it('should throw error for wrong settings', () => {
      expect(util.toSatoshis.bind(null, '100', {})).toThrow(/Invalid/);
    });

    it('should be 0 for empty amount', () => {
      const num = util.toSatoshis('', settings);
      expect(num).toBe(0);
    });

    it('should work for string amount', () => {
      const num = util.toSatoshis('0.10', settings);
      expect(num).toBe(10000000);
    });

    it('should work for string amount with comma', () => {
      const num = util.toSatoshis('0,10', settings);
      expect(num).toBe(10000000);
    });

    it('should have use ony 8 decimal values', () => {
      const num = util.toSatoshis('0.000000014', settings);
      expect(num).toBe(1);
    });

    it('should round up to two satoshis', () => {
      const num = util.toSatoshis('0.000000019', settings);
      expect(num).toBe(2);
    });

    it('should be 0 is exchange rate is not set (fiat)', () => {
      settings.displayFiat = true;
      settings.fiat = 'invalid';
      const num = util.toSatoshis('100', settings);
      expect(num).toBe(0);
    });

    it('should be 0 for empty amount (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toSatoshis('', settings);
      expect(num).toBe(0);
    });

    it('should work for string amount (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toSatoshis('10.00', settings);
      expect(num).toBe(145030);
    });
  });

  describe('toAmount()', () => {
    let settings;

    beforeEach(() => {
      settings = {
        displayFiat: false,
        unit: 'btc',
        fiat: 'usd',
        exchangeRate: { usd: 0.00014503 },
      };
    });

    it('should throw error if satoshis is undefined', () => {
      expect(util.toAmount.bind(null, undefined, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is null', () => {
      expect(util.toAmount.bind(null, null, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is not a number', () => {
      expect(util.toAmount.bind(null, 'not-a-number', settings)).toThrow(/Invalid/);
    });

    it('should throw error for string number', () => {
      expect(util.toAmount.bind(null, '100', settings)).toThrow(/Invalid/);
    });

    it('should throw error if unit is invalid', () => {
      expect(util.toAmount.bind(null, 100, 'not-a-unit')).toThrow(/Invalid/);
    });

    it('should throw error if settings is undefined', () => {
      expect(util.toAmount.bind(null, 100, undefined)).toThrow(/Invalid/);
    });

    it('should throw error if settings is invalid', () => {
      expect(util.toAmount.bind(null, 100, {})).toThrow(/Invalid/);
    });

    it('should throw error for non-integer numbers', () => {
      expect(util.toAmount.bind(null, 100000000.9, settings)).toThrow(/Invalid/);
    });

    it('should work for number input', () => {
      const num = util.toAmount(100000000, settings);
      expect(num).toBe('1');
    });

    it('should not format number input', () => {
      const num = util.toAmount(100000000000, settings);
      expect(num).toBe('1000');
    });

    it('should use period for decimals values', () => {
      const num = util.toAmount(10000000, settings);
      expect(num).toBe('0.1');
    });

    it('should work for 0', () => {
      const num = util.toAmount(0, settings);
      expect(num).toBe('');
    });

    it('should work for 1', () => {
      const num = util.toAmount(1, settings);
      expect(num).toBe('0.00000001');
    });

    it('should work for 10', () => {
      const num = util.toAmount(10, settings);
      expect(num).toBe('0.0000001');
    });

    it('should work for 100', () => {
      const num = util.toAmount(100, settings);
      expect(num).toBe('0.000001');
    });

    it('should work for 1000', () => {
      const num = util.toAmount(1000, settings);
      expect(num).toBe('0.00001');
    });

    it('should be infinity if exchange rate is not set (fiat)', () => {
      settings.displayFiat = true;
      settings.fiat = 'invalid-fiat';
      const rate = util.toAmount(100, settings);
      expect(rate).toMatch(/∞/);
    });

    it('should work for long number input (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(100000, settings);
      expect(num).toBe('6.89512515');
    });

    it('should work for number input (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(100000, settings, 2);
      expect(num).toBe('6.9');
    });

    it('should work for number input (fiat, three decimal places)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(100000, settings, 3);
      expect(num).toBe('6.895');
    });

    it('should use period for decimals values (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(100000000, settings);
      expect(num).toBe('6895.12514652');
    });

    it('should work for 0 (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(0, settings);
      expect(num).toBe('');
    });

    it('should work for 1 (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(1, settings);
      expect(num).toBe('0.00006895');
    });

    it('should work for 1000 (fiat)', () => {
      settings.displayFiat = true;
      const num = util.toAmount(1000, settings);
      expect(num).toBe('0.06895125');
    });
  });

  describe('calculateExchangeRate()', () => {
    let settings;

    beforeEach(() => {
      settings = {
        fiat: 'usd',
        exchangeRate: { usd: 0.00014503 },
        displayFiat: true,
      };
    });

    it('should throw error if satoshis is undefined', () => {
      expect(util.calculateExchangeRate.bind(null, undefined, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is null', () => {
      expect(util.calculateExchangeRate.bind(null, null, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is string', () => {
      expect(util.calculateExchangeRate.bind(null, '100000', settings)).toThrow(/Invalid/);
    });

    it('should throw error for non-integer numbers', () => {
      expect(util.calculateExchangeRate.bind(null, 100000000.9, settings)).toThrow(/Invalid/);
    });

    it('should throw error if settings is undefined', () => {
      expect(util.calculateExchangeRate.bind(null, 100000, undefined)).toThrow(/Cannot read propert/);
    });

    it('should throw error if settings is invalid', () => {
      expect(util.calculateExchangeRate.bind(null, 100000, {})).toThrow(/Invalid/);
    });

    it('should work for a number value', () => {
      const rate = util.calculateExchangeRate(100000, settings);
      expect(rate).toBe(6.8951251465214085);
    });

    it('should be infinite for unknown rate', () => {
      settings.fiat = 'eur';
      const rate = util.calculateExchangeRate(100000, settings);
      expect(rate).toBe(Infinity);
    });
  });

  describe('toFiatLabel()', () => {
    let settings;

    beforeEach(() => {
      settings = {
        unit: 'btc',
        fiat: 'usd',
        exchangeRate: { usd: 0.00014503 },
        displayFiat: true,
      };
    });

    it('should throw error if satoshis is undefined for fiat', () => {
      expect(util.toFiatLabel.bind(null, undefined, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is null for fiat', () => {
      expect(util.toFiatLabel.bind(null, null, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is empty for fiat', () => {
      expect(util.toFiatLabel.bind(null, '', settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is undefined for amount', () => {
      settings.displayFiat = false;
      expect(util.toFiatLabel.bind(null, undefined, settings)).toThrow(/Invalid/);
    });

    it('should throw error if satoshis is string value', () => {
      settings.displayFiat = false;
      expect(util.toFiatLabel.bind(null, '100000', settings)).toThrow(/Invalid/);
    });

    it('should throw error if settings is undefined', () => {
      expect(util.toFiatLabel.bind(null, 100000, undefined)).toThrow(/Cannot read propert/);
    });

    it('should throw error if settings is invalid', () => {
      expect(util.toFiatLabel.bind(null, 100000, {})).toThrow(/Invalid/);
    });

    it('should convert number value to fiat', () => {
      const lbl = util.toFiatLabel(100000, settings);
      expect(lbl).toMatch(/6{1}[,.]9{1}0{1}/);
    });

    it('should format a fiat value even when false', () => {
      settings.displayFiat = false;
      const lbl = util.toFiatLabel(100000, settings);
      expect(lbl).toMatch(/6{1}[,.]9{1}0{1}/);
    });
  });

  describe('toSatLabel()', () => {
    it('should work for undefined', () => {
      const lbl = util.toSatLabel(undefined);
      expect(lbl).toBe('0 sats');
    });

    it('should work for NaN', () => {
      const lbl = util.toSatLabel(NaN);
      expect(lbl).toBe('0 sats');
    });

    it('should work for null', () => {
      const lbl = util.toSatLabel(null);
      expect(lbl).toBe('0 sats');
    });

    it('should work for empty string', () => {
      const lbl = util.toSatLabel('');
      expect(lbl).toBe('0 sats');
    });

    it('should format a 0', () => {
      const lbl = util.toSatLabel(0);
      expect(lbl).toBe('0 sats');
    });

    it('should format a sat string value', () => {
      const lbl = util.toSatLabel('100000000');
      expect(lbl).toMatch(/^1{1}0{2}[,.]{1}0{3}[,.]{1}0{3} sats$/);
    });

    it('should format a sat number value', () => {
      const lbl = util.toSatLabel(100000000);
      expect(lbl).toMatch(/^1{1}0{2}[,.]{1}0{3}[,.]{1}0{3} sats$/);
    });
  });

  describe('poll()', () => {
    it('should poll three times', async () => {
      let counter = 0;
      const api = () =>
        new Promise(resolve => {
          if (++counter === 3) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      const response = await util.poll(api, 1, 10);
      expect(response).toBe(true);
      expect(counter).toBe(3);
    });

    it('should throw an error after ten retries', async () => {
      expect.assertions(2);
      let counter = 0;
      const api = () =>
        new Promise(resolve => {
          if (++counter === 11) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      try {
        await util.poll(api, 1, 10);
      } catch(err) {
        expect(err.message).toMatch(/retries/);
      }
      expect(counter).toBe(10);
    });
  });
});
