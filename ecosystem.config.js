module.exports = {
  apps : [{
    name: 'NEXT',
    cwd: __dirname,
    script: "dist/server.js",
    instances: 4,
    exec_mode: "cluster",
    watch: false,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'production',
      NODE_PATH: 'libraries',
      ENV_PATH: './environments/prod.json'
    }
  }]
};