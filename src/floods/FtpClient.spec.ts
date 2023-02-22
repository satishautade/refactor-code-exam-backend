import { FtpClient } from "./FtpClient";

describe("FtpClient", () => {
  let ftpClient: FtpClient;

  beforeEach(() => {
    ftpClient = new FtpClient();
  });

  afterEach(async () => {
    await ftpClient.close();
  });

  test("connects to FTP server and lists files in directory", async () => {
    const ftpClient = new FtpClient();
  
    await ftpClient.connect();
    await ftpClient.changeWorkingDirectory();
    const files = await ftpClient.listFiles();
  
    expect(files.length).toBeGreaterThan(1);
    
    await ftpClient.close();
  });

  // it("should change working directory on the FTP server", async () => {
  //   await ftpClient.connect();
  //   await ftpClient.changeWorkingDirectory("/anon/gen/fwo/");

  //   expect(ftpClient["client"].pwd()).toBe("/anon/gen/fwo/");
  // });

  // it("should list files in the remote directory", async () => {
  //   await ftpClient.connect();
  //   await ftpClient.changeWorkingDirectory("/anon/gen/fwo");

  //   const files = await ftpClient.listFiles();

  //   expect(files).toContain("VIC.amoc.xml");
  //   expect(files).toContain("NSW.amoc.xml");
  //   expect(files).toContain("QLD.amoc.xml");
  // });
});




