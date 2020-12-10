// using literal strings instead of numbers so that it's easier to inspect
// debugger events
//  get、 has、 iterate 三种类型的读取对象会触发 track
export const enum TrackOpTypes {
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}

export const enum TriggerOpTypes {
  SET = 'set',
  ADD = 'add',
  DELETE = 'delete',
  CLEAR = 'clear'
}
