module.exports = {
  apps: [
    {
      name: "DWH_API",
      script: "start.js",
      exec_mode: "cluster",
      instances: process.env.NODE_ENV === "production" ? 4 : 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
