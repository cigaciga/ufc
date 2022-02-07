import https from "https";
import fs from "fs";
import path from "path";
import HttpsProxyAgent from "https-proxy-agent";
import querystring from "querystring";

/**
 * module description
 * @module Ufc
 */
class Ufc {
  /**
   * constructor description
   * @param  {[type]} config [description]
   */
  constructor(config) {
    this.apiURL = config && config.apiURL ? config.apiURL : "ecommerce.ufc.ge";
    this.apiPath =
      config && config.apiPath ? config.apiPath : "/ecomm2/MerchantHandler";
    this.apiPathClient =
      config && config.apiPathClient
        ? config.apiPathClient
        : "/ecomm2/ClientHandler";
    this.apiPort = 18443;
    this.currency = config && config.currency ? config.currency : "981"; // GEL;
    this.language = config && config.language ? config.language : "GE";
    this.description =
      config && config.description ? config.description : "UFCTEST";
    this.proxyURL = config.proxyURL;
    this.certFile = fs.readFileSync(
      path.resolve(process.cwd(), config.certFile)
    );
    this.passphrase = config.passphrase;
  }

  getTransactionStatus(transId) {
    return new Promise((resolve, reject) => {
      console.log("Transaction ID: " + transId);

      let postData = querystring.stringify({
        command: "c",
        trans_id: encodeURI(transId),
      });

      var options = {
        hostname: this.apiURL,
        port: this.apiPort,
        path: this.apiPath,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
        pfx: this.certFile,
        passphrase: this.passphrase,
        agent: this.proxyURL ? new HttpsProxyAgent(this.proxyURL) : null,
        rejectUnauthorized: false,
      };

      var req = https.request(options, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        let data = [];
        res.on("data", (d) => {
          data.push(d);
        });

        res.on("end", () => {
          let d = Buffer.concat(data).toString();
          console.log(`BODY: ${d}`);
          console.log(d);
          if (d.includes("error")) {
            return reject(new Error(d));
          }

          let respStrArr = d.split("\n");

          var map = new Map();
          let obj = {};
          respStrArr.forEach((item, index) => {
            let key = item.split(":")[0].trim();
            let value = item.split(":")[1].trim();
            obj[key] = value;
            map.set(key, value);
          });

          if (map.has("RESULT_CODE") && map.get("RESULT_CODE") === "000")
            resolve({
              statusCode: map.get("RESULT_CODE"),
              success: true,
              transData: obj,
            });
          else
            resolve({
              statusCode: map.get("RESULT_CODE"),
              success: false,
              transData: obj,
            });
        });

        res.on("error", (e) => {
          console.log(e);
          return reject(e);
        });
      });

      req.on("timeout", (e) => {
        console.log(e);
        return reject(e);
      });
      req.on("error", (e) => {
        console.log(e);
        return reject(e);
      });
      req.write(postData);
      req.end();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }
  refundTransaction(transId, amount) {
    return new Promise((resolve, reject) => {
      let postData = querystring.stringify({
        command: "k",
        trans_id: encodeURI(transId),
        amount: amount,
      });
      var options = {
        hostname: this.apiURL,
        port: this.apiPort,
        path: this.apiPath,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
        pfx: this.certFile,
        passphrase: this.passphrase,
        agent: this.proxyURL ? new HttpsProxyAgent(this.proxyURL) : null,
        rejectUnauthorized: false,
      };

      var req = https.request(options, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        let data = [];
        res.on("data", (d) => {
          data.push(d);
        });

        res.on("end", () => {
          let d = Buffer.concat(data).toString();
          console.log(`BODY: ${d}`);
          console.log(d);
          if (d.includes("error")) {
            return reject(new Error(d));
          }
          let respStrArr = d.split("\n");

          var map = new Map();
          let obj = {};
          respStrArr.forEach((item, index) => {
            let key = item.split(":")[0].trim();
            let value = item.split(":")[1].trim();
            obj[key] = value;
            map.set(key, value);
          });

          if (map.has("RESULT_CODE") && map.get("RESULT_CODE") === "000")
            resolve({
              statusCode: map.get("RESULT_CODE"),
              success: true,
              transData: obj,
            });
          else
            resolve({
              statusCode: map.get("RESULT_CODE"),
              success: false,
              transData: obj,
            });
        });

        res.on("error", (e) => {
          console.log(e);
          return reject(e);
        });
      });

      req.on("timeout", (e) => {
        console.log(e);
        return reject(e);
      });
      req.on("error", (e) => {
        console.log(e);
        return reject(e);
      });
      req.write(postData);
      req.end();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }
  registerTransaction(data) {
    return new Promise((resolve, reject) => {
      let postData = querystring.stringify({
        command: "v",
        amount: data.amount,
        currency: data.currency || this.currency,
        client_ip_addr: data.clientIP,
        language: data.language || this.language,
        description: data.description || this.description,
        msg_type: "SMS",
      });

      var options = {
        hostname: this.apiURL,
        port: this.apiPort,
        path: this.apiPath,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
        pfx: this.certFile,
        passphrase: this.passphrase,
        agent: this.proxyURL ? new HttpsProxyAgent(this.proxyURL) : null,
        rejectUnauthorized: false,
      };

      var req = https.request(options, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        let data = [];
        res.on("data", (d) => {
          data.push(d);
        });

        res.on("end", () => {
          let d = Buffer.concat(data).toString();
          console.log(`BODY: ${d}`);
          if (d.includes("TRANSACTION_ID")) {
            resolve(d.toString().split(":")[1].trim());
          } else {
            return reject(new Error(d));
          }
        });

        res.on("error", (e) => {
          console.log(e);
          return reject(e);
        });
      });
      req.on("timeout", (e) => {
        console.log(e);
        return reject(e);
      });
      req.on("error", (e) => {
        console.log(e);
        return reject(e);
      });
      req.write(postData);
      req.end();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }

  registerRecurringTransaction(data) {
    return new Promise((resolve, reject) => {
      let postData = {
        command: "p",
        currency: data.currency || this.currency,
        client_ip_addr: data.clientIP,
        language: data.language || this.language,
        description: data.description || this.description,
        msg_type: "AUTH",
        biller_client_id: data.billerClientId,
        perspayee_expiry: data.expiry,
        perspayee_gen: 1,
      };
      if (data.amount) postData.amount = data.amount;

      var options = {
        hostname: this.apiURL,
        port: this.apiPort,
        path: this.apiPath,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(querystring.stringify(postData)),
        },
        pfx: this.certFile,
        passphrase: this.passphrase,
        agent: this.proxyURL ? new HttpsProxyAgent(this.proxyURL) : null,
        rejectUnauthorized: false,
      };

      var req = https.request(options, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        let data = [];
        res.on("data", (d) => {
          data.push(d);
        });

        res.on("end", () => {
          let d = Buffer.concat(data).toString();
          console.log(`BODY: ${d}`);
          if (d.includes("TRANSACTION_ID")) {
            resolve(d.toString().split(":")[1].trim());
          } else {
            return reject(new Error(d));
          }
        });

        res.on("error", (e) => {
          console.log(e);
          return reject(e);
        });
      });
      req.on("timeout", (e) => {
        console.log(e);
        return reject(e);
      });
      req.on("error", (e) => {
        console.log(e);
        return reject(e);
      });
      req.write(postData);
      req.end();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }
  chargeCard(data) {
    return new Promise((resolve, reject) => {
      let postData = querystring.stringify({
        command: "e",
        amount: data.amount,
        currency: data.currency || this.currency,
        client_ip_addr: data.clientIP,
        language: data.language || this.language,
        description: data.description || this.description,
        biller_client_id: data.billerClientId,
      });

      var options = {
        hostname: this.apiURL,
        port: this.apiPort,
        path: this.apiPath,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
        pfx: this.certFile,
        passphrase: this.passphrase,
        agent: this.proxyURL ? new HttpsProxyAgent(this.proxyURL) : null,
        rejectUnauthorized: false,
      };

      var req = https.request(options, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        let data = [];
        res.on("data", (d) => {
          data.push(d);
        });

        res.on("end", () => {
          let d = Buffer.concat(data).toString();
          console.log(`BODY: ${d}`);
          if (d.includes("TRANSACTION_ID")) {
            resolve(d.toString().split(":")[1].trim());
          } else {
            return reject(new Error(d));
          }
        });

        res.on("error", (e) => {
          console.log(e);
          return reject(e);
        });
      });
      req.on("timeout", (e) => {
        console.log(e);
        return reject(e);
      });
      req.on("error", (e) => {
        console.log(e);
        return reject(e);
      });
      req.write(postData);
      req.end();
    }).catch((error) => {
      console.log(error);
      throw error;
    });
  }
}

export default Ufc;
