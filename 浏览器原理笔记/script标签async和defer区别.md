# 使用 async 标志的脚本文件一旦加载完成，会立即执行；而使用了 defer 标记的脚本文件，需要在 DOMContentLoaded 事件之前执行。
async defer 加载阶段都不会阻塞 dom 解析，但是async 执行阶段会阻塞  dom 解析；defer会在dom解析完成DOMContentLoaded 事件之前执行