import { DownloadFloodWarning } from './DownloadFloodWarning';

describe('DownloadFloodWarning', () => {
  let downloader: DownloadFloodWarning;

  beforeEach(() => {
    downloader = new DownloadFloodWarning();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('downloadXml', () => {
    it('should download and read the XML file', async () => {
      // Arrange
      const key = 'test';
      const expectedXml = '<xml><test>123</test></xml>';

      const readFileSyncSpy = jest.spyOn(downloader as any, 'downloadAsXml').mockReturnValue(expectedXml);

      // Act
      const result = await downloader.downloadAsXml(key);

      // Assert
      expect(result).toEqual(expectedXml);
      expect(readFileSyncSpy).toHaveBeenCalledWith(key);
    });

    it('should throw an Error if non existent file is not found', async () => {
      // Arrange
      const key = 'non_existent_file';

      // Assert
      await expect(downloader.downloadAsXml(key)).rejects.toThrow(`${key}.amoc.xml not found`);
    });
  });

  describe('downloadText', () => {
    it('should download and read the text file', async () => {
      // Arrange
      const key = 'test';
      const expectedText = 'This is a test file.';

      const readFileSyncSpy = jest.spyOn(downloader as any, 'downloadAsText').mockReturnValue(expectedText);

      // Act
      const result = await downloader.downloadAsText(key);

      // Assert
      expect(result).toEqual(expectedText);
      expect(readFileSyncSpy).toHaveBeenCalledWith(key);
    });

    it('should return empty string if file not found', async () => {
      // Arrange
      const key = 'non_existent_file';

      // Assert
      expect(downloader.downloadAsText(key)).rejects.toThrowError(" FTPError: 550 Failed to open file.");
    });
  });
});
