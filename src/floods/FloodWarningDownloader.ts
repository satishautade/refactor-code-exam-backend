import { FtpClient, FtpOptions } from "./FtpClient";

class FloodWarningDownloader {

  private ftpClient: FtpClient;

  constructor() {
    this.ftpClient = new FtpClient();
  }

  public async getWarnings(): Promise<string[]> {
    try {
      await this.ftpClient.connect();

      await this.ftpClient.changeWorkingDirectory();

      const files = await this.ftpClient.listFiles();

      //   let warns: any = {};
      // for (var file in files) {
      //   if (files[file].name.endsWith(".amoc.xml")) {
      //     warns[files[file].name] = true;
      //   }
      // }

      const warns: string[] = files
        .filter((file) => file.endsWith(".amoc.xml"))

      return warns;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      await this.ftpClient.close();
    }
  }

  public async close(){
    await this.ftpClient.close();
  }
}

export default FloodWarningDownloader;
