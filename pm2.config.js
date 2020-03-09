module.exports = {
  apps : [
      {
        name: "react-phylotree",
        script: "./src/server.js",
        watch: true,
        instance_var: 'INSTANCE_ID',
        env: {
            "PORT": 8006,
        }
      }
  ]
}
