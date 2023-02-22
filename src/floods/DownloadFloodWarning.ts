import { FtpClient } from "./FtpClient";
import fs from "fs/promises";
import path from "path";

export class DownloadFloodWarning {
  private ftpClient: FtpClient;

  constructor() {
    this.ftpClient = new FtpClient();
  }

  async downloadAsXml(key: string): Promise<string> {
    await this.ftpClient.connect();
    await this.ftpClient.changeWorkingDirectory();

    const files = await this.ftpClient.listFiles();
    const fileToDownload = files.find((file) => file.endsWith(".amoc.xml") && file.includes(key));

    if (!fileToDownload) {
      throw new Error(`${key}.amoc.xml not found`);
    }

    await this.ftpClient.downloadFile(`${key}.xml`, fileToDownload);

    const data = await this.readData(path.join(__dirname,'..', '..', 'ftp-downloads', `${key}.xml`));

    // await fs.unlink(path.join(__dirname,'..', '..', 'ftp-downloads', `${key}.xml`));

    return data;
  }

  async downloadText(key: string): Promise<string> {
    await this.ftpClient.connect();
    await this.ftpClient.changeWorkingDirectory();

    const fileName = `${key}.txt`;
    await this.ftpClient.downloadFile(`${fileName}`, fileName);

    const warningText = await fs.readFile(path.join(__dirname,'..', '..', 'ftp-downloads', fileName), {
      encoding: "utf-8",
    });

    // await fs.unlink(`../../ftp-downloads/${fileName}`);

    return warningText;
  }

  private async readData(filePath: string): Promise<string> {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return data;
  }
}
