import { Client } from "basic-ftp";
import path from "path";

export interface FtpOptions {
  host:string;
  secure: boolean;
  verbose: boolean;
  remotePath: string;
  localPath: string;
};

export class FtpClient {
  private client: Client;
  private options : FtpOptions = {
    host: "ftp.bom.gov.au",
    secure: false,
    verbose: false,
    remotePath: "/anon/gen/fwo/",
    localPath: path.join(__dirname, '..', '..', 'ftp-downloads')
  };

  constructor() {
    this.client = new Client();
    this.client.ftp.verbose = this.options.verbose;
  }

  async connect(host: string = this.options.host, secure = this.options.secure): Promise<void> {
    await this.client.access({ host, secure });
  }

  async changeWorkingDirectory(path: string = this.options.remotePath): Promise<void> {
    await this.client.cd(path);
  }

  async listFiles(): Promise<string[]> {
    const files = await this.client.list();
    return files.map((file) => file.name);
  }


  async downloadFile(fileName: string, remotePath: string, ): Promise<void> {
    await this.client.downloadTo(path.join(this.options.localPath, fileName), remotePath);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
