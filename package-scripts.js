const path = require("path");

const purchasesPath = path.resolve(__dirname, "apps/purchases");
const classroomPath = path.resolve(__dirname, "apps/classroom");
const webPath = path.resolve(__dirname, "apps/web");

const ciPurchasesPath = path.resolve(__dirname, "out/apps/purchases");
const ciClassroomPath = path.resolve(__dirname, "out/apps/classroom");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web prepare.services`,
      web: `yarn`,
      services: `nps prepare.docker prepare.prisma`,
      docker: "docker-compose up -d",
      ci: {
        web: `npx turbo prune --scope=web && cd out && yarn install --frozen-lockfile`,
        purchases: `npx turbo prune --scope=purchases && cd out && yarn install --frozen-lockfile && nps prisma.generate`,
      },
      prisma: `nps prisma.purchases.migrate.dev prisma.classroom.migrate.dev`,
    },
    test: {
      default: `nps test.web test.purchases`,
      web: `cd ${webPath} && yarn test:watch`,
      purchases: `cd ${purchasesPath} && yarn test:watch`,
      classroom: `cd ${classroomPath} && yarn test:watch`,
      ci: {
        default: `nps test.ci.web test.ci.purchases`,
        web: `cd ${ciWebPath} && yarn test:ci`,
        purchases: `cd ${ciPurchasesPath} && yarn test:ci`,
        classroom: `cd ${ciClassroomPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web test.watch.purchases test.watch.classroom`,
        web: `cd ${webPath} && yarn test:ci`,
        purchases: `cd ${purchasesPath} && yarn test:watch`,
        classroom: `cd ${classroomPath} && yarn test:watch`,
      },
    },
    prisma: {
      purchases: {
        generate: `cd ${purchasesPath} && yarn prisma generate`,
        studio: `cd ${purchasesPath} && yarn prisma studio`,
        migrate: {
          dev: `cd ${purchasesPath} && yarn prisma migrate dev`,
        },
      },
      classroom: {
        generate: `cd ${classroomPath} && yarn prisma generate`,
        studio: `cd ${classroomPath} && yarn prisma studio`,
        migrate: {
          dev: `cd ${classroomPath} && yarn prisma migrate dev`,
        },
      }
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && npm run build",
        purchases: "cd out && npm run build",
        classroom: "cd out && npm run build",
      },
    },
    docker: {
      build: {
        default: "nps docker.build.web docker.build.purchases docker.build.classroom",
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        purchases: `docker build -t purchases . -f ${purchasesPath}/Dockerfile`,
        classroom: `docker build -t classroom . -f ${classroomPath}/Dockerfile`,
      },
    },
    dev: "npx turbo run dev",
  },
};
