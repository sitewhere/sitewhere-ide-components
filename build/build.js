// NOTE: This script is based on the build for vue-class-component
// https://github.com/vuejs/vue-class-component/blob/master/build/build.js

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const uglify = require("uglify-js");
const rollup = require("rollup");
const replace = require("rollup-plugin-replace");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const version = process.env.VERSION || require("../package.json").version;
const cjsOutput = require("../package.json").main;
const esOutput = require("../package.json").module;
const banner = `/**
  * SiteWhere IDE Components v${version}
  * (c) 2020 SiteWhere LLC
  * @license CPAL-1.0
  */`;

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

const resolve = _path => path.resolve(__dirname, "../", _path);

build(
  [
    {
      file: resolve(cjsOutput),
      format: "cjs",
      name: "SiteWhereIdeComponents"
    }, {
      file: resolve(esOutput),
      format: "es"
    }
  ].map(genConfig)
);

function genConfig(opts) {
  const config = {
    input: {
      input: resolve("src/components/index.js"),
      external: [
        "moment",
        "sitewhere-rest-api",
        "sitewhere-ide-common",
        "axios",
        "vue",
        "vuelidate",
        "vue-property-decorator",
        "vue-router",
        "vuex",
        "electron",
        "vue-color"
      ],
      plugins: [
        nodeResolve(),
        commonjs({
          namedExports: {
            "node_modules/vuelidate/lib/validators/index.js": ["required"]
          }
        }),
        typescript({
          clean: true,
          tsconfigDefaults: {
            compilerOptions: {
              target: "es2015",
              module: "esnext",
              strict: true,
              jsx: "preserve",
              importHelpers: true,
              moduleResolution: "node",
              noImplicitAny: true,
              noEmitOnError: false,
              experimentalDecorators: true,
              esModuleInterop: true,
              emitDecoratorMetadata: true,
              allowSyntheticDefaultImports: true,
              strictFunctionTypes: false,
              typeRoots: ["../node_modules/@types/"],
              lib: [
                "es2018",
                "dom"]
            }
          }
        }),
        vue()
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      name: opts.name,
      banner,
      exports: "named",
      globals: {
        vue: "Vue",
        moment: "moment"
      }
    }
  };

  if (opts.env) {
    config.input.plugins.unshift(
      replace({
        "process.env.NODE_ENV": JSON.stringify(opts.env)
      })
    );
  }

  return config;
}

function build(builds) {
  let built = 0;
  const total = builds.length;
  const next = () => {
    buildEntry(builds[built])
      .then(() => {
        built++;
        if (built < total) {
          next();
        }
      })
      .catch(logError);
  };

  next();
}

async function buildEntry({ input: inputOptions, output: outputOptions }) {
  const isProd = /min\.js$/.test(outputOptions.file);
  const bundle = await rollup.rollup(inputOptions);
  const { output: rollupOutput } = await bundle.generate(outputOptions);
  const { code } = rollupOutput[0];

  if (isProd) {
    var minified = uglify.minify(code, {
      output: {
        preamble: outputOptions.banner,
        ascii_only: true
      }
    });
    return write(outputOptions.file, minified.code, true);
  } else {
    return write(outputOptions.file, code);
  }
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(
        blue(path.relative(process.cwd(), dest)) +
        " " +
        getSize(code) +
        (extra || "")
      );
      resolve();
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err);
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(" (gzipped: " + getSize(zipped) + ")");
        });
      } else {
        report();
      }
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + "kb";
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";
}
