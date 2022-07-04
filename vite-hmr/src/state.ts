let timer: number | undefined
if (import.meta.hot) {
  if (!import.meta.hot.data.count) {
    import.meta.hot.data.count = 0
  }
  import.meta.hot.dispose(() => {
    if (timer) {
      clearInterval(timer)
    }
  })
}
export function initState() {
  const getAndIncCount = () => {
    const data = import.meta.hot?.data || {
      count: 0,
    }
    data.count = data.count + 1
    return data.count
  }
  let a = 1123123121233123123
  timer = setInterval(() => {
    let countEle = document.getElementById('count')
    countEle!.innerText = getAndIncCount() + ''
  }, 1000)
}
