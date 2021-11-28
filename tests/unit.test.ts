import { LinkedInParser } from '../src/linkedin_parser/linkedin_parser';

const defaultOptions = {
  headless: true,
  keepAlive: false,
  sessionCookieValue: 'test',
  timeout: 10000,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
};

describe('LinkedInProfileScraper', () => {
  describe('options', () => {
    it('should set the default options', () => {
      const scraper = new LinkedInParser({
        sessionCookieValue: 'test',
      });

      expect(scraper.options).toMatchObject(defaultOptions);
    });

    it('should set the headless option', () => {
      const scraper = new LinkedInParser({
        headless: false,
        sessionCookieValue: 'test',
      });

      expect(scraper.options).toMatchObject({
        ...defaultOptions,
        headless: false,
      });
    });

    it('should error when headless is not a boolean', () => {
      try {
        new LinkedInParser({
          headless: 'something' as any,
          sessionCookieValue: 'test',
        });
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "headless" needs to be a boolean.'
        );
      }
    });

    it('should set the keepAlive option', () => {
      const scraper = new LinkedInParser({
        keepAlive: true,
        sessionCookieValue: 'test',
      });

      expect(scraper.options).toMatchObject({
        ...defaultOptions,
        keepAlive: true,
      });
    });

    it('should error when keepAlive is not a boolean', () => {
      try {
        new LinkedInParser({
          keepAlive: 'something' as any,
          sessionCookieValue: 'test',
        });
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "keepAlive" needs to be a boolean.'
        );
      }
    });

    it('should have the sessionCookieValue option', () => {
      try {
        new LinkedInParser({} as any);
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "sessionCookieValue" is required.'
        );
      }
    });

    it('should set the sessionCookieValue option', () => {
      const scraper = new LinkedInParser({
        sessionCookieValue: 'test-again',
      });

      expect(scraper.options).toMatchObject({
        ...defaultOptions,
        sessionCookieValue: 'test-again',
      });
    });

    it('should error when sessionCookieValue is not a string', () => {
      try {
        new LinkedInParser({
          sessionCookieValue: 123 as any,
        });
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "sessionCookieValue" needs to be a string.'
        );
      }
    });

    it('should set the timeout option', () => {
      const scraper = new LinkedInParser({
        timeout: 30000,
        sessionCookieValue: 'test',
      });

      expect(scraper.options).toMatchObject({
        ...defaultOptions,
        timeout: 30000,
      });
    });

    it('should error when timeout is not a number', () => {
      try {
        new LinkedInParser({
          timeout: '1000' as any,
          sessionCookieValue: 'test',
        });
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "timeout" needs to be a number.'
        );
      }
    });

    it('should set the userAgent option', () => {
      const scraper = new LinkedInParser({
        userAgent: 'test agent',
        sessionCookieValue: 'test',
      });

      expect(scraper.options).toMatchObject({
        ...defaultOptions,
        userAgent: 'test agent',
      });
    });

    it('should error when userAgent is not a string', () => {
      try {
        new LinkedInParser({
          userAgent: 123 as any,
          sessionCookieValue: 'test',
        });
      } catch (err) {
        expect(err.message).toBe(
          'Error during setup. Option "userAgent" needs to be a string.'
        );
      }
    });
  });
});
