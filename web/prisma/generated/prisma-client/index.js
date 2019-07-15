"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "LogType",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Log",
    embedded: false
  },
  {
    name: "Metadata",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/eest2/pasetec/prod`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();