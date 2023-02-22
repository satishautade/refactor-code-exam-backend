import { Client } from "basic-ftp";

class FloodWarningDownloader {
  private client: Client;

  constructor() {
    this.client = new Client();
    this.client.ftp.verbose = true;
  }

  public async getWarnings(): Promise<string[]> {
    try {
      await this.client.access({
        host: "ftp.bom.gov.au",
        secure: false,
      });

      await this.client.cd("/anon/gen/fwo/");

      const files = await this.client.list();

      //   let warns: any = {};
      // for (var file in files) {
      //   if (files[file].name.endsWith(".amoc.xml")) {
      //     warns[files[file].name] = true;
      //   }
      // }

      const warns: string[] = files
        .filter((file) => file.name.endsWith(".amoc.xml"))
        .map((file) => file.name);

      return warns;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      await this.client.close();
    }
  }

  public async close(){
    await this.client.close();
  }
}

export default FloodWarningDownloader;
