import { createServer } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { extname, join } from "path";

const MIME: Record<string, string> = {
  ".json": "application/json",
  ".css": "text/css",
  ".js": "text/javascript",
};

export function startRegistryServer(root: string): Promise<{
  port: number;
  close: () => Promise<void>;
}> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const filePath = join(root, decodeURIComponent(url.pathname.slice(1)));
      if (
        !filePath.startsWith(root) ||
        !existsSync(filePath) ||
        !statSync(filePath).isFile()
      ) {
        res.writeHead(404).end("not found");
        return;
      }
      res.writeHead(200, {
        "content-type": MIME[extname(filePath)] ?? "application/octet-stream",
      });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("failed to bind registry server"));
        return;
      }
      resolve({
        port: address.port,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) =>
              error ? closeReject(error) : closeResolve(),
            );
          }),
      });
    });
    server.on("error", reject);
  });
}
