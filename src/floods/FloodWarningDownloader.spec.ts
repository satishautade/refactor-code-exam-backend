import FloodWarningDownloader from "./FloodWarningDownloader";
/**
 * NOTE: Ideally the unit tests shouldn't be going over the wire.
 * These unit tests call the actual FPT server and download files. 
 * 
 * FUTURE REFACTOR should replace these with a mocked version of FloodWarningDownloader that has fixed 
 * set of files to validate the functionality of filtering the files we are interested in. 
 * 
 * This is too much of an effort to go through in the coding challenge :)
 */
describe("FloodWarningDownloader should be getting warning data", () => {
  let downloader: FloodWarningDownloader;
  
  beforeAll(() => {
    downloader = new FloodWarningDownloader();
  });

  afterAll(async () => {
    await downloader.close();
  });

  it("should download data", async () => {
    const warnings = await downloader.getWarnings();

    expect(warnings.length).toBeGreaterThan(1);
  });

  it("should download data", async () => {
    const warnings = await downloader.getWarnings();

    expect(warnings).toContain("IDQ11307.amoc.xml");
  });
  
});
