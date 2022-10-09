//? Async（异步） 和 Sync（同步） 类型 (同步钩子里面不能有异步逻辑，而异步钩子可以有)
//? Parallel（并行）、Sequentia（串行） 和 First 类型
//? First  Hook 将依次运行，直到返回一个非 null 或非 undefined 的值为止，后续 Hook 将不再执行
const mimeTypes = {
  ".jpg": "image/jpeg",
  // 后面图片类型省略
};
export default function lifeCycle(opt) {
  return {
    name: "lifeCycle",
    //   Build 阶段工作流
    options(...opts) {
      // Async Sequential
      console.log("options");
      //   console.log(opts);
    },
    buildStart(...buildStart) {
      // Async Parallel
      console.log("buildStart");
      //   console.log(buildStart);
    },

    resolveId(importee, importer, resolveOptions) {
      // Async First
      //   从 input 配置指定的入口文件开始

      // 传入三个参数，当前模块路径、引用当前模块的模块路径、其余参数
      // (importee, importer, resolveOptions)
      console.log("resolveId");
      console.log(importee, importer, resolveOptions);

      //   TODO 对importee 作处理得到新的updateId
      let updateId = importee;
      // 每个插件执行时都会绑定一个上下文对象作为 this
      // 这里的 this.resolve 会执行所有插件(除当前插件外)的 resolveId 钩子,因为return string或者null之后后续插件的resolveId会停止执行
      return this.resolve(
        updateId,
        importer,
        Object.assign({ skipSelf: true }, resolveOptions)
      ).then((resolved) => {
        // 替换后的路径即 updateId 会经过别的插件进行处理
        let finalResult = resolved;
        if (!finalResult) {
          // 如果其它插件没有处理这个路径，则直接返回 updateId
          finalResult = { id: updateId };
        }
        return finalResult;
      });
    },
    load(id) {
      // Async First
      //   load 钩子的入参是模块 id，返回值一般是 null、string 或者一个对象
      //   插件事例：官方 image插件 判断是否是图片类型并作处理
      console.log("load");
      //   console.log(id);
      const mime = mimeTypes[extname(id)];
      if (!mime) {
        // 如果不是图片类型，返回 null，交给下一个插件处理
        return null;
      }
    },
    transform(code, id) {
      // Async Sequential
      // 对加载后的模块内容进行自定义的转换。以官方的 replace 插件为例
      // 入参分别为模块代码、模块 ID，返回一个包含 code(代码内容) 和 map(SourceMap 内容) 属性的对象，
      // 当然也可以返回 null 来跳过当前插件的 transform 处理
      // 当前插件返回的代码会作为下一个插件 transform 钩子的第一个入参
      console.log("transform");
      //   console.log(code, id);
    },
    moduleParsed(...moduleParsed) {
      // Async Parallel
      console.log("moduleParsed");
      //   console.log(moduleParsed);
    },
    resolveDynamicImport(...resolveDynamicImport) {
      // Async First
      console.log("resolveDynamicImport");
      //   console.log(resolveDynamicImport);
    },
    buildEnd(...buildEnd) {
      // Async Parallel
      console.log("buildEnd");
      //   console.log(buildEnd);
    },
    // Output 阶段工作流
    outputOptions(...outputOptions) {
      // Async Sequential
      console.log("outputOptions");
      // console.log(outputOptions);
    },
    renderStart(...renderStart) {
      // Async Parallel
      console.log("renderStart");
      // console.log(renderStart);
    },
    banner(...banner) {
      // Async Parallel
      console.log("banner");
      // console.log(banner);
    },
    footer(...footer) {
      // Async Parallel
      console.log("footer");
      // console.log(footer);
    },
    intro(...intro) {
      // Async Parallel
      console.log("intro");
      // console.log(intro);
    },
    outro(...outro) {
      // Async Parallel
      console.log("outro");
      // console.log(outro);
    },
    resolveDynamicImport(...resolveDynamicImport2) {
      // sync First
      console.log("resolveDynamicImport2");
      //   console.log(resolveDynamicImport2);
    },
    augmentChunkHash(...augmentChunkHash) {
      // Sync Sequential
      console.log("augmentChunkHash");
      // console.log(augmentChunkHash);
    },
    resolveFileUrl(...resolveFileUrl) {
      // Sync First
      console.log("resolveFileUrl");
      // console.log(resolveFileUrl);
    },
    resolveImportMeta(...resolveImportMeta) {
      // Sync First
      console.log("resolveImportMeta");
      // console.log(resolveImportMeta);
    },
    renderChunk(...renderChunk) {
      // Async Sequential
      // 入参，分别为 chunk 代码内容、chunk 元信息，返回值跟 transform 钩子类似，
      // 既可以返回包含 code 和 map 属性的对象，也可以通过返回 null 来跳过当前钩子的处理。
      console.log("renderChunk");
      //   console.log(renderChunk);
    },
    generateBundle(...generateBundle) {
      // Async Sequential
      //  入参分别为output 配置、所有打包产物的元信息对象
      // (output: NormalizedOutputOptions, bundle: OutputBundle)
      console.log("generateBundle");
      //   console.log(generateBundle);
    },
    writeBundle(...writeBundle) {
      // Async Parallel
      // 这个hook 在文件写入磁盘之后才会执行
      console.log("writeBundle");
      //   console.log(writeBundle);
    },
    closeBundle(...closeBundle) {
      // Async Parallel
      console.log("closeBundle");
      //   console.log(closeBundle);
    },
  };
}
